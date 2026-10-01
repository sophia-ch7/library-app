import { Book } from "../models/Book";
import { User } from "../models/User";
import { IBook } from "../models/interfaces/IBook";
import { IUser } from "../models/interfaces/IUser";
import { Library } from "./Library";
import { Storage } from "./Storage";

const BOOKS_KEY = "books";
const USERS_KEY = "users";

export type BorrowResult =
  | { status: "success"; book: Book; user: User }
  | { status: "limit"; book: Book; user: User }
  | { status: "book-not-found" }
  | { status: "user-not-found" }
  | { status: "already-borrowed"; book: Book };

export class LibraryApp {
  readonly books = new Library<Book>();
  readonly users = new Library<User>();
  private storage = new Storage();

  constructor() {
    this.load();
  }

  private load(): void {
    const rawBooks = this.storage.load<IBook[]>(BOOKS_KEY) ?? [];
    const rawUsers = this.storage.load<IUser[]>(USERS_KEY) ?? [];

    rawBooks.forEach((b) =>
      this.books.add(
        new Book(b.id, b.title, b.author, b.year, b.isBorrowed, b.borrowedBy),
      ),
    );
    rawUsers.forEach((u) =>
      this.users.add(new User(u.id, u.name, u.email, u.borrowedBooks)),
    );
  }

  private save(): void {
    this.storage.save(BOOKS_KEY, this.books.getAll());
    this.storage.save(USERS_KEY, this.users.getAll());
  }

  addBook(book: Book): void {
    this.books.add(book);
    this.save();
  }

  addUser(user: User): void {
    this.users.add(user);
    this.save();
  }

  borrowBook(bookId: string, userId: string): BorrowResult {
    const book = this.books.findById(bookId);
    if (!book) {
      return { status: "book-not-found" };
    }
    const user = this.users.findById(userId);
    if (!user) {
      return { status: "user-not-found" };
    }
    if (book.isBorrowed) {
      return { status: "already-borrowed", book };
    }
    if (!user.canBorrowMore()) {
      return { status: "limit", book, user };
    }

    book.borrow(user.id);
    user.addBook(book.id);
    this.save();
    return { status: "success", book, user };
  }

  returnBook(bookId: string): Book | undefined {
    const book = this.books.findById(bookId);
    if (!book || !book.isBorrowed) {
      return undefined;
    }
    if (book.borrowedBy) {
      this.users.findById(book.borrowedBy)?.removeBook(book.id);
    }
    book.return();
    this.save();
    return book;
  }

  removeBook(bookId: string): void {
    this.returnBook(bookId);
    this.books.remove(bookId);
    this.save();
  }

  removeUser(userId: string): void {
    const user = this.users.findById(userId);
    if (user) {
      user.borrowedBooks.forEach((id) => this.returnBook(id));
    }
    this.users.remove(userId);
    this.save();
  }
}
