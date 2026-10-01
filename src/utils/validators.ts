export namespace Validation {
  const YEAR_REGEX = /^(1[0-9]{3}|20[0-9]{2})$/;
  const DIGITS_REGEX = /^[0-9]+$/;

  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isDigitsOnly(value: string): boolean {
    return DIGITS_REGEX.test(value);
  }

  export function isYear(value: string): boolean {
    return YEAR_REGEX.test(value);
  }

  export function validateRequired(value: string): string | null {
    return isRequired(value) ? null : "Це поле є обов'язковим";
  }

  export function validateYear(value: string): string | null {
    if (!isRequired(value)) {
      return "Це поле є обов'язковим";
    }
    if (!isDigitsOnly(value)) {
      return "Рік має містити лише цифри";
    }
    if (!isYear(value)) {
      return "Введіть коректний рік";
    }
    return null;
  }

  export function validateUserId(value: string): string | null {
    if (!isRequired(value)) {
      return "Це поле є обов'язковим";
    }
    if (!isDigitsOnly(value)) {
      return "ID має містити лише цифри";
    }
    return null;
  }
}
