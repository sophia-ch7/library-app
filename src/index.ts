import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = document.getElementById("app");

if (app) {
  const title = document.createElement("h1");
  title.textContent = "Система Управління Бібліотекою";
  title.className = "text-center my-4";
  app.appendChild(title);
}
