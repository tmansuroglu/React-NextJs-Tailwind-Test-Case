import { emailRegex, mobilePhoneRegex, alphaNumericRegex } from "./regex"; // Adjust the import path as needed

describe("Regex Patterns", () => {
  describe("emailRegex", () => {
    const validEmails = [
      "test@example.com",
      "user.name+tag@example.co.uk",
      "user_name@example-domain.com",
      "a@b.cd",
    ];

    const invalidEmails = [
      "",
      "test@",
      "@example.com",
      "test@ example.com",
      "test@example.com ",
      "test@example.com.",
      "test@.com",
    ];

    validEmails.forEach((email) => {
      it(`validates valid email: ${email}`, () => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    invalidEmails.forEach((email) => {
      it(`invalidates invalid email: ${email || "empty string"}`, () => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe("mobilePhoneRegex", () => {
    const validPhones = ["+447123456789", "+447000000000", "+447999999999"];

    const invalidPhones = [
      "",
      "447123456789",
      "+44712345678",
      "+4471234567890",
      "+44123456789",
      "+447abc456789",
      "+44712345678a",
      "+ 447123456789",
      "+447123456789 ",
    ];

    validPhones.forEach((phone) => {
      it(`validates valid UK mobile: ${phone}`, () => {
        expect(mobilePhoneRegex.test(phone)).toBe(true);
      });
    });

    invalidPhones.forEach((phone) => {
      it(`invalidates invalid UK mobile: ${phone || "empty string"}`, () => {
        expect(mobilePhoneRegex.test(phone)).toBe(false);
      });
    });
  });

  describe("alphaNumericRegex", () => {
    const validStrings = ["abc123", "ABCDEF", "123456", "a1b2c3", "A", "1"];

    const invalidStrings = [
      "",
      "abc@123",
      "abc 123",
      "abc-123",
      "abc_123",
      "abc.123",
      "abc/123",
    ];

    validStrings.forEach((str) => {
      it(`validates valid alphanumeric: ${str}`, () => {
        expect(alphaNumericRegex.test(str)).toBe(true);
      });
    });

    invalidStrings.forEach((str) => {
      it(`invalidates invalid alphanumeric: ${str || "empty string"}`, () => {
        expect(alphaNumericRegex.test(str)).toBe(false);
      });
    });
  });
});
