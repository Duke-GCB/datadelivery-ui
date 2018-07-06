#!/bin/sh

set -e

git clone --recursive $PLAYBOOK_REPO_URL -b $PLAYBOOK_REF $PLAYBOOK_DIR
cd $PLAYBOOK_DIR
git crypt unlock $GIT_CRYPT_KEY
ansible-galaxy install -r install_roles.yml
ansible-playbook \
  --tags "$PLAYBOOK_TAG" \
  -e d4s2_docker_image=$D4S2_DOCKER_IMAGE \
  -e datadelivery_ui_docker_image=$DATADELIVERY_UI_DOCKER_IMAGE \
  -e docker_registry=$DOCKER_REGISTRY \
  -e docker_username=gitlab-ci-token \
  -e docker_password=$CI_JOB_TOKEN \
  -u $DEPLOY_USER \
  --private-key=$DEPLOY_KEY \
  -i inventory \
  -l $DEPLOY_GROUP \
  $DEPLOY_PLAYBOOK
