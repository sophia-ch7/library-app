import { User } from "../../models/User";
import { el } from "../dom";

export class UserList {
  readonly element: HTMLElement;
  private list: HTMLElement;

  constructor(private onRemove: (user: User) => void) {
    this.element = el("div", "card shadow-sm mb-3");
    const body = el("div", "card-body");
    const heading = el("h4", "mb-3", "Список Користувачів");
    this.list = el("ul", "list-group list-group-flush");
    body.append(heading, this.list);
    this.element.appendChild(body);
  }

  render(users: User[]): void {
    this.list.replaceChildren();

    users.forEach((user) => {
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
