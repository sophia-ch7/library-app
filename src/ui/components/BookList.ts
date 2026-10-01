import { Book } from "../../models/Book";
import { el } from "../dom";

export interface BookListHandlers {
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
  onRemove: (book: Book) => void;
}

export class BookList {
  readonly element: HTMLElement;
  private list: HTMLElement;

  constructor(private handlers: BookListHandlers) {
    this.element = el("div", "card shadow-sm mb-3");
    const body = el("div", "card-body");
    const heading = el("h4", "mb-3", "Список Книг");
    this.list = el("ul", "list-group list-group-flush");
    body.append(heading, this.list);
    this.element.appendChild(body);
  }

  render(books: Book[]): void {
    this.list.replaceChildren();

    books.forEach((book) => {
      const item = el(
        "li",
        "list-group-item d-flex justify-content-between align-items-center px-0",
      );
      item.appendChild(
        el("span", "", `${book.title} by ${book.author} (${book.year})`),
      );

      const actions = el("div", "d-flex gap-2");

      const mainButton = book.isBorrowed
        ? el("button", "btn btn-warning btn-sm", "Повернути")
        : el("button", "btn btn-primary btn-sm", "Позичити");
      mainButton.type = "button";
      mainButton.addEventListener("click", () => {
        if (book.isBorrowed) {
          this.handlers.onReturn(book);
        } else {
          this.handlers.onBorrow(book);
        }
      });

      const removeButton = el(
        "button",
        "btn btn-outline-danger btn-sm",
        "Видалити",
      );
      removeButton.type = "button";
      removeButton.addEventListener("click", () =>
        this.handlers.onRemove(book),
      );

      actions.append(mainButton, removeButton);
      item.appendChild(actions);
      this.list.appendChild(item);
    });
  }
}
