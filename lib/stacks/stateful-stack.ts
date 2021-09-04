import * as cdk from '@aws-cdk/core'
import { RDS } from '../constructs/rds'
import { StackProps } from '../types'

export class StatefulStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props)

    new RDS(this, 'RDS', props)
  }
}
