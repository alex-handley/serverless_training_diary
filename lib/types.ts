import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export enum Target {
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production',
}

export interface StackProps extends cdk.StackProps {
  vpc: ec2.Vpc,
  target: Target,
}
