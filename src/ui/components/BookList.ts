import { Book } from '../../models/Book';
import { paginate } from '../../utils/paginate';
import { el } from '../dom';
import { Pagination } from './Pagination';

export interface BookListHandlers {
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
  onRemove: (book: Book) => void;
}

const PAGE_SIZE = 5;

export class BookList {
  readonly element: HTMLElement;
  private list: HTMLElement;
  private searchInput: HTMLInputElement;
  private pagination: Pagination;
  private books: Book[] = [];
  private page = 1;

  constructor(private handlers: BookListHandlers) {
    this.element = el('div', 'card shadow-sm mb-3');
    const body = el('div', 'card-body');
    const heading = el('h4', 'mb-3', 'Список Книг');

    this.searchInput = el('input', 'form-control mb-3');
    this.searchInput.placeholder = 'Пошук за автором або назвою';
    this.searchInput.addEventListener('input', () => {
      this.page = 1;
      this.draw();
    });

    this.list = el('ul', 'list-group list-group-flush');
    this.pagination = new Pagination((page) => {
      this.page = page;
      this.draw();
    });

    body.append(heading, this.searchInput, this.list, this.pagination.element);
    this.element.appendChild(body);
  }

  render(books: Book[]): void {
    this.books = books;
    this.draw();
  }

  private draw(): void {
    const query = this.searchInput.value.trim().toLowerCase();
    const filtered = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query),
    );
    const result = paginate(filtered, this.page, PAGE_SIZE);
    this.page = result.page;
    this.pagination.render(result.page, result.totalPages);

    this.list.replaceChildren();

    result.items.forEach((book) => {
      const item = el(
        'li',
        'list-group-item d-flex justify-content-between align-items-center px-0',
      );
      item.appendChild(
        el('span', '', `${book.title} by ${book.author} (${book.year})`),
      );

      const actions = el('div', 'd-flex gap-2');

      const mainButton = book.isBorrowed
        ? el('button', 'btn btn-warning btn-sm', 'Повернути')
        : el('button', 'btn btn-primary btn-sm', 'Позичити');
      mainButton.type = 'button';
      mainButton.addEventListener('click', () => {
        if (book.isBorrowed) {
          this.handlers.onReturn(book);
        } else {
          this.handlers.onBorrow(book);
        }
      });

      const removeButton = el(
        'button',
        'btn btn-outline-danger btn-sm',
        'Видалити',
      );
      removeButton.type = 'button';
      removeButton.addEventListener('click', () =>
        this.handlers.onRemove(book),
      );

      actions.append(mainButton, removeButton);
      item.appendChild(actions);
      this.list.appendChild(item);
    });
  }
}
