import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_TEST_KEY;

const PRICEID_CONNECT_BANK_ACCOUNT_METERED = process.env.PRICEID_CONNECT_BANK_ACCOUNT_METERED
const PRICEID_GST_REGISTRATION_METERED =
  process.env.PRICEID_GST_REGISTRATION_METERED;
const PRICEID_GST_QUARTERLY_SUBMISSION_METERED =
  process.env.PRICEID_GST_QUARTERLY_SUBMISSION_METERED;
const PRICEID_ANNUAL_IR8S_SUBMISSION_METERED =
  process.env.PRICEID_ANNUAL_IR8S_SUBMISSION_METERED;
const PRICEID_TAX_FILLING_METERED = process.env.PRICEID_TAX_FILLING_METERED;
const PRICEID_XBRL_FINANCIAL_METERED =
  process.env.PRICEID_XBRL_FINANCIAL_METERED;
const PRICEID_BANK_ACCOUNT_GIRO_METERED =
  process.env.PRICEID_BANK_ACCOUNT_GIRO_METERED;
const PRICEID_APPOINTMENT_OF_DIRECTOR_METERED =
  process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_METERED;
const PRICEID_RESIGNATION_OF_DIRECTOR_METERED =
  process.env.PRICEID_RESIGNATION_OF_DIRECTOR_METERED;
const PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_METERED =
  process.env.PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_METERED;
const PRICEID_CHANGE_OF_COMPANY_NAME_METERED =
  process.env.PRICEID_CHANGE_OF_COMPANY_NAME_METERED;
const PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_METERED =
  process.env.PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_METERED;
const PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_METERED =
  process.env.PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_METERED;
const PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_METERED =
  process.env.PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_METERED;
const PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_METERED =
  process.env.PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_METERED;
const PRICEID_STRIKEOFF_OF_COMPANY_METERED =
  process.env.PRICEID_STRIKEOFF_OF_COMPANY_METERED;
const PRICEID_REVIEW_OF_DATA_PROTECTION_POLICIES_METERED =
  process.env.PRICEID_REVIEW_OF_DATA_PROTECTION_POLICIES_METERED;
const PRICEID_DATA_BREACH_INCIDENT_SIMULATION_METERED =
  process.env.PRICEID_DATA_BREACH_INCIDENT_SIMULATION_METERED;
const PRICEID_REFRESHER_TRAINING_METERED =
  process.env.PRICEID_REFRESHER_TRAINING_METERED;
const PRICEID_CPF_ACCOUNT_SETUP_METERED =
  process.env.PRICEID_CPF_ACCOUNT_SETUP_METERED;
const PRICEID_IR21_TAX_CLEARANCE_METERED =
  process.env.PRICEID_IR21_TAX_CLEARANCE_METERED;
const PRICEID_APPOINTMENT_OF_DIRECTOR_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_RESIGNATION_OF_DIRECTOR_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_CHANGE_OF_COMPANY_NAME_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_STRIKEOFF_OF_COMPANY_FREE = process.env.PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
const PRICEID_METERED_DRIVE_STORAGE = process.env.PRICEID_METERED_DRIVE_STORAGE;
const PRODUCTID_COMPANY_SEAL = process.env.PRODUCTID_COMPANY_SEAL;
const THRESHOLD_PRODUCTIDS = process.env.THRESHOLD_PRODUCTIDS
  ? process.env.THRESHOLD_PRODUCTIDS.split(" ").map((e) => e.split(":"))
  : [];
const PROMOTION_COUPON_ID_DISCOUNT =
  process.env.PROMOTION_COUPON_ID_DISCOUNT;
const PRODUCTID_COMPANY_INCORP = process.env.PRODUCTID_COMPANY_INCORP
const PRODUCT_ID_DATA_PROTECTION_MANAGEMENT = process.env.PRODUCT_ID_DATA_PROTECTION_MANAGEMENT
const PRODUCT_ID_DATA_BREACH_MANAGEMENT = process.env.PRODUCT_ID_DATA_BREACH_MANAGEMENT
const PRODUCT_ID_TRAINING_DATA_PROTECTION = process.env.PRODUCT_ID_TRAINING_DATA_PROTECTION
const PRODUCT_ID_SMALL_ACCOUNTING_TAX = process.env.PRODUCT_ID_SMALL_ACCOUNTING_TAX
const PRODUCT_ID_MEDIUM_ACCOUNTING_TAX = process.env.PRODUCT_ID_MEDIUM_ACCOUNTING_TAX
const PRODUCT_ID_LARGE_ACCOUNTING_TAX = process.env.PRODUCT_ID_LARGE_ACCOUNTING_TAX
const PRODUCT_ID_X_LARGE_ACCOUNTING_TAX = process.env.PRODUCT_ID_X_LARGE_ACCOUNTING_TAX
const PRODUCT_ID_ESSENTIAL_HR_PACKAGE = process.env.PRODUCT_ID_ESSENTIAL_HR_PACKAGE
const PRODUCT_ID_ESSENTIAL_CORPSEC = process.env.PRODUCT_ID_ESSENTIAL_CORPSEC
const PRODUCT_ID_COMPREHENSIVE_CORPSEC = process.env.PRODUCT_ID_COMPREHENSIVE_CORPSEC

