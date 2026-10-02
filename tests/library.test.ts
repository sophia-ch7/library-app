import { expect } from "chai";
import { Library } from "../src/services/Library";
import { Book } from "../src/models/Book";
import { User } from "../src/models/User";

describe("Library", () => {
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>();
  });

  describe("add", () => {
    it("додає книгу в колекцію", () => {
      library.add(new Book("1", "Clean Code", "Robert Martin", 2008));
      expect(library.getAll()).to.have.lengthOf(1);
    });

    it("зберігає додані об’єкти в порядку додавання", () => {
      library.add(new Book("1", "A", "X", 2000));
      library.add(new Book("2", "B", "Y", 2001));
      expect(library.getAll().map((b) => b.id)).to.deep.equal(["1", "2"]);
    });
  });

  describe("remove", () => {
    it("видаляє книгу за id і повертає true", () => {
      library.add(new Book("1", "A", "X", 2000));
      expect(library.remove("1")).to.equal(true);
      expect(library.getAll()).to.have.lengthOf(0);
    });

    it("повертає false, якщо id не існує", () => {
      library.add(new Book("1", "A", "X", 2000));
      expect(library.remove("999")).to.equal(false);
      expect(library.getAll()).to.have.lengthOf(1);
    });
  });

  describe("findById", () => {
    it("знаходить книгу за id", () => {
      library.add(new Book("1", "Code Complete", "McConnell", 2004));
      expect(library.findById("1")?.title).to.equal("Code Complete");
    });

    it("повертає undefined, якщо не знайдено", () => {
      expect(library.findById("1")).to.equal(undefined);
    });
  });

  describe("find", () => {
    it("шукає за довільною умовою", () => {
      library.add(new Book("1", "A", "Martin", 2008));
      library.add(new Book("2", "B", "Hunt", 1999));
      const result = library.find((b) => b.author === "Martin");
      expect(result).to.have.lengthOf(1);
      expect(result[0].id).to.equal("1");
    });
  });

  describe("generic", () => {
    it("працює і з користувачами", () => {
      const users = new Library<User>();
      users.add(new User("10", "Артем", "a@b.com"));
      expect(users.findById("10")?.name).to.equal("Артем");
    });
  });
});
