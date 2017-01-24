/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * The default configuration file
 * @author TCSCODER
 * @version 1.0
 */


module.exports = {
  AUTH_DOMAIN: 'AUTH_DOMAIN',
  LOG_LEVEL: 'LOG_LEVEL',
  RABBITMQ_URL: 'RABBITMQ_URL',
  // Source RabbitMQ that provides events to tc-connect-notifications
  SOURCE_RABBIT_URL: 'SOURCE_RABBIT_URL',
  SOURCE_RABBIT_EXCHANGE_NAME: 'SOURCE_RABBIT_EXCHANGE_NAME',
  SOURCE_RABBIT_QUEUE_NAME: 'SOURCE_RABBIT_QUEUE_NAME',
  // Target RabbitMQ that receive notifications from tc-connect-notifications
  TARGET_RABBIT_URL: 'TARGET_RABBIT_URL',
  TARGET_RABBIT_EXCHANGE_NAME: 'TARGET_RABBIT_EXCHANGE_NAME',
  TARGET_RABBIT_ROUTING_KEY: 'TARGET_RABBIT_ROUTING_KEY',
  TARGET_RABBIT_QUEUE_NAME: 'TARGET_RABBIT_QUEUE_NAME',
  COPILOT_TARGET_RABBIT_QUEUE_NAME: 'COPILOT_TARGET_RABBIT_QUEUE_NAME',
  COPILOT_TARGET_RABBIT_ROUTING_KEY: 'COPILOT_TARGET_RABBIT_ROUTING_KEY',
  MANAGER_TARGET_RABBIT_QUEUE_NAME: 'MANAGER_SOURCE_RABBIT_QUEUE_NAME',
  MANAGER_TARGET_RABBIT_ROUTING_KEY: 'MANAGER_TARGET_RABBIT_ROUTING_KEY',
  DELAY_RABBIT_EXCHANGE_NAME: 'DELAY_RABBIT_EXCHANGE_NAME',
  UNCLAIMED_PROJECT_REPOST_DELAY: 'UNCLAIMED_PROJECT_REPOST_DELAY',
  CAPTURE_LOGS: 'CAPTURE_LOGS',
  LOGENTRIES_TOKEN: 'LOG_ENTRIES_TOKEN',
  API_BASE_URL: 'API_BASE_URL',
  // The manager group
  ALL_MANAGER_USER_IDS: 'ALL_MANAGER_USER_IDS',
  // The copilot group
  ALL_COPILOT_USER_IDS: 'ALL_COPILOT_USER_IDS',
  // Disable delay exchange and use direct instead ( delete existing delay exchnge after changing)
  DISABLE_DELAY_EXCHANGE: 'DISABLE_DELAY_EXCHANGE',
  SLACK_ICON_URL: 'SLACK_ICON_URL',
  SLACK_USERNAME: 'SLACK_USERNAME',
};