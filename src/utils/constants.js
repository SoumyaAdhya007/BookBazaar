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
  Debit_Card: "debit_card",
  CreditCard: "credit_card",
  NetBanking: "net_banking",
  Razorpay: "razorpay",
};
const AvailablePaymentTypes = Object.values(paymentTypesEnum);

export {
  userRolesEnum,
  AvailableUserRoles,
  apikeyStatusesEnum,
  AvailableApiKeyStatuses,
  orderStatusesEnum,
  AvailableOrderStatuses,
  paymentTypesEnum,
  AvailablePaymentTypes,
};
