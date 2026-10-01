import { User } from "../../models/User";
import { paginate } from "../../utils/paginate";
import { el } from "../dom";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 5;

export class UserList {
  readonly element: HTMLElement;
  private list: HTMLElement;
  private pagination: Pagination;
  private users: User[] = [];
  private page = 1;

  constructor(private onRemove: (user: User) => void) {
    this.element = el("div", "card shadow-sm mb-3");
    const body = el("div", "card-body");
    const heading = el("h4", "mb-3", "Список Користувачів");
    this.list = el("ul", "list-group list-group-flush");
    this.pagination = new Pagination((page) => {
      this.page = page;
      this.draw();
    });
    body.append(heading, this.list, this.pagination.element);
    this.element.appendChild(body);
  }

  render(users: User[]): void {
    this.users = users;
    this.draw();
  }

  private draw(): void {
    const result = paginate(this.users, this.page, PAGE_SIZE);
    this.page = result.page;
    this.pagination.render(result.page, result.totalPages);

    this.list.replaceChildren();

    result.items.forEach((user) => {
      const item = el(
        "li",
        "list-group-item d-flex justify-content-between align-items-center px-0",
      );
      item.appendChild(
        el("span", "", `${user.id} ${user.name} (${user.email})`),
      );

      const removeButton = el(
        "button",
        "btn btn-outline-danger btn-sm",
        "Видалити",
      );
      removeButton.type = "button";
      removeButton.addEventListener("click", () => this.onRemove(user));

      item.appendChild(removeButton);
      this.list.appendChild(item);
    });
  }
}
