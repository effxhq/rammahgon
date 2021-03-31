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
4. Use the new custom stage in the Spinnaker UI. Use the corresponding service name to link the event in Effx.

```yml
---
webhook:
  preconfigured:
    - label: 'Effx - Deployment Event'
      type: 'effxEvent'
      enabled: true
      description: 'Post a Deployment Event to Effx'
      method: 'POST'
      customHeaders:
        X-Effx-Api-Key:
          - <EFFX_API_KEY>
        Content-Type:
          - application/json
      url: https://api.effx.io/v2/events
      payload: '{
        "name": "Spinnaker - Webhook Stage",
        "description": "${execution.getName()} triggered by ${trigger.user} (${trigger.type})",
        "produced_at_time_milliseconds": ${execution.getBuildTime()},
        "actions": [
          {
            "level": "info",
            "name": "Pipeline",
            "url": "https://<DECK_HOSTNAME>/#/applications/${execution.getApplication()}/executions/${execution.getId()}"
          }
        ],
        "integration": {
          "name": "spinnaker",
        },
        "service": {
          "name": "${parameterValues["service"]}"
        }
      }'
      parameters:
        - label: Effx Service
          name: service
          description: The Effx Service for this Event
```
