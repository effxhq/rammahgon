---
title: Introduction
slug: /
---

Welcome to effx help where you'll find all the information you need to get the most out of the effx platform.  If you're unfamiliar with effx, you can either [learn more](https://effx.com) or [sign up for a free trial](https://app.effx.com/sign_up).

## How to get started

To start using the effx platform, jump into our Getting Started guide and [**build your microservice catalog**](/docs/first-service) to learn how to add your first services and set up your initial integrations.

You can also jump directly to sections in our Getting Started guide for:
- [Setting up Service Standards](/docs/first-standard)
- [Tracking your first Migration](/docs/first-migration)
- [Using Slack + effx](/docs/integrations#slack)

## Accessing effx programmatically

We provide numerous ways for you to incorporate your data with effx programmatically, whether it be through our API directly, using our `effx-cli` tool, or through Automations:

### Call our API

Our API provides flexibility for users that already have service metadata defined in other formats.  [Learn more about our API](api-overview.mdx).

### Use the CLI

The `effx-cli` is the fundamental component behind most of our Automations. There are commands to help you work with `effx.yaml` files.

It's encouraged to use the CLI on your local development environment for testing out your automated workflows.

[Learn more about effx-cli](/docs/cli-overview).

### Jump to Automations

We offer convenient templates for enabling GitOps with popular version control and continuous integration systems.

[Learn more about our Automations](/docs/automations-overview).

### Fetch your API Key

Retrieve your API key from within effx by navigating to [**Account Settings**](https://app.effx.com/account_settings). For convenience, add it as an environment variable.
Most of our examples will refer to your API key from the environment.

```shell
export EFFX_API_KEY="Paste your key here"
```


## Frequently Asked Questions

This section will be updated frequently to answer common questions from our users & community.

1. [How do I add dependencies for my services?](/docs/first-service#defining-service-dependencies)
2. [How do I define criteria for my Service Standards?](/docs/first-standard#service-standard-criteria)
3. [How do I add a team to effx?](/docs/first-team)


## Contact Support

If you're unable to get the help you need, please submit a support ticket at [support@effx.com](mailto:support@effx.com).
