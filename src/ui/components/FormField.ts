import { el } from '../dom';

export class FormField {
  readonly element: HTMLElement;
  private input: HTMLInputElement;
  private error: HTMLElement;

  constructor(
    placeholder: string,
    private validate: (value: string) => string | null,
  ) {
    this.element = el('div', 'mb-2');
    this.input = el('input', 'form-control');
    this.input.placeholder = placeholder;
    this.error = el('div', 'text-danger small');
    this.element.append(this.input, this.error);
  }

  get value(): string {
    return this.input.value.trim();
  }

  check(): boolean {
    const message = this.validate(this.value);
    this.error.textContent = message ?? '';
    return message === null;
  }

  clear(): void {
    this.input.value = '';
    this.error.textContent = '';
  }
}
