import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsFutureConstraint implements ValidatorConstraintInterface {
  // Dates get stringified when sent over the wire, so we need to convert it back to a date
  // might need to be refined that date strings get converted to dates automatically before validation
  validate(value: string) {
    const dateFromValue = new Date(value);
    return dateFromValue.getTime() > Date.now();
  }

  defaultMessage() {
    return "Date must be in the future";
  }
}

export function IsFuture(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureConstraint
    });
  };
}
