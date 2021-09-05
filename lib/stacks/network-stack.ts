import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

import { vpcConfig } from '../config/vpc'
import { Target } from '../types'

interface Props extends cdk.StackProps {
  target: Target
}

export class NetworkStack extends cdk.Stack {
  readonly vpc: ec2.Vpc

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props)

    const { target } = props

    this.vpc = new ec2.Vpc(this, 'Vpc', {
      cidr: vpcConfig[target].cidr,
      maxAzs: vpcConfig[target].maxAzs,
      subnetConfiguration: [
        {
          name: `${target}-api-subnet-public`,
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          name: `${target}-api-subnet-private`,
          subnetType: ec2.SubnetType.PRIVATE
        },
      ],
    })
  }
}
