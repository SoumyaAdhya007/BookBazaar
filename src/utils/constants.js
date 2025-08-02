// user role constants
const userRolesEnum = {
  SuperAdmin: "super_admin",
  Admin: "admin",
  User: "user",
};
const AvailableUserRoles = Object.values(userRolesEnum);

// api key status constants
const apikeyStatusesEnum = {
  Active: "active",
  Inactive: "inactive",
  Revoked: "revoked",
};
const AvailableApiKeyStatuses = Object.values(apikeyStatusesEnum);

// order status constants
const orderStatusesEnum = {
  Pending: "pending",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
};
const AvailableOrderStatuses = Object.values(orderStatusesEnum);

// order payment type constants
const paymentTypesEnum = {
  CashOnDelivery: "cash_on_delivery",
  UPI: "upi",
  DebitCard: "debit_card",
  CreditCard: "credit_card",
  NetBanking: "net_banking",
  Razorpay: "razorpay",
};
const AvailablePaymentTypes = Object.values(paymentTypesEnum);

// payment Mode constants
const paymentMethodsEnum = {
  UPI: "upi",
  DebitCard: "debit_card",
  CreditCard: "credit_card",
  NetBanking: "net_banking",
  Wallet: "wallet",
  EMI: "emi",
  Other: "other",
};
const AvailablePaymentMethods = Object.values(paymentMethodsEnum);

// payment status constants
const paymentStatusesEnum = {
  Created: "created",
  Pending: "pending",
  Success: "success",
  Failed: "failed",
  Refunded: "refunded",
};
const AvailablePaymentStatuses = Object.values(paymentStatusesEnum);

export {
  userRolesEnum,
  AvailableUserRoles,
  apikeyStatusesEnum,
  AvailableApiKeyStatuses,
  orderStatusesEnum,
  AvailableOrderStatuses,
  paymentTypesEnum,
  AvailablePaymentTypes,
  paymentMethodsEnum,
  AvailablePaymentMethods,
  paymentStatusesEnum,
  AvailablePaymentStatuses,
};
