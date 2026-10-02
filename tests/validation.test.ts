import { expect } from "chai";
import { Validation } from "../src/utils/validators";

describe("Validation", () => {
  describe("isRequired", () => {
    it("false для порожнього рядка", () => {
      expect(Validation.isRequired("")).to.equal(false);
    });

    it("false для рядка з самих пробілів", () => {
      expect(Validation.isRequired("   ")).to.equal(false);
    });

    it("true для заповненого рядка", () => {
      expect(Validation.isRequired("Книга")).to.equal(true);
    });
  });

  describe("isYear", () => {
    it("приймає коректні роки", () => {
      ["1999", "2004", "2026", "1000"].forEach((year) => {
        expect(Validation.isYear(year), year).to.equal(true);
      });
    });

    it("відхиляє некоректні значення", () => {
      ["abc", "12", "20045", "3000", "", "19a9"].forEach((year) => {
        expect(Validation.isYear(year), year).to.equal(false);
      });
    });
  });

  describe("validateYear", () => {
    it("повертає null для коректного року", () => {
      expect(Validation.validateYear("2004")).to.equal(null);
    });

    it("вимагає заповнення", () => {
      expect(Validation.validateYear("")).to.equal("Це поле є обов'язковим");
    });

    it("вимагає лише цифри", () => {
      expect(Validation.validateYear("abc")).to.equal(
        "Рік має містити лише цифри",
      );
    });

    it("відхиляє число, що не схоже на рік", () => {
      expect(Validation.validateYear("12")).to.equal("Введіть коректний рік");
    });
  });

  describe("validateUserId", () => {
    it("приймає лише цифри", () => {
      expect(Validation.validateUserId("1725533394038")).to.equal(null);
    });

    it("відхиляє літери", () => {
      expect(Validation.validateUserId("12ab")).to.equal(
        "ID має містити лише цифри",
      );
    });

    it("вимагає заповнення", () => {
      expect(Validation.validateUserId("")).to.equal("Це поле є обов'язковим");
    });
  });

  describe("validateRequired", () => {
    it("повертає помилку для порожнього значення", () => {
      expect(Validation.validateRequired("")).to.equal(
        "Це поле є обов'язковим",
      );
    });

    it("повертає null для заповненого", () => {
      expect(Validation.validateRequired("x")).to.equal(null);
    });
  });

  describe("validateEmail", () => {
    it("приймає коректну пошту", () => {
      expect(Validation.validateEmail("a@b.com")).to.equal(null);
    });

    it("відхиляє некоректну пошту", () => {
      expect(Validation.validateEmail("abc")).to.equal(
        "Введіть коректний email",
      );
    });
  });
});
