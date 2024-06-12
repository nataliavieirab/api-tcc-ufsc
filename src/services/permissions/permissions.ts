type roles = {
  GENERAL_ADM: 'GENERAL_ADM';
  GENERAL_ASSISTANT: 'GENERAL_ASSISTANT';
  ORGANIZATION_ADM: 'ORGANIZATION_ADM';
  ORGANIZATION_ASSISTANT: 'ORGANIZATION_ASSISTANT';
  FRANCH_ADM: 'FRANCH_ADM';
  FRANCH_ASSISTANT: 'FRANCH_ASSISTANT';
  BRANCH_ADM: 'BRANCH_ADM';
  WAITER: 'WAITER';
  MANAGER: 'MANAGER';
  RECEPTIONIST: 'RECEPTIONIST';
  CASHIER: 'CASHIER';
  DELIVERY_ATTENDANT: 'DELIVERY_ATTENDANT';
};

type actions =
  | 'createUser'
  | 'updateUser'
  | 'deleteUser'
  | 'findUserById'
  | 'findAllUsers'
  | 'createFranchise'
  | 'deleteFranchise'
  | 'findAllFranchises'
  | 'findFranchiseById'
  | 'updateFranchise'
  | 'createOrganization'
  | 'updateOrganization'
  | 'findAllOrganizations'
  | 'findOrganizationById'
  | 'deleteOrganization'
  | 'createBranch'
  | 'updateBranch'
  | 'deleteBranch'
  | 'findAllBranches'
  | 'findBranchById';

const roles_permissions = {
  createUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
    'FRANCH_ADM',
    'FRANCH_ASSISTANT',
  ],
  updateUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
    'FRANCH_ADM',
    'FRANCH_ASSISTANT',
  ],
  deleteUser: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
    'FRANCH_ADM',
    'FRANCH_ASSISTANT',
  ],
  findUserById: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
    'FRANCH_ADM',
    'FRANCH_ASSISTANT',
  ],
  findAllUsers: [
    'GENERAL_ADM',
    'GENERAL_ASSISTANT',
    'ORGANIZATION_ADM',
    'ORGANIZATION_ASSISTANT',
    'FRANCH_ADM',
    'FRANCH_ASSISTANT',
  ],
  createFranchise: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  updateFranchise: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  deleteFranchise: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findFranchiseById: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findAllFranchises: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  createOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  updateOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  deleteOrganization: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  findOrganizationById: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  findAllOrganizations: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  createBranch: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
  updateBranch: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
  deleteBranch: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
  findAllBranches: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
  findBranchById: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
};

const module_permissions = {
  organizations: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADM'],
  admin: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  franchises: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
};

export { actions, roles, roles_permissions, module_permissions };
