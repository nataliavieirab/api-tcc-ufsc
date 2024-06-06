// module-permitted-roles.validator.ts
import {
  //   ValidatorConstraint,
  //   ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsArrayWithValidValues(
  values: any[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isArrayValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [values],
      options: validationOptions,
      validator: {
        validate(inputedValues: any, args: ValidationArguments) {
          const permittedValues = args.constraints[0];
          return inputedValues.every((value: string) =>
            permittedValues.includes(value),
          );
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
