#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { NetworkStack } from '../lib/stacks/network-stack'
import { StatefulStack } from '../lib/stacks/stateful-stack'
import { StatelessStack } from '../lib/stacks/stateless-stack'
import { Target } from '../lib/types'

const app = new cdk.App()

const environments = {
  [Target.DEV]: { account: 'ACCOUNT_ID', region: 'us-east-1' },
  [Target.STAGING]: { account: 'ACCOUNT_ID', region: 'us-east-1' },
  [Target.PROD]: { account: 'ACCOUNT_ID', region: 'us-east-1' },
}

const target = Target.DEV // TODO: set environment variable in build

const networkStack = new NetworkStack(app, 'NetworkStack', { env: environments[target], target })

let stacks: Array<cdk.Stack> = [networkStack]
stacks.push(new StatefulStack(app, 'GILStatefulStack', { env: environments[target], vpc: networkStack.vpc, target }))
stacks.push(new StatelessStack(app, 'StatelessStack', { env: environments[target], vpc: networkStack.vpc, target }))

stacks.forEach(function(stack) {
  cdk.Tags.of(stack).add('Env', target)
  cdk.Tags.of(stack).add('Tier', 'Compute')
  cdk.Tags.of(stack).add('Region', 'US')
  cdk.Tags.of(stack).add('IAC', 'CDK')
  cdk.Tags.of(stack).add('Resource', 'Lambda/RDS/sg/subnet')
  cdk.Tags.of(stack).add('Description', 'serverless-training-diary')
  cdk.Tags.of(stack).add('Service', 'serverless-training-diary')
  cdk.Tags.of(stack).add('version', 'alpha')
  cdk.Tags.of(stack).add('Repo', 'github.com/alex-handley/serverless_training_diary.git')
})
