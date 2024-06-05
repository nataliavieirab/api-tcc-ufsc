// module-permitted-roles.validator.ts
import {
  //   ValidatorConstraint,
  //   ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { UserRole } from '.prisma/client';
import { registerDecorator } from 'class-validator';

export function IsArrayWithValidValues(
  values: any[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isArrayValidRoles',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [values],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const valuess = args.constraints[0];
          return value.every((role: UserRole) => valuess.includes(role));
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid roles. Valid roles are: ${args.constraints[0].join(
            ', ',
          )}.`;
        },
      },
    });
  };
}
