import * as ec2 from '@aws-cdk/aws-ec2'
import * as rds from '@aws-cdk/aws-rds'
import { StorageType } from '@aws-cdk/aws-rds'
import { Target } from '../types'

interface RDSConfig {
  snapshotIdentifier: string
  storageEncrypted: boolean
  multiAz: boolean
  instanceType: ec2.InstanceType
  allocatedStorage: number
  storageType: StorageType
  deletionProtection: boolean
  port: number
}

export const rdsConfig: { [key in Target]: RDSConfig } = {
  [Target.DEV]: {
    snapshotIdentifier: 'NAME-ME-development',
    storageEncrypted: true,
    multiAz: false,
    allocatedStorage: 1024,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
    storageType: rds.StorageType.GP2,
    deletionProtection: false,
    port: 5432,
  },
  [Target.STAGING]: {
    snapshotIdentifier: 'NAME-ME-staging',
    storageEncrypted: true,
    multiAz: false,
    allocatedStorage: 1024,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
    storageType: rds.StorageType.GP2,
    deletionProtection: false,
    port: 5432,
  },
  [Target.PROD]: {
    snapshotIdentifier: 'NAME-ME-production',
    storageEncrypted: true,
    multiAz: true,
    allocatedStorage: 1024,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.STANDARD6_GRAVITON, ec2.InstanceSize.LARGE),
    storageType: rds.StorageType.GP2,
    deletionProtection: true,
    port: 5432,
  },
}
