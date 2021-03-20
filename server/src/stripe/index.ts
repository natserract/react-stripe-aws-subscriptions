import { timeStamp } from "node:console";
import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;
const PRICEID_CONNECT_BANK_ACCOUNT_METERED =
  process.env.PRICEID_CONNECT_BANK_ACCOUNT_METERED;
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
const PRICEID_METERED_DRIVE_STORAGE = process.env.PRICEID_METERED_DRIVE_STORAGE;
const PRODUCTID_COMPANY_SEAL = process.env.PRODUCTID_COMPANY_SEAL;
const THRESHOLD_PRODUCTIDS = process.env.THRESHOLD_PRODUCTIDS
  ? process.env.THRESHOLD_PRODUCTIDS.split(" ").map((e) => e.split(":"))
  : [];
const PROMOTION_CODE_FIRST_PURCHASE_DISCOUNT =
  process.env.PROMOTION_CODE_FIRST_PURCHASE_DISCOUNT;

type AddonItem = {
  productId: string;
  priceId: string;
  quantity?: number;
  isRecurring?: boolean;
};

type ServiceItem = {
  productId: string;
  priceId: string;
  quantity?: number;
  type: string;
  addons: AddonItem[];
};

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
  // With condition
  // MOCK
  /**
   *  "accounting-tax": {
            "productDesc": "Small Accounting Package",
            "productId": "small",
            "priceId": "$120/month",
            "qty": 1,
            "addons": [
                {
                    "productDesc": "GST Registration",
                    "productId": "gst_registration",
                    "priceId": "small/$400/one-time",
                    "qty": 1
                },
                {
                    "productDesc": "Bank Connection",
                    "productId": "bank_connection",
                    "priceId": "small/$15/one-time",
                    "qty": 2
                },
            ]
      }
   */
  // If accounting-tax !== null
  // addOns[..].productId have priceId on stripe

  // items.push({
  //   price: PRICEID_CONNECT_BANK_ACCOUNT_METERED
  // })

  // items.push({
  //   price: PRICEID_GST_REGISTRATION_METERED,
  //   billing_thresholds: {
  //     usage_gte: 1
  //   }
  // })

  // items.push({
  //   price: PRICEID_GST_QUARTERLY_SUBMISSION_METERED
  // })

  // items.push({
  //   price: PRICEID_ANNUAL_IR8S_SUBMISSION_METERED
  // })

  // items.push({
  //   price: PRICEID_TAX_FILLING_METERED
  // })

  // items.push({
  //   price: PRICEID_XBRL_FINANCIAL_METERED
  // })

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

  const incorp = serviceItems.find((i) => i.type == "incorp");

  // switch () {
  //   case value:
      
  //     break;
  //   default:
  //     break;
  // }

  if (incorp) {
    const endDate = new Date();

    // Set it to one month ago
    endDate.setMonth(endDate.getMonth() + 1);

    // Zero the time component
    endDate.setHours(0, 0, 0, 0);

    const add_invoice_items: Stripe.SubscriptionCreateParams.AddInvoiceItem[] = [
      {
        // Incorporation Fee dari Frontend,
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
      
      console.log('Addons', addons)

      if (
        [
          "data-protection-management",
          "data-breach-management",
          "data-protection-training",
        ].includes(service.type)
      ) {
        add_invoice_items.push({
          price: service.priceId,
          quantity: service.quantity,
        });
      } else {
        items.push({
          price: service.priceId,
          quantity: service.quantity,
        });
      }

      addons.forEach((addon) => {
        const found = THRESHOLD_PRODUCTIDS.find(([productId]: [string]) => {
          return addon.productId === productId;
        });

        if (addon.isRecurring) {
          items.push({
            price: addon.priceId,
            quantity: addon.quantity,
            billing_thresholds: !found
              ? undefined
              : {
                  usage_gte: +found[1],
                },
          });
        } else {
          add_invoice_items.push({
            price: addon.priceId,
            quantity: addon.quantity,
          });
        }
      });
    })
  );

  schedule.phases.push({
    iterations: 2,
    coupon: PROMOTION_CODE_FIRST_PURCHASE_DISCOUNT,
    // Recurring items only
    // Recurring License items from frontend (Base Package, Multi-currency Accounting, Managed Time Attendance),
    // Recurring License items from agent (e.g. Nominee director with quantity = 0),
    // Recurring Metered Items from backend (with billing thresholds)
    items: items,
    // One-time items from Frontend (GST, Additional Bank Connection, GIRO, Dependent Pass)
    add_invoice_items: add_invoice_items,
  });

  return stripe.subscriptionSchedules.create();
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
