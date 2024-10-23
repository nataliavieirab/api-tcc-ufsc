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

// type systemRolesPermissions = {
//   [module: moduleIndex]: {
//     [action: Actions]: SystemRoles[];
//   };
// };

export const systemRolesPermissions: any = {
  admin: {
    createUser: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    findAllUsers: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    findAllOrganizations: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
    createOrganization: ['SYSTEM_ADMIN', 'SYSTEM_ASSISTANT'],
  },
  organization: {
    createUser: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
    findAllUsers: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
    createStore: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADMIN'],
  },
};
