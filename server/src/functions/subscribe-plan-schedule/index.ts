import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'subscribe-plan-scheduled',
        request: {
          schema: {
            'application/json': schema
          }
        },
        cors: true
      }
    }
  ]
}
