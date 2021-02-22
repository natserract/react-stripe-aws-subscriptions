// See documentation: https://www.serverless.com/blog/serverless-v1.18.0

export default {
    // AWS only allows you to define one handler per Lambda function
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'product/{id}',
          cors: true,
        }
      }
    ]
  }
  