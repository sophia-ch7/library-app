import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { Book } from "./models/Book";
import { LibraryApp } from "./services/LibraryApp";
import { BookForm } from "./ui/components/BookForm";
import { el } from "./ui/dom";
import { generateId } from "./utils/idGenerator";

const root = document.getElementById("app");

if (root) {
  const app = new LibraryApp();

  const container = el("div", "container py-4");
  const title = el("h1", "text-center mb-4", "Система Управління Бібліотекою");

  const bookForm = new BookForm((data) => {
    app.addBook(new Book(generateId(), data.title, data.author, data.year));
    console.log(app.books.getAll());
  });

  container.append(title, bookForm.element);
  root.appendChild(container);
}
