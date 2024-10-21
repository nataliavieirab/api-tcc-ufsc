// module-permitted-roles.validator.ts
import {
  //   ValidatorConstraint,
  //   ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { registerDecorator } from 'class-validator';

export function HasValidValue(
  values: any[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'HasValidValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [values],
      options: validationOptions,
      validator: {
        validate(inputedValue: any, args: ValidationArguments) {
          const permittedValues = args.constraints[0];

          if (inputedValue instanceof Array) {
            return inputedValue.every((value) =>
              permittedValues.includes(value),
            );
          }

          return permittedValues.includes(inputedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid value. Valid values are: ${args.constraints[0].join(
            ', ',
          )}.`;
        },
      },
    });
  };
}
