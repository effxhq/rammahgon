---
title: Introduction
slug: /
---

## Get Your Service Catalog Right

Setting yourself up for success with effx starts with the service catalog. effx was built to support a GitOps workflow. _Why?_
It's important that your catalog has all the right data. Peer review is an important part of this process.

effx resources are usually defined in `effx.yaml` files. You will learn how to define them and introduce automated workflows
to keep your data up-to-date in these docs.

There are several ways to upload resources:

### Use the CLI

The CLI is the fundamental component behind most of our Automations. There are commands to help you work with `effx.yaml` files.
It's encouraged to use the CLI on your local development environment for testing out your automated workflows.

### Call our API

The API provides flexibility for users that already have service metadata defined in other formats.

### Jump to Automations

We offer convenient templates for enabling GitOps with popular CI systems.

## Fetch your API Key

Retrieve your API key from within effx by navigating to [**Account Settings**](https://app.effx.com/account_settings). For convenience, add it as an environment variable.
Most of our examples will refer to your API key from the environment.

```shell
export EFFX_API_KEY="Paste your key here"
```

Continue through this section to upload a starter service.
