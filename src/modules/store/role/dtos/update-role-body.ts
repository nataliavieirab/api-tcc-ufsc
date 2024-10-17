import { IsString, Length } from 'class-validator';
import { Permissions } from 'src/services/permissions/permissions';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedPermissions: Permissions[] = [
  Permissions.createUser,
  Permissions.updateUser,
  Permissions.deleteUser,
  Permissions.findUserById,
  Permissions.findAllUsers,
  Permissions.createOrganization,
  Permissions.updateOrganization,
  Permissions.findAllOrganizations,
  Permissions.findOrganizationById,
  Permissions.deleteOrganization,
  Permissions.createCompany,
  Permissions.updateCompany,
  Permissions.deleteCompany,
  Permissions.findAllCompanies,
  Permissions.findCompanyById,
];

export class UpdateRoleBody {
  @IsString()
  @Length(2, 30)
  readonly name: string;

  @HasValidValue(modulePermittedPermissions, {
    message: 'Invalid permissions.',
  })
  readonly permissions: string[];
}
