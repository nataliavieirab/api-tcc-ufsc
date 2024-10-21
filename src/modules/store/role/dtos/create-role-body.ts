import { IsNotEmpty, IsString, Length } from 'class-validator';
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
  Permissions.createStore,
  Permissions.updateStore,
  Permissions.deleteStore,
  Permissions.findAllStore,
  Permissions.findStoreById,
];

export class CreateRoleBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The role name should not be empty.' })
  readonly name: string;

  @IsNotEmpty({ message: 'The role permissions should not be empty.' })
  @HasValidValue(modulePermittedPermissions, {
    message: 'Invalid permissions.',
  })
  readonly permissions: string[];
}
