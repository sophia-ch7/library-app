import { Modal } from 'bootstrap';

export class NotificationService {
  show(message: string, buttonText = 'Зрозуміло!'): void {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.tabIndex = -1;

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog modal-dialog-centered';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const body = document.createElement('div');
    body.className = 'modal-body fs-5';
    body.textContent = message;

    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.textContent = buttonText;
    button.setAttribute('data-bs-dismiss', 'modal');

    footer.appendChild(button);
    content.append(body, footer);
    dialog.appendChild(content);
    modalElement.appendChild(dialog);
    document.body.appendChild(modalElement);

    const modal = new Modal(modalElement);

    modalElement.addEventListener('hidden.bs.modal', () => {
      modal.dispose();
      modalElement.remove();
    });

    modal.show();
  }

  prompt(title: string, placeholder = 'ID'): Promise<string | null> {
    return new Promise((resolve) => {
      const modalElement = document.createElement('div');
      modalElement.className = 'modal fade';
      modalElement.tabIndex = -1;

      const dialog = document.createElement('div');
      dialog.className = 'modal-dialog modal-dialog-centered';

      const content = document.createElement('div');
      content.className = 'modal-content';

      const header = document.createElement('div');
      header.className = 'modal-header';
      const heading = document.createElement('h5');
      heading.className = 'modal-title';
      heading.textContent = title;
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'btn-close';
      closeButton.setAttribute('data-bs-dismiss', 'modal');
      header.append(heading, closeButton);

      const body = document.createElement('div');
      body.className = 'modal-body';
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.placeholder = placeholder;
      body.appendChild(input);

      const footer = document.createElement('div');
      footer.className = 'modal-footer';
      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.className = 'btn btn-secondary';
      cancelButton.textContent = 'Скасувати';
      cancelButton.setAttribute('data-bs-dismiss', 'modal');
      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.className = 'btn btn-primary';
      saveButton.textContent = 'Зберегти';
      footer.append(cancelButton, saveButton);

      content.append(header, body, footer);
      dialog.appendChild(content);
      modalElement.appendChild(dialog);
      document.body.appendChild(modalElement);

      const modal = new Modal(modalElement);
      let result: string | null = null;

      saveButton.addEventListener('click', () => {
        result = input.value.trim();
        modal.hide();
      });

      modalElement.addEventListener('hidden.bs.modal', () => {
        modal.dispose();
        modalElement.remove();
        resolve(result);
      });

      modal.show();
    });
  }
}
