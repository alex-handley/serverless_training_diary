# An example of a JS CDK Typescript project

## Description

At JS we prefer to split up orcastration logic up as follows:
- Network layer in the `NetworkStack`
- Stateful layer (DB's etc) in the `StatefulStack`
- Stateless layer (web workers, processors etc) in the `StatelessStack`


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
# serverless_training_diary
