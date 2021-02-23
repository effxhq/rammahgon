---
title: Build your microservice catalog
sidebar_label: Build your microservice catalog
---


Setting yourself up for success with effx starts with the microservice catalog.  Services are the base unit of what most effx functionality is built around we've built automation to help you do that easily.

The primary method for importing services into effx is via the GitOps workflow.  _Why?_  It's important that your catalog has all the right data. Peer review is an important part of this process.

effx resources are usually defined in `effx.yaml` files. You will learn how to define them and introduce automated workflows
to keep your data up-to-date in these docs.

The first step is to generate your first `effx.yaml` file for your initial service and then upload it via one of the methods below:

## Adding your first service

We've created a nifty [in-app YAML wizard](https://app.effx.com/yaml/wizard) to guide you through the process of creating your first service, but if you prefer to write the YAML yourself, below is the full definition of how to construct your own `effx.yaml`.  You can see a [full example](#effx-yaml-example) below.

### effx-yaml definition

The `effx.yaml` file is the source of truth for your services within effx. The format is as follows:

Within the `spec` portion of the Service definition, you can define the following:

- `name` - This is the name of the service which is the primary way the service will be displayed
- `description` - The description is a string describing what the service does -- engineers will be able to discover the service by searching for terms in the description
- `annotations` - Annotations are used to provide structured data within effx:
  - `effx.io/owned-by` - denote the team that owns the service
- `tags` - This is the primary way to create and provide values for the taxonomy of your service. They're free form so you can choose what makes the most sense for your organization. Some commonly-tags are `group` to denote a group of services, `tier` to denote the priority or importance of a service, and items to denote language e.g. `go` with a value of `1.15.5` like in the example.
- `contact` - Provide contact information for a particular service. Available contact types are:
  - `email` - email address for who to contact about the service
  - `onCall` - link to the on-call rotation for the service
  - `chat` - link to the best chat room to discuss issues with the service
  - `issueTracker` - where to file bugs for the service
- `linkGroups` - Link Groups provide you the ability to organize links to external services or tools where you can find more information about a service. Common linkGroups are:
  - `dashboards` - where to find observability dashboards (APM, tracing, logging)
  - `version control` - where is the repository for this service
  - `documentation` - where is the service's documentation or API
  - `runbooks` - where are the runbooks for the service?
  - linkGroups are flexible, so you can use them however makes sense to structure your links in the user interface. You can provide multiple `links` structures per `linkGroup`, each requiring a `label` and `url`. The `label` appears on the button for the link within the user interface.
- `dependencies` - Define dependencies on other services
  - `manual` - A section for explicit declarations (array). Each dependency has a `kind` of entity to depend on (defaults to "service") & a `name` which matches a dependency by the kind's name


### Tags explained

Tags are a key part of the Service profile and are used throughout the rest of the effx platform for both discovery, reporting, and understanding your services.  

They are the ultimate representation of the taxonomy for how you structure your services within your company.  For some companies, this could be using a `tier` system, or a `group` taxonomy.  Others have used tags to define things like `gdpr` as true to ensure that something is noted as being in scope for GDPR.  

These are as flexible as you need them to be and you can define as many as you need for a service.

### linkGroups explained

`linkGroups` are an important construct to understand for defining the best external links for a particular service.  Commonly-used `linkGroups` contain items like dashboards, version control, documentation, runbooks, etc.  You can name your linkGroups whatever you please and then provide structured for each section.

The `links` section contains an array of labels and urls which help define how the item is displayed and linked to.  The `label` shows up in the UI as the link's name and the `url` is naturally what it links to.  The `url` is also special in tha we'll attempt to fetch its `favicon.ico` to decorate the link.

The links section is then visible on the Service profile page:
![linkGroups](/img/linkGroups.png)


### Defining service dependencies

Dependencies help define the relationships between services in effx.  Within the `effx.yaml` file, you can define dependencies as the services that the service definition depends upon.  For example, in the example below, the `example-service` depends upon two services, `arrakis` and `caladan`.

Currently, we support the ability to define these relationships via the `effx.yaml` file and continue to build ways to add automation to this process.  To define them manually, add a `manual` section and beneath, an array of dependencies with a `name` and a `kind`.  The `kind` defaults to `service` if not specified and currently is the only item supported.  

If a service does not exist within effx, you'll still see the Service profile but will be asked to create an `effx.yaml` for it.  


### effx-yaml example

```yaml
---
version: effx/v1
kind: service
spec:
  name: "example-service"
  description: "example description for the example-service"
  annotations:
    effx.io/owned-by: "example-team"
  tags:
    group: "example"
    tier: "1"
    go: "1.15.5"
  contact:
    email: "support@effx.com"
    chat:
      label: "#community"
      url: "https://m11s.slack.com/archives/C01E19PPKNH"
    onCall:
      label: "pagerduty schedule"
      url: "https://docs.effx.com/#oncall-links"
  linkGroups:
    - label: "Dashboards"
      links:
        - label: "Datadog"
          url: "https://app.datadoghq.com/dashboard/y2w-wt6-wi8/effx-platform-status"
    - label: "Runbooks"
      links:
        - label: "Runbook"
          url: "https://blog.effx.com/how-to-write-a-runbook/"
    - label: "Version Control"
      links:
        - label: "GitHub"
          url: "https://github.com/effxhq/effx-sync-action"
    - label: "Documentation"
      links:
        - label: "API Documentation"
          url: "https://docs.effx.com/#api-documentation"
  dependencies:
    manual:
      # Both describe dependencies on other services by name
      - kind: "service"
        name: "arrakis"
      - name: "caladan"
```

## Publishing your services to effx

We provide various [Automations](automations-overview.mdx) to give you the ability to both verify (lint) and publish (sync) these `effx.yaml` files from your git repositories to us.  Jump to the automation that makes the most sense in your environment to learn more:
- [GitHub Actions](github.mdx)
- [GitLab CI/CD Jobs](gitlab.md)
- [Circle CI Orbs](circleci.md)
- [VCS Connect](vcs-connect.md)
