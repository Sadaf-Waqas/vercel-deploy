/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { config as loadEnvironmentVariables } from 'dotenv';

function plugins(on: Cypress.PluginEvents, config: Cypress.Config) {
  const output = loadEnvironmentVariables();

  const env = {
    ...(config.env ?? {}),
    ...(output.parsed ?? {}),
  };

  on('task', {
    async getInviteEmail(mailbox: string) {
      return getInviteEmail(mailbox);
    },
  });

  return {
    ...config,
    env,
  };
}

export default plugins;

async function getInviteEmail(mailbox: string) {
  const url = `http://0.0.0.0:9000/api/v1/mailbox/${mailbox}`;
  const fetch = require('node-fetch');

  // @ts-ignore
  const response = await fetch(url);
  const json = await response.json();

  if (!json) {
    return;
  }

  const messageId = json[0].id;
  const messageUrl = `${url}/${messageId}`;

  // @ts-ignore
  const messageResponse = await fetch(messageUrl);

  return messageResponse.json();
}
