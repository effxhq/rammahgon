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

We've created a nifty [in-app YAML wizard](https://app.effx.com/yaml/wizard) to guide you through the process of creating your first service, but if you prefer to write the YAML yourself, you can view the [full resource specification for a Service](/docs/services-model.mdx).

A [full example-service](/docs/services-model.mdx#yaml-reference) definition can be used for reference as well.

Beyond the specification, a few sections are described a bit more in detail below, especially with how they're used within other parts of the platform:

### Tags explained

Tags are a key part of the Service profile and are used throughout the rest of the effx platform for discovery, reporting, tracking migrations and measurements in Service Standards.

They are the ultimate representation of the taxonomy for how you structure your services within your company.  For some companies, this could be using a `tier` system, or a `group` taxonomy.  Others have used tags to define things like `pci` as true to ensure that something is noted as being in scope for PCI compliance.  

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


## Publishing your services to effx

We provide various [Automations](/docs/automations-overview.mdx) to give you the ability to both verify (lint) and publish (sync) these `effx.yaml` files from your git repositories to us.  Jump to the automation that makes the most sense in your environment to learn more:
- [GitHub Actions](/docs/github.mdx)
- [GitLab CI/CD Jobs](/docs/gitlab.md)
- [Circle CI Orbs](/docs/circleci.md)
- [VCS Connect](/docs/vcs-connect.md)
