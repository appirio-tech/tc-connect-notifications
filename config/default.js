/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * The default configuration file
 * @author TCSCODER
 * @version 1.0
 */


module.exports = {
  RABBITMQ: {
    URL: 'amqp://localhost:5672',
    // Source RabbitMQ that provides events to tc-connect-notifications
    PROJECTS_EXCHANGE_NAME: 'projects',
    CONNECT_NOTIFICATIONS_QUEUE_NAME: 'connect-notifications',

    // Target RabbitMQ that receive notifications from tc-connect-notifications
    NOTIFICATIONS_EXCHANGE_NAME: 'notifications',

    DELAYED_NOTIFICATIONS_EXCHANGE_NAME: 'connect-notifications-reminders',
    // The number of times reminders are sent
    DELAYED_NOTIFICATIONS_TTL: 3,
    // 12 hours
    DELAY_DURATION: 43200000,
  },
  AUTH_DOMAIN: 'topcoder-dev.com',
  LOG_LEVEL: 'info',
  CAPTURE_LOGS: 'false',
  // Token is generated from https://logentries.com/
  LOGENTRIES_TOKEN: '',

  // The different services used by this project
  API_URL_PROJECTS: 'http://localhost:3001/v4/projects',
  API_URL_MEMBERS: 'http://localhost:3001/v3/members',
  API_URL_USERS: 'http://localhost:3001/v3/users',
  API_URL_AUTHORIZATIONS: 'http://localhost:3001/v3/authorizations',
  API_URL_TOPICS: 'http://localhost:3001/v5/topics',

  // Disable delay exchange and use direct instead ( delete existing delay exchnge after changing)
  DISABLE_DELAY_EXCHANGE: false,

  TC_SLACK_WEBHOOK_URL: '',
  SLACK_CHANNEL_MANAGERS: '#connect-projects-test',
  SLACK_CHANNEL_NPS: '#connect-projects-test',
  SLACK_CHANNEL_COPILOTS: '#connect-projects-test',
  SLACK_ICON_URL: 'https://emoji.slack-edge.com/T03R80JP7/coder-grinning/a3b7f3fe9e838377.png',
  SLACK_USERNAME: 'Coder',
  TOPCODER_ICON_URL: 'https://emoji.slack-edge.com/T03R80JP7/topcoder/7c68acd90a6b6d77.png',
  AUTH0_PROXY_SERVER_URL: '',
};
