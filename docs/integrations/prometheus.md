---
title: Prometheus
---

[Prometheus][] is a well known and supported open source monitoring solution.
Our integration surfaces alert data in the effx platform.
This provides insights into the changes and frequency of alerts across the teams you follow.

[Prometheus]: https://prometheus.io/

import useBaseUrl from '@docusaurus/useBaseUrl';

<ul>
  <li>
    <a href="/releases/2021/04/06/prometheus-support">
      Release Notes
    </a>
  </li>
  <li>
    <a href={useBaseUrl('#quick-start-with-minikube')}>
      Quick start with Minikube
    </a>
  </li>
</ul>

## Quick start with Minikube

A quick way to get started with the effx Prometheus integration is using Minikube.
To get started, ensure you have the following tools installed locally.

* [Minikube](https://minikube.sigs.k8s.io/docs/start/)
* [Helm](https://helm.sh/)

### Start a minikube cluster

Before configuring and deploying Prometheus, we first need to ensure Minikube is running.
You can do this by running the `minikube start` command.
You can optionally configure the driver, CPU, and memory allocated if needed.

```sh
minikube start [--driver=docker] [--cpus=2] [--memory-2048]
```

### Add the prometheus-community repository

Once Minikube is running, you can add the Helm repository for the `prometheus-community`.
This repository contains Helm charts for the Prometheus stack that are maintained by community members.
To add the repository, use the `helm repo add` command as shown below.

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

### Setup configuration for effx

1. Go to the [integrations](https://app.effx.com/integrations) section in effx

1. Open the Prometheus integration to get your `webhook_url` and `token`

1. Create a `my-values.yaml` file with the following contents.
Be sure to replace the `$webhook_url` and `$token` variables with your associated values.

```yaml
# my-values.yaml
alertmanager:
  config:
    route:
      group_by: ['job']
      receiver: effx
      routes: []
    receivers:
      - name: effx
        webhook_configs:
          - url: $webhook_url
            max_alerts: 1
            send_resolved: true
            http_config:
              bearer_token: $token
```

### Deploy Prometheus

Once you've setup configuration for effx, you can deploy the stack.
When deploying, be sure to specify your `my-values.yaml` file when deploying the stack.
Without it, alert failures won't be sent to effx.

```sh
helm upgrade -i kube-prometheus-stack prometheus-community/kube-prometheus-stack -f my-values.yaml
```

One the system is deployed, it will take a few minutes to report data to effx.
By default, Minikube fails a handful of checks specified by the [Kubernetes][] community.
When the alerts fail, they will send a notification to effx.

[Kubernetes]: https://kubernetes.io

### Explore detected services & events

Once effx receives an alert, it attempts to match it to an existing service in your catalog.
If we can't find one, we create a [detected service](/releases/2021/02/24/detected-services).
You can view these services in app on our [detected services](https://app.effx.com/detected_services) page.

<p>
  <img alt="detected services screenshot"
      src={useBaseUrl('img/integrations/prometheus-detected.png')}/>
</p>

In addition to detecting services, alerts sent to effx are surfaced in your service activity feed.
Each alert includes links to AlertManager, Prometheus, and any annotations ending with `_url` (great for including links to runbooks).

<p>
  <img alt="feed screenshot"
      src={useBaseUrl('img/integrations/prometheus-feed.png')}/>
</p>
