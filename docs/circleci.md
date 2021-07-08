---
title: CircleCI Orbs
---

CircleCI provides shareable CI configurations through a feature called [Orbs](https://circleci.com/docs/2.0/orb-intro/).

We regularly publish useful Jobs and Commands which can be found [here](https://circleci.com/developer/orbs/orb/effx/effx-cli).

### Lint and Sync Workflow

An example lint and sync workflow has been provided for your reference. The workflow demonstrates a common GitOps workflow, where only commits to the `main` branch are uploaded to effx.

```yaml
---
# Lints all definitions on every commit
# Syncs all definitions on every commit to main
version: '2.1'
orbs:
  effx-cli: effx/effx-cli@1.0.1
workflows:
  effx-workflow:
    jobs:
      - effx-cli/lint-all:
          name: lint
      - effx-cli/sync-all:
          context: effx-api-credentials
          requires:
            - lint
          filters:
            branches:
              only: main
```

### Event Feed Job

Another recommended pattern is to post Events during your deployment jobs. In the example below, we wrap deployment logic with events
to provide more detailed context around the deployment timeline.

```yaml
---
# Add events to your workflow
version: '2.1'
orbs:
  effx-cli: effx/effx-cli@1.0.1
jobs:
  deploy-services:
    steps:
      - effx-cli/install
      - effx event -k ${EFFX_API_KEY} --title "Deployment Started" --message "Deploying backend services" --tag "type:deploy"
      -  # Your deployment logic
      # If succeeded
      - effx event -k ${EFFX_API_KEY} --title "Deployment Finished" --message "Deployed backend services" --tag "type:deploy"
      # If failed
      - effx event -k ${EFFX_API_KEY} --title "Deployment Failed" --message "Failed backend services" --tag "type:deploy"
```
