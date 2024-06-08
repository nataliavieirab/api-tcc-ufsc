type roles = {
  GENERAL_ADM: 'GENERAL_ADM';
  ORGANIZATION_ADM: 'ORGANIZATION_ADM';
  FRANCH_ADM: 'FRANCH_ADM';
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
  | 'deleteFranchise';

const roles_permissions = {
  createUser: ['GENERAL_ADM', 'ORGANIZATION_ADM', 'FRANCH_ADM'],
  updateUser: ['GENERAL_ADM'],
  deleteUser: ['GENERAL_ADM'],
  findUserById: ['GENERAL_ADM'],
  findAllUsers: ['GENERAL_ADM'],
  createFranchise: ['GENERAL_ADM'],
  deleteFranchise: ['MANAGER'],
};

const module_permissions = {
  organizations: ['GENERAL_ADM', 'ORGANIZATION_ADM'],
};

export { actions, roles, roles_permissions, module_permissions };
