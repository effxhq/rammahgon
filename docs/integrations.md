---
title: Integrations
sidebar_label: Overview
---

Admins have permisions to supercharge their account with Integrations. Integrations span a variety of use-cases like a Slack bot
for convenient data fetching to event harvesters from sources like Datadog.

## Installation

Navigate to the [Integrations](https://api.effx.com/integrations) in-app page for installation instructions.

## Available Integrations

### Slack

The effx Slack integration gives you the ability to view all of your service profiles and Activity Feeds directly from within Slack.

Once installed, issue the `/effx` slash command to see what you can do.

### Datadog

The Datadog and effx integration pulls in Monitor and Incident events from Datadog and displays them in the appropriate service Activity Feeds.

Our integration associates Monitor and Incident events with effx Activity Feeds by:

1. A tag on the monitor alert or incident note e.g. `service:name`
2. A line in the monitor description or incident note with **@effx-name**

### PagerDuty

Our PagerDuty integration with effx pulls in your incident data, associates them with same named services, and displays incidents in the service Activity Feeds.

In order for PagerDuty alerts and incidents to be associated with your Services, we match on the PagerDuty service.

### New Relic

Our New Relic integration brings alert violation data into the effx Activity Feed. Use it to correlate alerts and incidents with other changes in your Activity Feed.

We do our best to associate the alert violation events with appropriate services, primarily by matching the entity in New Relic with a service.

### OpsGenie

Our Opsgenie integration retrieves alert information from the Opsgenie API and displays them in the appropriate service Activity Feeds.

Since Opsgenie doesn't have a native service construct, association happens with:

1. A tag on the alert e.g. `service:name`
2. A line in the alert description with `service:name`
3. A line in the alert description with **@opsgenie-name**

### Gremlin

Our Gremlin integration brings chaos engineering attacks details and displays them in appropriate service Activity Feeds.

Currently, the integration is limited to Kubernetes attacks that are targeting specific deployments as part of the attack strategy. Kubernetes deployments will be the association to effx services.
