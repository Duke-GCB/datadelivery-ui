# datadelivery-ui

An [ember.js](http://emberjs.com/) application frontend for [D4S2](https://github.com/Duke-GCB/D4S2).


[![CircleCI](https://circleci.com/gh/Duke-GCB/datadelivery-ui.svg?style=svg)](https://circleci.com/gh/Duke-GCB/datadelivery-ui)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd datadelivery-ui`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

We use Docker and Ansible to deploy this application, as described in the [d4s2-webapp](https://github.com/Duke-GCB/gcb-ansible-roles/tree/master/d4s2_webapp) role.

Docker images are built on-demand as described by the [datadelivery.yml](https://github.com/Duke-GCB/gcb-ansible/blob/master/datadelivery.yml) playbook

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