type AddonItem = {
  productId: string;
  priceId: string;
  qty?: number;
  isRecurring?: boolean;
};

type ServiceItem = {
  productId: string;
  priceId: string;
  qty?: number;
  type: string;
  addons: AddonItem[];
};

// On Demand Service
const accountingTaxAddonsItems = [
  {
    price: PRICEID_GST_QUARTERLY_SUBMISSION_METERED
  },
  {
    price: PRICEID_ANNUAL_IR8S_SUBMISSION_METERED
  },
  {
    price: PRICEID_TAX_FILLING_METERED
  },
  {
    price: PRICEID_XBRL_FINANCIAL_METERED
  }
]

const hrServiceAddonsItems = [
  {
    price: PRICEID_CPF_ACCOUNT_SETUP_METERED
  },
  {
    price: PRICEID_BANK_ACCOUNT_GIRO_METERED
  },
  {
    price: PRICEID_ANNUAL_IR8S_SUBMISSION_METERED
  },
  {
    price: PRICEID_IR21_TAX_CLEARANCE_METERED
  }
]

const dataProtectionManagementAddonsItems = [
  {
    price: PRICEID_REVIEW_OF_DATA_PROTECTION_POLICIES_METERED
  }
]

const dataBreachManagementAddonsItems = [
  {
    price: PRICEID_DATA_BREACH_INCIDENT_SIMULATION_METERED
  }
]

const trainingOnDataProtectionAddonsItems = [
  {
    price: PRICEID_REFRESHER_TRAINING_METERED
  }
]

const corpsecEssentialAddonsItems = [
  {
    price: PRICEID_APPOINTMENT_OF_DIRECTOR_METERED
  }, 
  {
    price: PRICEID_RESIGNATION_OF_DIRECTOR_METERED
  },
  {
    price: PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_METERED
  },
  {
    price: PRICEID_CHANGE_OF_COMPANY_NAME_METERED
  },
  {
    price: PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_METERED
  }, 
  {
    price: PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_METERED
  },
  {
    price: PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_METERED
  },
  {
    price: PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_METERED
  },
  {
    price: PRICEID_STRIKEOFF_OF_COMPANY_METERED
  }
]

const corpsecCompherensiveAddonsItems = [
  {
    price: PRICEID_APPOINTMENT_OF_DIRECTOR_FREE
  }, 
  {
    price: PRICEID_RESIGNATION_OF_DIRECTOR_FREE
  },
  {
    price: PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_FREE
  },
  {
    price: PRICEID_CHANGE_OF_COMPANY_NAME_FREE
  },
  {
    price: PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_FREE
  }, 
  {
    price: PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_FREE
  },
  {
    price: PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_FREE
  },
  {
    price: PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_FREE
  },
  {
    price: PRICEID_STRIKEOFF_OF_COMPANY_FREE
  }
]

export const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
  maxNetworkRetries: 2,
});

export const createCustomer = (params: Stripe.CustomerCreateParams) => {
  return stripe.customers.create(params);
};

