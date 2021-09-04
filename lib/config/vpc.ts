import { Target } from '../types'

interface VpcConfig {
  cidr: string
  maxAzs: number
}

export const vpcConfig: { [key in Target]: VpcConfig } = {
  [Target.DEV]: {
    cidr: 'SET-ME/16',
    maxAzs: 2,
  },
  [Target.STAGING]: {
    cidr: 'SET-ME/16',
    maxAzs: 2,
  },
  [Target.PROD]: {
    cidr: 'SET-ME/16',
    maxAzs: 3,
  },
}
