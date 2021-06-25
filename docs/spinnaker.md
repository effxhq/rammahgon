---
title: Spinnaker
---

Spinnaker provides [Custom Webhook Stages](https://spinnaker.io/guides/operator/custom-webhook-stages/) that are typically used to make quick API calls to an external system as part of a pipeline.

The template below will add a Custom Webhook Stage with some convenient features:

- An input parameter for the service name (the event will get linked to an effx Service)
- A dynamic description with the job name and the name of the user who invoked the pipeline
- An action which will link the event back to your Spinnaker job
- An indicator that the source of the event is from Spinnaker

To add this stage to your environment, you'll need to:

1. [Grab your effx API key](https://app.effx.com/account_settings)
2. Replace your `EFFX_API_KEY` in the yaml snippet below and save it into your `orca-local.yaml` file. Replace the `DECK_HOSTNAME` with your Spinnaker URL.
3. Deploy the configuration update.
4. Use the new custom stage in the Spinnaker UI. Use the corresponding service name to link the event in effx.

```yml
---
webhook:
  preconfigured:
    - label: 'effx - deployment event'
      type: 'effxEvent'
      enabled: true
      description: 'Post a deployment event to effx'
      method: 'POST'
      customHeaders:
        X-Effx-Api-Key:
          - <EFFX_API_KEY>
        Content-Type:
          - 'application/json'
      url: 'https://api.effx.io/v2/events'
      payload: '{
        "title": "Spinnaker - Webhook Stage",
        "message": "${execution.getName()} triggered by ${trigger.user} (${trigger.type})",
        "timestamp_milliseconds": ${execution.getBuildTime()},
        "actions": [
          {
            "level": "info",
            "name": "Pipeline",
            "url": "https://<DECK_HOSTNAME>/#/applications/${execution.getApplication()}/executions/${execution.getId()}"
          }
        ],
        "tags": [
          {
            "key": "type",
            "value": "deploy"
          }
        ],
        "integration": {
          "name": "spinnaker"
        },
        "service_name": "${parameterValues["service"]}"
        }
      }'
      parameters:
        - label: 'effx Service'
          name: 'service'
          description: 'The effx service for this event'
```
