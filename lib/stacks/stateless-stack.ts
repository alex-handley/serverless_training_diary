import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as logs from '@aws-cdk/aws-logs'
import { StackProps } from '../types'

export class StatelessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props)
    const App = this

    new lambda.Function(this, 'dbMigrator', {
      vpc: props.vpc,
      code: lambda.Code.fromAsset('ledger'),
      timeout: cdk.Duration.minutes(1),
      runtime: lambda.Runtime.RUBY_2_7,
      handler: 'app/actions/db_migrator.App::Actions::DBMigrator.run',
      logRetention: logs.RetentionDays.ONE_MONTH,
      environment: {
        APP_ENV: props.target
      }
    })
  }
}
