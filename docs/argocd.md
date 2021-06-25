---
title: Argo CD
---

The Argo CD Notifications project provides a way to easily monitor Argo CD applications and to notify users and applications about important changes in state.

To get started, install the Argo CD Notifications project by [following the instructions here](https://argocd-notifications.readthedocs.io/en/stable/).  After you've run through the simple install to install Argo CD notifications (either via manifest or Helm), you'll need to apply the `ConfigMap` below to create a trigger to send an effx event when a deploy is successful.  The `ConfigMap` below will install a global subscription for all applications as opposed to having to subscribe on a per application basis.

You'll need to replace `EFFX_API_KEY` below with your effx API key which you can conveniently find in your [effx Account Settings](https://app.effx.com/account_settings).  We recommend creating a secret in `argocd-notifications-secret` to be used in the `ConfigMap`.

After you deploy the `ConfigMap` below, you'll soon see events in effx related to your applications in Argo CD!

_Note, if you already use Argo CD Notifications, you'll need to merge the items from `data` below with your existing `data` block_

```yml
---
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: argocd-notifications-cm
  data:
    subscriptions: |
      - triggers:
        - on-success-deploy
        recipients:
        - effx-events
        enabled: true
    service.webhook.effx-events: |
      url: https://api.effx.io/v2/events
      headers:
      - name: X-Effx-Api-Key
        value: EFFX_API_KEY
      - name: Content-Type
        value: application/json
    trigger.on-success-deploy: |
      - send: [effx-deploy-event]
        when: app.status.operationState.phase in ['Succeeded'] and app.status.health.status == 'Healthy'
        oncePer: app.status.sync.revision
    template.effx-deploy-event: |
      webhook:
        effx-events:
          method: POST
          body: |
            {
              "title": "argocd deploy succeeded",
              "message": "service {{.app.metadata.name}} is now running the new version of deployment manifests [{{.app.status.sync.revision}}]",
              "tags": [
                {
                  "key": "type",
                  "value": "deploy"
                }
              ],
              "actions": [
                {
                  "level": "info",
                  "name": "view deploy",
                  "url": "{{.context.argocdUrl}}/applications/{{.app.metadata.name}}"
                },
                {
                  "level": "info",
                  "name": "view repo",
                  "url": "{{.app.spec.source.repoURL}}"
                }
              ],
              "integration": {
                "name": "argocd"
              },
              "service_name": "{{.app.metadata.name}}"
            }
```
