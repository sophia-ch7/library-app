import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { Book } from "./models/Book";
import { LibraryApp } from "./services/LibraryApp";
import { BookForm } from "./ui/components/BookForm";
import { el } from "./ui/dom";
import { generateId } from "./utils/idGenerator";
import { User } from "./models/User";
import { UserForm } from "./ui/components/UserForm";

const root = document.getElementById("app");

if (root) {
  const app = new LibraryApp();

  const container = el("div", "container py-4");
  const title = el("h1", "text-center mb-4", "Система Управління Бібліотекою");

  const bookForm = new BookForm((data) => {
    app.addBook(new Book(generateId(), data.title, data.author, data.year));
    console.log(app.books.getAll());
  });

  const userForm = new UserForm((data) => {
    app.addUser(new User(generateId(), data.name, data.email));
    console.log(app.users.getAll());
  });

  container.append(title, bookForm.element, userForm.element);
  root.appendChild(container);
}
