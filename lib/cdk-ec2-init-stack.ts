import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';

import { Asset } from '@aws-cdk/aws-s3-assets';

export class CdkEc2InitStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here

        const vpc = ec2.Vpc.fromLookup(this, 'vpc', {
            isDefault: true,
        });
        
        const asset = new Asset(this, 'Asset', { path: "./test.txt" });

       
        new ec2.Instance(this, 'testInstance1', {
            machineImage: new ec2.AmazonLinuxImage(),
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.NANO
            ),
            vpc,

            init: ec2.CloudFormationInit.fromElements(
              ec2.InitFile.fromFileInline('/tmp/test.txt', "./test.txt")
            )
        });
        

        new ec2.Instance(this, 'testInstance2', {
            machineImage: new ec2.AmazonLinuxImage(),
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.NANO
            ),
            vpc,

            init: ec2.CloudFormationInit.fromElements(
                ec2.InitFile.fromFileInline("/tmp/test.txt", "./test.txt")
            )
        });
    }
}
