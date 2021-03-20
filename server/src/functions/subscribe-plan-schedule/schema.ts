export default {
  type: "any",
  properties: {
    email: { type: "string" },
    serviceConfig: {
      type: "any",
      properties: {
        "company-seal": {
          type: "any",
          properties: {
            productId: { type: "string" },
            priceId: { type: "string" },
            qty: { type: "number" },
          },
        },
        "registered-address": {
          type: "any",
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
            "forwarding-address": {
              type: "any",
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
        "accounting-tax": {
          type: "any",
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
          type: "any",
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
        "data-protection-management": {
          type: "any",
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
          type: "any",
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

