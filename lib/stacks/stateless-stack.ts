import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as goLambda from '@aws-cdk/aws-lambda-go'
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as logs from '@aws-cdk/aws-logs'
import { StackProps } from '../types'
import { vpcConfig } from '../config/vpc'

export class StatelessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props)
    const App = this

    const apiGateway = new apigateway.RestApi(App, 'training-diary-api-g', {
      restApiName: 'Serverless API Gateway',
      description: 'This service is a chance to play with CDK and relearn Go',
    })

    const exampleLambda = new goLambda.GoFunction(App, 'example-go-function', {
      entry: 'app',
      vpc: props.vpc,
      runtime: lambda.Runtime.GO_1_X,
      logRetention: logs.RetentionDays.ONE_MONTH,
      timeout: cdk.Duration.seconds(5),
    })

    const getExampleIntegration = new apigateway.LambdaIntegration(exampleLambda, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' }
    })

    const version = apiGateway.root.addResource('v1')
    const resource = version.addResource('example')
    resource.addMethod('GET', getExampleIntegration)
  }
}
