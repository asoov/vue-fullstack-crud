import { ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class IsFutureConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(): string;
}
export declare function IsFuture(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
