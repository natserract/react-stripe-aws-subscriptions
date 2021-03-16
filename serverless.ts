import type { AWS } from '@serverless/typescript';
import { 
  subscribePlan, 
  viewProducts,
  viewPrices,
  detailProduct,
  subscribePlanScheduled,
} from './server/src/functions';

const serverlessConfiguration: AWS = {
  service: 'server',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    subscribePlan, 
    viewProducts, 
    viewPrices, 
    detailProduct ,
    subscribePlanScheduled
  }
}

module.exports = serverlessConfiguration;
