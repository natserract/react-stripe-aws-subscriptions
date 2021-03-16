export default {
  type: "object",
  properties: {
    email: { type: "string" },
    serviceConfig: {
      type: "object",
      properties: {
        companySeal: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
          },
        },
        registeredAddress: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
            addons: {
              type: "array",
              properties: {
                productId: { type: "string" },
                priceId: { type: "string" },
                qty: { type: "number" },
              },
            },
            forwardingAddress: {
              type: "object",
              properties: {
                formatted: { type: "string" },
                street_address: { type: "string" },
                locality: { type: "string" },
                region: { type: "string" },
                city: { type: "string" },
                province: { type: "string" },
                postal_code: { type: "string" },
                country: {
                  code: { type: "string" },
                  desc: { type: "string" },
                },
                street_address_line_2: { type: "string" },
              },
            },
            recipient_name: { type: "string" },
            recipient_phone_number: {
              prefix: {
                value: { type: "string" },
              },
              areacode: {
                value: { type: "string" },
              },
              nbr: {
                value: { type: "string" },
              },
            },
            use_lawkin_address: { type: "boolean" },
            opt_in_digital_mailroom: { type: "boolean" },
          },
        },
        accountingTax: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
            addons: {
              type: "array",
              properties: {
                productId: { type: "string" },
                priceId: { type: "string" },
                qty: { type: "number" },
              },
            },
          },
        },
        hr: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
            addons: {
              type: "array",
              properties: {
                productId: { type: "string" },
                priceId: { type: "string" },
                qty: { type: "number" },
              },
            },
          },
        },
        dataProtectionManagement: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
            addons: {
              type: "array",
              properties: {
                productId: { type: "string" },
                priceId: { type: "string" },
                qty: { type: "number" },
              },
            },
          },
        },
        corpsec: {
          type: "object",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
            addons: {
              type: "array",
              properties: {
                productId: { type: "string" },
                priceId: { type: "string" },
                qty: { type: "number" },
              },
            },
          },
        },
      },
    },
  },
  required: ["email", "serviceConfig"],
} as const;

