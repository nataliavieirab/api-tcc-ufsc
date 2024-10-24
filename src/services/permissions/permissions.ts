export enum Actions {
  createUser = 'createUser',
  updateUser = 'updateUser',
  deleteUser = 'deleteUser',
  findUsers = 'findUsers',

  createOrganization = 'createOrganization',
  updateOrganization = 'updateOrganization',
  findOrganizations = 'findOrganizations',
  deleteOrganization = 'deleteOrganization',

  createStore = 'createStore',
  updateStore = 'updateStore',
  deleteStore = 'deleteStore',
  findStores = 'findStores',

  createRole = 'createRole',
  updateRole = 'updateRole',
  deleteRole = 'deleteRole',
  findRoles = 'findRoles',
  findPermissions = 'findPermissions',

  createCashRegister = 'createCashRegister',
  updateCashRegister = 'updateCashRegister',
  findCashRegisters = 'findCashRegisters',

  createCategory = 'createCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',
  findCategories = 'findCategories',

  updateDeliverySettings = 'updateDeliverySettings',
  findDeliverySettings = 'findDeliverySettings',
  openDelivery = 'openDelivery',
  closeDelivery = 'closeDelivery',
  addNeighborhood = 'addNeighborhood',
  findNeighborhoods = 'findNeighborhoods',
  deleteNeighborhood = 'deleteNeighborhood',

  findOrders = 'findOrders',
  acceptOrder = 'acceptOrder',
  refuseOrder = 'refuseOrder',
  setOrderAsShipping = 'setOrderAsShipping',
  finishOrder = 'finishOrder',

  createPaymentType = 'createPaymentType',
  updatePaymentType = 'updatePaymentType',
  deletePaymentType = 'deletePaymentType',
  findPaymentTypes = 'findPaymentTypes',

  createAddOn = 'createAddOn',
  updateAddOn = 'updateAddOn',
  deleteAddOn = 'deleteAddOn',
  findAddOns = 'findAddOns',

  createProductSet = 'createProductSet',
  updateProductSet = 'updateProductSet',
  deleteProductSet = 'deleteProductSet',
  findProductSets = 'findProductSets',
  addProductToSet = 'addProductToSet',
  removeProductFromSet = 'removeProductFromSet',

  createProduct = 'createProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',
  findProducts = 'findProducts',
  addOptionToProduct = 'addOptionToProduct',
  removeOptionFromProduct = 'removeOptionFromProduct',
  addAddOnToProduct = 'addAddOnToProduct',
  removeAddOnFromProduct = 'removeAddOnFromProduct',
}

export enum SystemRoles {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  SYSTEM_ASSISTANT = 'SYSTEM_ASSISTANT',
  ORGANIZATION_ADMIN = 'ORGANIZATION_ADMIN',
  ORGANIZATION_ASSISTANT = 'ORGANIZATION_ASSISTANT',
  STORE_ADMIN = 'STORE_ADMIN',
}

export enum Modules {
  admin = 'admin',
  organizations = 'organizations',
  store = 'store',
  customer = 'customer',
}

export const storeAdminPermissions = [
  Actions.createUser,
  Actions.updateUser,
  Actions.deleteUser,
  Actions.findUsers,

  Actions.updateStore,
  Actions.deleteStore,
  Actions.findStores,

  Actions.createRole,
  Actions.updateRole,
  Actions.deleteRole,
  Actions.findRoles,
  Actions.findPermissions,

  Actions.createCashRegister,
  Actions.updateCashRegister,
  Actions.findCashRegisters,

  Actions.createCategory,
  Actions.updateCategory,
  Actions.deleteCategory,
  Actions.findCategories,

  Actions.updateDeliverySettings,
  Actions.findDeliverySettings,
  Actions.openDelivery,
  Actions.closeDelivery,
  Actions.addNeighborhood,
  Actions.findNeighborhoods,
  Actions.deleteNeighborhood,

  Actions.findOrders,
  Actions.acceptOrder,
  Actions.refuseOrder,
  Actions.setOrderAsShipping,
  Actions.finishOrder,

  Actions.createPaymentType,
  Actions.updatePaymentType,
  Actions.deletePaymentType,
  Actions.findPaymentTypes,

  Actions.createAddOn,
  Actions.updateAddOn,
  Actions.deleteAddOn,
  Actions.findAddOns,

  Actions.createProductSet,
  Actions.updateProductSet,
  Actions.deleteProductSet,
  Actions.findProductSets,
  Actions.addProductToSet,
  Actions.removeProductFromSet,

  Actions.createProduct,
  Actions.updateProduct,
  Actions.deleteProduct,
  Actions.findProducts,
  Actions.addOptionToProduct,
  Actions.removeOptionFromProduct,
  Actions.addAddOnToProduct,
  Actions.removeAddOnFromProduct,
];

export const systemRolesPermissions: any = {
  admin: {
    [Actions.createUser]: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    [Actions.findUsers]: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    [Actions.findOrganizations]: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    [Actions.createOrganization]: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
  },
  organization: {
    [Actions.createUser]: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
    [Actions.findUsers]: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
    [Actions.createStore]: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
    [Actions.findStores]: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
  },
  store: storeAdminPermissions.reduce((permsObject, action) => {
    permsObject[action] = ['STORE_ADMIN'];
    return permsObject;
  }, {}),
};

export function getSystemRolePermissions(systemRole) {
  return Object.keys(systemRolesPermissions).reduce((permissions, module) => {
    const modulePermissions = systemRolesPermissions[module];

    Object.keys(modulePermissions).forEach((action) => {
      const permittedRoles = modulePermissions[action];

      if (permittedRoles.includes(systemRole)) {
        permissions.push(action);
      }
    });

    return permissions;
  }, []);
}
