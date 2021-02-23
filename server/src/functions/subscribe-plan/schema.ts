export default {
    type: "object",
    properties: {
      productPlanId: { type: 'string' },
      email: { type: 'string' },
    },
    required: ['productPlanId', 'email']
  } as const;
  