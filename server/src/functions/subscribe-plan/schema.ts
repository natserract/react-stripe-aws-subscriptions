export default {
    type: "object",
    properties: {
      // productPlanId: { type: 'string' },
      email: { type: 'string' },
      accountingTax: { 
        type: 'object',
        properties: {
          priceId: { type: 'string' },
          qty: { type: 'string' },
          addons: { type: 'array' }
        }
      },
    },
    required: ['email']
  } as const;
  