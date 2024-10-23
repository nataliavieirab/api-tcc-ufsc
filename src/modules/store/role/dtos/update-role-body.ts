import { IsOptional, IsString, Length } from 'class-validator';
import { storeAdminPermissions } from 'src/services/permissions/permissions';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class UpdateRoleBody {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  readonly name: string;

  @IsOptional()
  @HasValidValue(storeAdminPermissions, {
    message: 'Invalid permissions.',
  })
  readonly permissions: string[];
}
