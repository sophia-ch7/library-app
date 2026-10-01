import { el } from "../dom";

export class Pagination {
  readonly element: HTMLElement;

  constructor(private onChange: (page: number) => void) {
    this.element = el("nav", "mt-3");
  }

  render(page: number, totalPages: number): void {
    this.element.replaceChildren();
    if (totalPages <= 1) {
      return;
    }

    const list = el("ul", "pagination pagination-sm mb-0");

    const addItem = (
      label: string,
      target: number,
      disabled = false,
      active = false,
    ): void => {
      const li = el(
        "li",
        `page-item${disabled ? " disabled" : ""}${active ? " active" : ""}`,
      );
      const button = el("button", "page-link", label);
      button.type = "button";
      button.addEventListener("click", () => this.onChange(target));
      li.appendChild(button);
      list.appendChild(li);
    };

    addItem("Назад", page - 1, page === 1);
    for (let i = 1; i <= totalPages; i++) {
      addItem(String(i), i, false, i === page);
    }
    addItem("Далі", page + 1, page === totalPages);

    this.element.appendChild(list);
  }
}
