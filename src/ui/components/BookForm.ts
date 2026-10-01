import { Validation } from "../../utils/validators";
import { el } from "../dom";
import { FormField } from "./FormField";

export interface BookFormData {
  title: string;
  author: string;
  year: number;
}

export class BookForm {
  readonly element: HTMLElement;
  private title = new FormField("Назва книги", Validation.validateRequired);
  private author = new FormField("Автор", Validation.validateRequired);
  private year = new FormField("Рік видання", Validation.validateYear);

  constructor(private onSubmit: (data: BookFormData) => void) {
    this.element = el("div", "card shadow-sm mb-3");
    const body = el("div", "card-body");
    const heading = el("h4", "mb-3", "Додати Книгу");
    const button = el("button", "btn btn-success btn-sm", "Додати Книгу");
    button.type = "button";
    button.addEventListener("click", () => this.submit());

    body.append(
      heading,
      this.title.element,
      this.author.element,
      this.year.element,
      button,
    );
    this.element.appendChild(body);
  }

  private submit(): void {
    const results = [
      this.title.check(),
      this.author.check(),
      this.year.check(),
    ];
    if (results.includes(false)) {
      return;
    }
    this.onSubmit({
      title: this.title.value,
      author: this.author.value,
      year: Number(this.year.value),
    });
    this.title.clear();
    this.author.clear();
    this.year.clear();
  }
}
