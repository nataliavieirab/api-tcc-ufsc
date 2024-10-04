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
  createBranch: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  updateBranch: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  deleteBranch: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findAllBranches: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
  findBranchById: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
};

const module_permissions = {
  organizations: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADM'],
  admin: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
};

export { actions, roles, roles_permissions, module_permissions };