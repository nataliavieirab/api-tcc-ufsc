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

const roles_permissions = {
  createUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
  ],
  updateUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
  ],
  deleteUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
  ],
  findUserById: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
  ],
  findAllUsers: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
  ],
  createOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  updateOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  deleteOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  findOrganizationById: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  findAllOrganizations: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  createStore: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  updateStore: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  deleteStore: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findAllStore: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findStoreById: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
};

const module_permissions = {
  organizations: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADM'],
  admin: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
};

export { actions, roles, roles_permissions, module_permissions };

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