export const createAccountingSubscription = (
  customer: Stripe.Customer,
  items: Stripe.SubscriptionCreateParams.Item[],
  add_invoice_items: Stripe.SubscriptionCreateParams.AddInvoiceItem[]
) => {
  const selectedItem = (priceId: string) => items.find(i => i.price === priceId)
 
  if (selectedItem(PRICEID_CONNECT_BANK_ACCOUNT_METERED)) {
    items.push({
      price: PRICEID_CONNECT_BANK_ACCOUNT_METERED
    })
  } else if (selectedItem(PRICEID_GST_REGISTRATION_METERED)) {
      items.push({
        price: PRICEID_GST_REGISTRATION_METERED,
        billing_thresholds: {
          usage_gte: 1
        }
      })
  } else if (selectedItem(PRICEID_GST_QUARTERLY_SUBMISSION_METERED)) {
      items.push({
        price: PRICEID_GST_QUARTERLY_SUBMISSION_METERED
      })
  } else if (selectedItem(PRICEID_ANNUAL_IR8S_SUBMISSION_METERED)) {
    items.push({
      price: PRICEID_ANNUAL_IR8S_SUBMISSION_METERED
    })
  } 
  else if (selectedItem(PRICEID_TAX_FILLING_METERED)) {
    items.push({
      price: PRICEID_TAX_FILLING_METERED
    })
  } 
  else if (selectedItem(PRICEID_XBRL_FINANCIAL_METERED)) {
    items.push({
      price: PRICEID_XBRL_FINANCIAL_METERED
    })
  } else if (selectedItem(PRICEID_BANK_ACCOUNT_GIRO_METERED)) {
    items.push({
      price: PRICEID_BANK_ACCOUNT_GIRO_METERED
    })
  } else if (selectedItem(PRICEID_APPOINTMENT_OF_DIRECTOR_METERED)) {
    items.push({
      price: PRICEID_APPOINTMENT_OF_DIRECTOR_METERED
    })
  } else if (selectedItem(PRICEID_RESIGNATION_OF_DIRECTOR_METERED)) {
    items.push({
      price: PRICEID_RESIGNATION_OF_DIRECTOR_METERED
    })
  } else if (selectedItem(PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_METERED)) {
    items.push({
      price: PRICEID_CHANGE_OF_DIRECTOR_PARTICULAR_METERED
    })
  } else if (selectedItem(PRICEID_CHANGE_OF_COMPANY_NAME_METERED)) {
    items.push({
      price: PRICEID_CHANGE_OF_COMPANY_NAME_METERED
    })
  } else if (selectedItem(PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_METERED)) {
    items.push({
      price: PRICEID_CHANGE_OF_REGISTERED_BUSINESS_ADDRESS_METERED
    })
  } else if (selectedItem(PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_METERED)) {
    items.push({
      price: PRICEID_CHANGE_OF_FINANCIAL_YEAR_END_METERED
    })
  } else if (selectedItem(PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_METERED)) {
    items.push({
      price: PRICEID_CHANGE_OF_PRINCIPAL_BUSINESS_ACTIVITIES_METERED
    })
  } else if (selectedItem(PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_METERED)) {
    items.push({
      price: PRICEID_TRANSFER_ALLOTMENT_OF_SHARES_METERED
    })
  } else if (selectedItem(PRICEID_STRIKEOFF_OF_COMPANY_METERED)) {
    items.push({
      price: PRICEID_STRIKEOFF_OF_COMPANY_METERED
    })
  } else if (selectedItem(PRICEID_REVIEW_OF_DATA_PROTECTION_POLICIES_METERED)) {
    items.push({
      price: PRICEID_REVIEW_OF_DATA_PROTECTION_POLICIES_METERED
    })
  } else if (selectedItem(PRICEID_DATA_BREACH_INCIDENT_SIMULATION_METERED)) {
    items.push({
      price: PRICEID_DATA_BREACH_INCIDENT_SIMULATION_METERED
    })
  } else if (selectedItem(PRICEID_REFRESHER_TRAINING_METERED)) {
    items.push({
      price: PRICEID_REFRESHER_TRAINING_METERED
    })
  } else if (selectedItem(PRICEID_CPF_ACCOUNT_SETUP_METERED)) {
    items.push({
      price: PRICEID_CPF_ACCOUNT_SETUP_METERED
    })
  } else if (selectedItem(PRICEID_IR21_TAX_CLEARANCE_METERED)) {
    items.push({
      price: PRICEID_IR21_TAX_CLEARANCE_METERED
    })
  } 

  return stripe.subscriptions.create({
    customer: customer.id,
    items: items,
    add_invoice_items: add_invoice_items,
  });
};

