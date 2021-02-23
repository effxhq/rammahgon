---
title: GitLab CI
---

We'll walk you through the workflow of validating and importing your services using GitLab's CI Job functionality which will help you reliably bring your `effx.yaml` files into effx.

### Configure your Secret API key

You'll first need to configure a Variable within GitLab in order to use the CI/CD Job with effx.

1. Navigate to **Settings > CI / CD** for the repo

2. Jump to the section called **Variables** and choose **Add Variable**

3. On the **Add variable** screen, add `EFFX_API_KEY` as the Key and insert your **effx API key** into the Value field. You can find your API key in the effx platform by navigating to **Account Settings**. In addition, check both **Protect Variable** and **Mask Variable** options

![repo settings](/img/gitlab-add-variable.png)

4. Click **Add variable** and you're set!

### Set up your .gitlab-ci.yml file

If you've made it this far, you're probably familiar with setting up a `.gitlab-ci.yml` file. Below is a recommendation if the file is empty, but feel free to adjust as you feel necessary.

```yaml title=".gitlab-ci.yml"
---
# Lints all definitions on every commit
# Syncs all definitions on every commit to master
image: ubuntu:latest

before_script:
  - curl -Lo /tmp/effx https://effx.run/effx-cli/releases/latest/effx-cli_Linux_x86_64
  - sudo install /tmp/effx /usr/local/bin

lint-all:
  stage: test
  script:
    - effx lint -d .

sync-all:
  stage: deploy
  variables:
    EFFX_API_KEY: ${EFFX_API_KEY}
  script:
    - effx sync -d .
  only:
    - master

# Add events to your workflow (pro-tier)
deploy-services:
  stage: deploy
  variables:
    EFFX_API_KEY: ${EFFX_API_KEY}
  script:
    - effx event -k ${EFFX_API_KEY} --title "Deployment Started" --message "Deploying backend services" --tag "type:deploy"
    -  # Your deployment logic
    # If succeeded
    - effx event -k ${EFFX_API_KEY} --title "Deployment Finished" --message "Deployed backend services" --tag "type:deploy"
    # If failed
    - effx event -k ${EFFX_API_KEY} --title "Deployment Failed" --message "Failed backend services" --tag "type:deploy"
  only:
    - master
```

:::note
If you use a default branch other than `master`, e.g. `main`, please update the config appropriately.
:::

### Push to your default branch

To complete the process, push the new `.gitlab-ci.yml` file to your main/master branch.

Now, whenever you merge code into the main branch for this repository, a job to lint and sync services to effx will run. This will find all `effx.yaml` files in the repo and lint and sync them accordingly.

You can view status by going to **CI/CD > Jobs** in the repository's navigation menu.
