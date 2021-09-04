import * as ec2 from '@aws-cdk/aws-ec2'
import * as rds from '@aws-cdk/aws-rds'
import * as cdk from '@aws-cdk/core'
import { rdsConfig } from '../config/rds'
import { StackProps } from '../types'

export class RDS extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id)
    const { vpc, target } = props

    const databaseIdentifier = `SET-ME-db-${target}`

    const rdsInstance = new rds.DatabaseInstanceFromSnapshot(this, id, {
      instanceIdentifier: databaseIdentifier,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12_7,
      }),
      vpc,
      snapshotIdentifier: rdsConfig[target].snapshotIdentifier,
      multiAz: rdsConfig[target].multiAz,
      instanceType: rdsConfig[target].instanceType,
      allocatedStorage: rdsConfig[target].allocatedStorage,
      deletionProtection: rdsConfig[target].deletionProtection,
      port: rdsConfig[target].port,
    })

    rdsInstance.connections.allowFromAnyIpv4(ec2.Port.tcp(rdsConfig[target].port))
  }
}
