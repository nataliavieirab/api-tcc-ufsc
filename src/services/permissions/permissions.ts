type roles = {
  GENERAL_ADM: 'GENERAL_ADM';
  GENERAL_ASSISTANT: 'GENERAL_ASSISTANT';
  ORGANIZATION_ADM: 'ORGANIZATION_ADM';
  ORGANIZATION_ASSISTANT: 'ORGANIZATION_ASSISTANT';
  BRANCH_ADM: 'BRANCH_ADM';
};

type actions =
  | 'createUser'
  | 'updateUser'
  | 'deleteUser'
  | 'findUserById'
  | 'findAllUsers'
  | 'createOrganization'
  | 'updateOrganization'
  | 'findAllOrganizations'
  | 'findOrganizationById'
  | 'deleteOrganization'
  | 'createStore'
  | 'updateStore'
  | 'deleteStore'
  | 'findAllStore'
  | 'findStoreById';

export { actions, roles, systemRolesPermissions };

export enum Permissions {
  createUser = 'createUser',
  updateUser = 'updateUser',
  deleteUser = 'deleteUser',
  findUserById = 'findUserById',
  findAllUsers = 'findAllUsers',
  createOrganization = 'createOrganization',
  updateOrganization = 'updateOrganization',
  findAllOrganizations = 'findAllOrganizations',
  findOrganizationById = 'findOrganizationById',
  deleteOrganization = 'deleteOrganization',
  createStore = 'createStore',
  updateStore = 'updateStore',
  deleteStore = 'deleteStore',
  findAllStore = 'findAllStore',
  findStoreById = 'findStoreById',
}

export enum Modules {
  admin = 'admin',
  organizations = 'organizations',
  store = 'store',
  customer = 'customer',
}

const systemRolesPermissions: any = {
  admin: {
    createUser: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  },
};
