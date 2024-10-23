import { IsString, Length } from 'class-validator';
import { Actions } from 'src/services/permissions/permissions';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedPermissions: Actions[] = [
  Actions.createUser,
  Actions.updateUser,
  Actions.deleteUser,
  Actions.findUsers,
  Actions.createOrganization,
  Actions.updateOrganization,
  Actions.findOrganizations,
  Actions.deleteOrganization,
  Actions.createStore,
  Actions.updateStore,
  Actions.deleteStore,
  Actions.findStores,
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
