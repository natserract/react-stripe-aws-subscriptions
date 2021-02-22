export default {
    type: "object",
    properties: {
      productPlanId: { type: 'string '},
      email: { type: 'string' },
      name: { type: 'string' },
      type: { type: 'string' },
      description: { type: 'string' },
      images: { type: 'array' },
    },
    required: ['productPlanId', 'email']
  } as const;
  