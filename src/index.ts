import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { Book } from "./models/Book";
import { User } from "./models/User";
import { LibraryApp } from "./services/LibraryApp";
import { NotificationService } from "./services/NotificationService";
import { BookForm } from "./ui/components/BookForm";
import { BookList } from "./ui/components/BookList";
import { UserForm } from "./ui/components/UserForm";
import { UserList } from "./ui/components/UserList";
import { el } from "./ui/dom";
import { Validation } from "./utils/validators";
import { generateId } from "./utils/idGenerator";

const root = document.getElementById("app");

if (root) {
  const app = new LibraryApp();
  const notifications = new NotificationService();

  const refresh = (): void => {
    bookList.render(app.books.getAll());
    userList.render(app.users.getAll());
  };

  const bookForm = new BookForm((data) => {
    app.addBook(new Book(generateId(), data.title, data.author, data.year));
    refresh();
  });

  const userForm = new UserForm((data) => {
    app.addUser(new User(generateId(), data.name, data.email));
    refresh();
  });

  const bookList = new BookList({
    onBorrow: async (book) => {
      const userId = await notifications.prompt(
        "Введіть ID користувача для позичення книги:",
      );
      if (userId === null) {
        return;
      }
      const error = Validation.validateUserId(userId);
      if (error) {
        notifications.show(error);
        return;
      }

      const result = app.borrowBook(book.id, userId);
      switch (result.status) {
        case "success":
          notifications.show(
            `${result.book.title} by ${result.book.author} (${result.book.year}) has been borrowed by ${result.user.id} ${result.user.name} (${result.user.email}).`,
          );
          break;
        case "limit":
          notifications.show(
            `Користувач ${result.user.name} уже позичив 3 книги. Більше позичити не можна.`,
          );
          break;
        case "user-not-found":
          notifications.show("Користувача з таким ID не знайдено.");
          break;
        case "already-borrowed":
          notifications.show("Ця книга вже позичена.");
          break;
        default:
          notifications.show("Книгу не знайдено.");
      }
      refresh();
    },
    onReturn: (book) => {
      const returned = app.returnBook(book.id);
      if (returned) {
        notifications.show(
          `${returned.title} by ${returned.author} (${returned.year}) has been returned.`,
          "Закрити",
        );
      }
      refresh();
    },
    onRemove: (book) => {
      app.removeBook(book.id);
      refresh();
    },
  });

  const userList = new UserList((user) => {
    app.removeUser(user.id);
    refresh();
  });

  const container = el("div", "container py-4");
  const title = el("h1", "text-center mb-4", "Система Управління Бібліотекою");

  container.append(
    title,
    bookForm.element,
    userForm.element,
    bookList.element,
    userList.element,
  );
  root.appendChild(container);

  refresh();
}
