---
title: effx-cli supports events
author: Eric Uriostigue
author_title: Product Lead
author_url: https://github.com/euriostigue
author_image_url: https://assets-global.website-files.com/5fd1d1ab54430e6b747263b2/5fd1d1ab54430eb7c8726407_eric%20headshot.jpeg
tags: [activity-feed, effx-cli, events]
---

Our [effx-cli](https://github.com/effxhq/effx-cli) now supports posting [Events](../../../../docs/events-api).

<!--truncate-->

## Overview

[Events](https://app.effx.com/events) make it easier to solve incidents by aggregating Continuous deployment, feature flags,
experimentation, & capacity changes into a single timeline. This timeline can be examined globally or filtered to events relevant
to a service.

Being able to post events via the CLI makes it easier to integrate into existing automated workflows.

## Usage

```shell
# Send a global deployment event
effx event -k ${EFFX_API_KEY} --title "Deployment" \
  --message "Deployed backend services" --tag "type:deploy"

# Send a service deployment event
effx event -k ${EFFX_API_KEY} --title "Deployment" \
  --message "Deployed caladan" --tag "type:deploy" --service caladan

# Send commit event
effx event -k ${EFFX_API_KEY} --title "Commit" \
  --message "Committed to main branch" --tag "type:commit"
```

## Best Practices

We recommend using Events in your CI/CD pipelines. Check out some examples here:

- [Gitlab](../../../../docs/gitlab#set-up-your-gitlab-ciyml-file)
- [CircleCI](../../../../docs/circleci#event-feed-job)

:::note
The Activity Feed requires a Pro-Tier plan.
:::
