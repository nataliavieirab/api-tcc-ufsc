import { IsNotEmpty, IsString, Length } from 'class-validator';
import { storeAdminPermissions } from 'src/services/permissions/permissions';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class CreateRoleBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The role name should not be empty.' })
  readonly name: string;

  @IsNotEmpty({ message: 'The role permissions should not be empty.' })
  @HasValidValue(storeAdminPermissions, {
    message: 'Invalid permissions.',
  })
  readonly permissions: string[];
}
