
export default {
    // AWS only allows you to define one handler per Lambda function
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'prices',
          request: {
            parameters: {
              querystrings: {
                limit: true
              }
            }
          },
          cors: true,
        }
      }
    ]
  }
  