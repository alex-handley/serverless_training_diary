import { Target } from '../types'

interface VpcConfig {
  cidr: string
  maxAzs: number
}

export const vpcConfig: { [key in Target]: VpcConfig } = {
  [Target.DEV]: {
    cidr: '10.121.0.0/16',
    maxAzs: 2,
  },
  [Target.STAGING]: {
    cidr: '10.122.0.0/16',
    maxAzs: 2,
  },
  [Target.PROD]: {
    cidr: '10.123.0.0/16',
    maxAzs: 3,
  },
}
