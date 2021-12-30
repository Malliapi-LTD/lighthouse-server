# Readme

Here is your nice new github repository, please replace this with useful information about what this repository does.

You can find information below if your creating an:

- [backend service](#backend)
- [frontend service](#frontend)
- [npm package](#creating-an-npm-package)


## Installation

// Installation instructions

## Local Development

// Local development instructions

## Deployment Checklist

### Shared

- Environment variables
  - Ensure you have copied across and set all environment variables for each environment?
  - Ensured you've not added any passwords, private keys, secrets or otherwise sensitive information to this repository? That information should all be handled through #devops.
- Logging
  - Log out important information and consider using various log levels so dev/staging/production output relevant information.
  - Ensure any sensitive information is not being logged out into production.
  - Ask #devops to setup log groups within papertrail for the various environments

### Backend

- Kong endpoint configuration
  - If you are publicly exposing a service, you will need to get #devops to expose those services through Kong (our API gateway), you will need to ask them to do this for both staging and production.
  - If you are publicly exposing a service, you will need to get the service pen tested to ensure we are not exposing anything that could cause issues.
- Monitoring
  - Ensure that all the relevant metrics are being tracked, and that monitoring dashboards have been setup for your service. It is for you and your team to decide what the correct metrics to track are, but bare in mind that 2xx, 4xx, 5xx responses are all provided out of the box so these should all be tracked at the _very least_.
- Alerts
  - Ensure that you have informed #devops about any alerts that you need to have setup, they are the ones providing out-of-office support so for them to know when a service is down, we need to set up alerts for the metrics that you setup on your monitoring metrics.
- Add health endpoint
  - Your application should return a 200 when calling `/health`
  - If your service is internally dependent on some software, then you should run this task during the health check - if the task fails, it should return a 500. An example of this would be if you needed to generate a pdf file on the server, your health endpoint should generate a small pdf file to ensure the process of actually generating the pdf still works (in this instance, headless chrome is still working correctly).
  - If your service is dependent on other services, you should return some JSON on your health endpoint, looking something like
    ```json
    {
      "status": "UP",
      "another_service_name": "DOWN"
    }
    ```

### Frontend

- Informing IS to ensure a DNS entry has been added so it is accessible on corporate wifi
  - On eurostar's corporate wifi, any new subdomains/frontend applications (e.g. app-name.eurostar.com, app-name-staging.eurostar.com) need to be added to our internal DNS, you should let #devops know.
- Add health endpoint
  - Your application should return a 200 when calling `/health`


## Creating an NPM package

If you are creating an NPM package, you should ensure that you follow the naming convention, add the correct license, repository and set the *private publish registry*, like the following:

```json
{
  ...
  "name": "@eurostar/package-name",
  "repository": "git@github.com:Malliapi-LTD/package-name.git",
  "license": "UNLICENSED",
  "publishConfig": {
    "registry": "https://eurostar.jfrog.io/eurostar/api/npm/npm/"
  }
  ...
}
```
