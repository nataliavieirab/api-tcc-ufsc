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
  | 'createCompany'
  | 'updateCompany'
  | 'deleteCompany'
  | 'findAllCompanies'
  | 'findCompanyById';

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
  createCompany: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  updateCompany: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  deleteCompany: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findAllCompanies: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findCompanyById: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
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
  createCompany = 'createCompany',
  updateCompany = 'updateCompany',
  deleteCompany = 'deleteCompany',
  findAllCompanies = 'findAllCompanies',
  findCompanyById = 'findCompanyById',
}

export enum Modules {
  admin = 'admin',
  organizations = 'organizations',
  store = 'store',
  customer = 'customer',
}
