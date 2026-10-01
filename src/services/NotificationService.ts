import { Modal } from "bootstrap";

export class NotificationService {
  show(message: string, buttonText = "Зрозуміло!"): void {
    const modalElement = document.createElement("div");
    modalElement.className = "modal fade";
    modalElement.tabIndex = -1;

    const dialog = document.createElement("div");
    dialog.className = "modal-dialog modal-dialog-centered";

    const content = document.createElement("div");
    content.className = "modal-content";

    const body = document.createElement("div");
    body.className = "modal-body fs-5";
    body.textContent = message;

    const footer = document.createElement("div");
    footer.className = "modal-footer";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.textContent = buttonText;
    button.setAttribute("data-bs-dismiss", "modal");

    footer.appendChild(button);
    content.append(body, footer);
    dialog.appendChild(content);
    modalElement.appendChild(dialog);
    document.body.appendChild(modalElement);

    const modal = new Modal(modalElement);

    modalElement.addEventListener("hidden.bs.modal", () => {
      modal.dispose();
      modalElement.remove();
    });

    modal.show();
  }
}
