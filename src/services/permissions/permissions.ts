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
  | 'updateFranchise';

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
  deleteFranchise: ['ORGANIZATION_ADM', 'ORGANIZATION_ASSISTANT'],
};

const module_permissions = {
  organizations: ['ORGANIZATION_ASSISTANT', 'ORGANIZATION_ADM'],
  admin: ['GENERAL_ADM', 'GENERAL_ASSISTANT'],
  franchise: ['FRANCH_ADM', 'FRANCH_ASSISTANT'],
};

export { actions, roles, roles_permissions, module_permissions };
