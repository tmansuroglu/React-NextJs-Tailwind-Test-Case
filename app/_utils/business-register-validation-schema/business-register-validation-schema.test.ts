import { RegisterBusinessFormFields } from "@/types/enums";
import { businessRegisterValidationSchema } from "./business-register-validation-schema";

describe("businessRegisterValidationSchema", () => {
  const validData = {
    [RegisterBusinessFormFields.Name]: "JohnDoe",
    [RegisterBusinessFormFields.Company]: "AcmeCorp",
    [RegisterBusinessFormFields.MobilePhone]: "+447700900123",
    [RegisterBusinessFormFields.Email]: "test@example.com",
    [RegisterBusinessFormFields.PostCode]: "AB123CD",
    [RegisterBusinessFormFields.PayLater]: true,
    [RegisterBusinessFormFields.PayNow]: false,
  };

  it("validates successfully with valid data", () => {
    const result = businessRegisterValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("Name field", () => {
    it("fails if empty", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Name]: "",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Required");
    });

    it("fails if non-alphanumeric", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Name]: "John@Doe",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Must be alphanumeric");
    });

    it("fails if exceeds max length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Name]: "a".repeat(256),
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Name must not exceed 255 characters"
      );
    });
  });

  describe("Company field", () => {
    it("fails if empty", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Company]: "",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Required");
    });

    it("fails if exceeds max length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Company]: "a".repeat(256),
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Company must not exceed 255 characters"
      );
    });
  });

  describe("MobilePhone field", () => {
    it("fails if invalid format", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.MobilePhone]: "123456",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Mobile phone must be a valid UK number (e.g., +44 7700 900123)"
      );
    });

    it("fails if exceeds max length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.MobilePhone]: "+4477009001234",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Mobile phone must be a valid UK number (e.g., +44 7700 900123)"
      );
    });
  });

  describe("Email field", () => {
    it("fails if invalid email", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Email]: "invalid",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Invalid email address");
    });

    it("fails if below min length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Email]: "a",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Invalid email address");
    });

    it("fails if exceeds max length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Email]: "a".repeat(250) + "@example.com",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Email must not exceed 255 characters"
      );
    });

    it("fails if invalid format via regex", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.Email]: "test@invalid..com",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Invalid email address");
    });
  });

  describe("PostCode field", () => {
    it("fails if empty", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.PostCode]: "",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Required");
    });

    it("fails if non-alphanumeric", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.PostCode]: "AB12@3CD",
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe("Must be alphanumeric");
    });

    it("fails if exceeds max length", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.PostCode]: "a".repeat(31),
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Postcode must not exceed 30 characters"
      );
    });
  });

  describe("Payment options refinement", () => {
    it("fails if both PayLater and PayNow are false", () => {
      const invalidData = {
        ...validData,
        [RegisterBusinessFormFields.PayLater]: false,
        [RegisterBusinessFormFields.PayNow]: false,
      };
      const result = businessRegisterValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      const issues = result.error?.issues || [];
      expect(issues).toHaveLength(2);
      expect(issues[0].message).toBe(
        "At least one payment option (Pay Later or Pay Now) must be selected"
      );
      expect(issues[1].message).toBe(
        "At least one payment option (Pay Later or Pay Now) must be selected"
      );
    });

    it("passes if at least one payment option is true", () => {
      const data1 = {
        ...validData,
        [RegisterBusinessFormFields.PayLater]: true,
        [RegisterBusinessFormFields.PayNow]: false,
      };
      expect(businessRegisterValidationSchema.safeParse(data1).success).toBe(
        true
      );

      const data2 = {
        ...validData,
        [RegisterBusinessFormFields.PayLater]: false,
        [RegisterBusinessFormFields.PayNow]: true,
      };
      expect(businessRegisterValidationSchema.safeParse(data2).success).toBe(
        true
      );

      const data3 = {
        ...validData,
        [RegisterBusinessFormFields.PayLater]: true,
        [RegisterBusinessFormFields.PayNow]: true,
      };
      expect(businessRegisterValidationSchema.safeParse(data3).success).toBe(
        true
      );
    });
  });
});
