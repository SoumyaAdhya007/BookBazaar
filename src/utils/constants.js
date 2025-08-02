// user role constants
const userRolesEnum = {
  SuperAdmin: "super_admin",
  Admin: "admin",
  User: "user",
};
const AvailableUserRoles = Object.values(userRolesEnum);

// api key status constants
const apikeyStatusEnum = {
  Active: "active",
  Inactive: "inactive",
  Revoked: "revoked",
};
const AvailableApiKeyStatuses = Object.values(apikeyStatusEnum);

export {
  userRolesEnum,
  AvailableUserRoles,
  apikeyStatusEnum,
  AvailableApiKeyStatuses,
};
