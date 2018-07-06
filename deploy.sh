#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

ENV=$1
ACCOUNT_ID=$(eval "echo \$${ENV}_AWS_ACCOUNT_ID")

configure_aws_cli() {
	export AWS_ACCESS_KEY_ID=$(eval "echo \$${ENV}_AWS_ACCESS_KEY_ID")
	export AWS_SECRET_ACCESS_KEY=$(eval "echo \$${ENV}_AWS_SECRET_ACCESS_KEY")
	aws --version
	aws configure set default.region $AWS_REGION
	aws configure set default.output json
}

deploy_cluster() {

    family="tc-connect-notifications"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster $AWS_ECS_CLUSTER --service $AWS_ECS_SERVICE --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    echo "Deployed!"
    return 0
}

make_task_def(){
	task_template='[
		{
			"name": "tc-connect-notifications",
			"image": "%s.dkr.ecr.%s.amazonaws.com/%s:%s",
			"essential": true,
			"memory": 200,
			"cpu": 10,
			"environment": [
				{
					"name": "NODE_ENV",
					"value": "%s"
				},
				{
					"name": "LOG_LEVEL",
					"value": "%s"
				},
				{
					"name": "CAPTURE_LOGS",
					"value": "%s"
				},
				{
					"name": "LOGENTRIES_TOKEN",
					"value": "%s"
				},
				{
					"name": "RABBITMQ_URL",
					"value": "%s"
				},
				{
					"name": "SYSTEM_USER_CLIENT_ID",
					"value": "%s"
				},
				{
					"name": "SYSTEM_USER_CLIENT_SECRET",
					"value": "%s"
				},
				{
					"name": "TC_SLACK_WEBHOOK_URL",
					"value": "%s"
				}
			],
			"logConfiguration": {
				"logDriver": "awslogs",
				"options": {
				"awslogs-group": "/aws/ecs/%s",
				"awslogs-region": "%s",
				"awslogs-stream-prefix": "%s"
				}
			}
		}
	]'
	RABBITMQ_URL=$(eval "echo \$${ENV}_RABBITMQ_URL")
	CAPTURE_LOGS=$(eval "echo \$${ENV}_CAPTURE_LOGS")
	LOGENTRIES_TOKEN=$(eval "echo \$${ENV}_LOGENTRIES_TOKEN")
	LOG_LEVEL=$(eval "echo \$${ENV}_LOG_LEVEL")
	if [ "$ENV" = "PROD" ]; then
		NODE_ENV=production
	elif [ "$ENV" = "DEV" ]; then
		NODE_ENV=development
	fi

	task_def=$(printf "$task_template" $ACCOUNT_ID $AWS_REGION $AWS_REPOSITORY $CIRCLE_SHA1 $NODE_ENV $LOG_LEVEL $CAPTURE_LOGS $LOGENTRIES_TOKEN $RABBITMQ_URL $SYSTEM_USER_CLIENT_ID $SYSTEM_USER_CLIENT_SECRET $TC_SLACK_WEBHOOK_URL $AWS_ECS_CLUSTER $AWS_REGION $NODE_ENV)
}

push_ecr_image(){
	eval $(aws ecr get-login --region $AWS_REGION)
	docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$AWS_REPOSITORY:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family 2> /dev/null  | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