export const createAccountingSubscriptionScheduled = async (
  customer: Stripe.Customer,
  serviceItems: ServiceItem[]
) => {
  const schedule: Stripe.SubscriptionScheduleCreateParams = {
    start_date: "now",
    end_behavior: "release",
    phases: [],
    customer: customer.id,
  };

  const incorp = serviceItems.find((i) => i.productId === PRODUCTID_COMPANY_INCORP);

  if (incorp) {
    const endDate = new Date();

    // Set it to one month ago
    endDate.setMonth(endDate.getMonth() + 1);

    // Zero the time component
    endDate.setHours(0, 0, 0, 0);

    const add_invoice_items: Stripe.SubscriptionCreateParams.AddInvoiceItem[] = [
      {
        // Incorporation Fee from Frontend,
        price: incorp.priceId,
        quantity: 1,
      },
    ];

    const seal = serviceItems.find(
      (i) => i.productId == PRODUCTID_COMPANY_SEAL
    );

    if (seal) {
      add_invoice_items.push({
        price: seal.priceId,
        quantity: 1,
      });
    }

    schedule.phases[0] = {
      end_date: endDate.getTime() / 1000,
      trial: true,

      // Free as entire phase is counted as trial
      items: [
        {
          //Metered Drive Storage
          price: PRICEID_METERED_DRIVE_STORAGE,
        },
      ],

      // Charged immediately
      add_invoice_items: add_invoice_items,
    };
  }

  const items: Stripe.SubscriptionCreateParams.Item[] = [];
  const add_invoice_items: Stripe.SubscriptionCreateParams.AddInvoiceItem[] = [];

  await Promise.all(
    serviceItems.map(async (service) => {
      const addons = service.addons ? await Promise.all(
        service.addons.map(async (addon) => {
          const addonPrice = await stripe.prices.retrieve(addon.priceId);
          addon.isRecurring = !!addonPrice.recurring;
          return addon;
        })
      ): [];
      
      const { product: productId } = await stripe.prices.retrieve(service.priceId);
      
      switch (productId) {
        case PRODUCT_ID_SMALL_ACCOUNTING_TAX:
          items.push(...accountingTaxAddonsItems)
          break;
        case PRODUCT_ID_MEDIUM_ACCOUNTING_TAX:
          items.push(...accountingTaxAddonsItems)
          break;
        case PRODUCT_ID_LARGE_ACCOUNTING_TAX:
          items.push(...accountingTaxAddonsItems)
          break;
        case PRODUCT_ID_X_LARGE_ACCOUNTING_TAX:
          items.push(...accountingTaxAddonsItems)
          break;
        case PRODUCT_ID_DATA_PROTECTION_MANAGEMENT:
          items.push(...dataProtectionManagementAddonsItems)
          break;
        case PRODUCT_ID_DATA_BREACH_MANAGEMENT:
          items.push(...dataBreachManagementAddonsItems)
          break;
        case PRODUCT_ID_TRAINING_DATA_PROTECTION:
          items.push(...trainingOnDataProtectionAddonsItems);
          break;
        case PRODUCT_ID_ESSENTIAL_HR_PACKAGE:
          items.push(...hrServiceAddonsItems)
          break;
        case PRODUCT_ID_ESSENTIAL_CORPSEC:
          items.push(...corpsecEssentialAddonsItems)
          break;
        case PRODUCT_ID_COMPREHENSIVE_CORPSEC:
          items.push(...corpsecCompherensiveAddonsItems)
        default:
          console.log('Undefined items', items)
          break;
      }

      if (
        [
          PRODUCT_ID_DATA_PROTECTION_MANAGEMENT,
          PRODUCT_ID_DATA_BREACH_MANAGEMENT,
          PRODUCT_ID_TRAINING_DATA_PROTECTION,
        ].includes(service.productId)
      ) {
        add_invoice_items.push({
          price: service.priceId,
          quantity: service.qty,
        });
      } else {
        items.push({
          price: service.priceId,
          quantity: service.qty,
        });
      }

      addons.forEach((addon) => {
        // console.log('addon', addon)
        const found = THRESHOLD_PRODUCTIDS.find(([productId]: [string]) => {
          return addon.productId === productId;
        });

        if (addon.isRecurring) {
          items.push({
            price: addon.priceId,
            quantity: addon.qty,
            billing_thresholds: !found
              ? undefined
              : {
                  // If pass this +found[1] -> Nan
                  usage_gte: +found[1],
                },
          });
        } else {
          add_invoice_items.push({
            price: addon.priceId,
            quantity: addon.qty,
          });
        }
      });

    })
  );


  schedule.phases.push({
    iterations: 2,
    coupon: PROMOTION_COUPON_ID_DISCOUNT,
    // Recurring items only
    // Recurring License items from frontend (Base Package, Multi-currency Accounting, Managed Time Attendance),
    // Recurring License items from agent (e.g. Nominee director with quantity = 0),
    // Recurring Metered Items from backend (with billing thresholds)
    items: items,
    // One-time items from Frontend (GST, Additional Bank Connection, GIRO, Dependent Pass)
    add_invoice_items: add_invoice_items,
  });

  console.log('schedule phase items', items)
  console.log('schedule phase addinvoiceitems', add_invoice_items)

  return stripe.subscriptionSchedules.create(schedule);
};

export const stripeCustomers = {
  create: (source: string, email: string) => {
    return stripe.customers.create({
      email,
      source,
    });
  },
  delete: async (customerId: string) => {
    return await stripe.customers.del(customerId);
  },
};

// export const stripeSubscription = {
//   entityAccountingSubscribe:

// export const stripePrices = {
//   listAll: async (priceListParams: Stripe.PriceListParams) => {
//     return await stripe.prices.list(priceListParams);
//   },
// };

// export const stripeProduct = {
//   listAll: async (productListParams?: Stripe.ProductListParams) => {
//     return await stripe.products.list(productListParams, {
//       apiKey: SECRET_API_KEY
//     });
//   },
//   retrieve: async (productId: string) => {
//     return await stripe.products.retrieve(productId);
//   },
// };

// export const stripeAccounts = {
//   listAll: async (accountListParams?: Stripe.AccountListParams) => {
//     return await stripe.accounts.list(accountListParams);
//   },
// };
