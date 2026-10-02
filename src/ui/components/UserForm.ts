import { Validation } from '../../utils/validators';
import { el } from '../dom';
import { FormField } from './FormField';

export interface UserFormData {
  name: string;
  email: string;
}

export class UserForm {
  readonly element: HTMLElement;
  private name = new FormField("Ім'я", Validation.validateRequired);
  private email = new FormField('Email', Validation.validateEmail);

  constructor(private onSubmit: (data: UserFormData) => void) {
    this.element = el('div', 'card shadow-sm mb-3');
    const body = el('div', 'card-body');
    const heading = el('h4', 'mb-3', 'Додати Користувача');
    const button = el('button', 'btn btn-success btn-sm', 'Додати Користувача');
    button.type = 'button';
    button.addEventListener('click', () => this.submit());

    body.append(heading, this.name.element, this.email.element, button);
    this.element.appendChild(body);
  }

  private submit(): void {
    const results = [this.name.check(), this.email.check()];
    if (results.includes(false)) {
      return;
    }
    this.onSubmit({ name: this.name.value, email: this.email.value });
    this.name.clear();
    this.email.clear();
  }
}
