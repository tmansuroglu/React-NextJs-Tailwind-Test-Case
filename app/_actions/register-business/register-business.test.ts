import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readBusinesses, writeBusinesses } from "../utils";
import businessRegisterValidationSchema from "@/utils/business-register-validation-schema";
import { Routes } from "@/types/enums";
import { RegisterBusinessRequestPayload } from "@/types/payload";
import { registerBusiness } from "./register-business";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(() => {
    throw new Error("REDIRECT");
  }),
  RedirectType: { push: "push" },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("../utils", () => ({
  readBusinesses: jest.fn(),
  writeBusinesses: jest.fn(),
}));

jest.mock("@/utils/business-register-validation-schema", () => ({
  __esModule: true,
  default: { parse: jest.fn() },
}));

const mockUUID = "mock-uuid-1234";

describe("registerBusiness", () => {
  const mockExistingBusinesses: any[] = [
    { id: "existing-1", company: "Existing Co" },
  ];

  const validPayload: RegisterBusinessRequestPayload = {
    name: "Test Name",
    company: "Test Company",
    mobile_phone: "+1234567890",
    email_address: "test@example.com",
    postcode: "12345",
    pay_later: true,
    pay_now: false,
  };

  const invalidPayload = { ...validPayload, email_address: "invalid" };

  beforeAll(() => {
    Object.defineProperty(global, "crypto", {
      value: {
        randomUUID: jest.fn().mockReturnValue(mockUUID),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    (readBusinesses as jest.Mock).mockResolvedValue(mockExistingBusinesses);
    (writeBusinesses as jest.Mock).mockResolvedValue(undefined);
    (businessRegisterValidationSchema.parse as jest.Mock).mockReturnValue(
      validPayload
    );
    (revalidatePath as jest.Mock).mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("successfully registers a business with valid payload", async () => {
    await expect(registerBusiness(validPayload)).rejects.toThrow("REDIRECT");

    expect(businessRegisterValidationSchema.parse).toHaveBeenCalledWith(
      validPayload
    );
    expect(readBusinesses).toHaveBeenCalledTimes(1);
    expect(global.crypto.randomUUID).toHaveBeenCalledTimes(1);
    expect(writeBusinesses).toHaveBeenCalledWith([
      { ...validPayload, id: mockUUID },
      ...mockExistingBusinesses,
    ]);
    expect(revalidatePath).toHaveBeenCalledWith(Routes.BusinessList);
    expect(redirect).toHaveBeenCalledWith(
      Routes.BusinessList,
      RedirectType.push
    );
  });

  it("returns error response on validation failure", async () => {
    (businessRegisterValidationSchema.parse as jest.Mock).mockImplementation(
      () => {
        throw new Error("Validation failed");
      }
    );

    const result = await registerBusiness(invalidPayload);

    expect(result).toEqual({
      success: false,
      message: "Failed to register the business",
    });
    expect(readBusinesses).not.toHaveBeenCalled();
    expect(writeBusinesses).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("returns error response on readBusinesses failure", async () => {
    (readBusinesses as jest.Mock).mockRejectedValue(new Error("Read failed"));

    const result = await registerBusiness(validPayload);

    expect(result).toEqual({
      success: false,
      message: "Failed to register the business",
    });
    expect(writeBusinesses).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("returns error response on writeBusinesses failure", async () => {
    (writeBusinesses as jest.Mock).mockRejectedValue(new Error("Write failed"));

    const result = await registerBusiness(validPayload);

    expect(result).toEqual({
      success: false,
      message: "Failed to register the business",
    });
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("prepends new business to existing list", async () => {
    await expect(registerBusiness(validPayload)).rejects.toThrow("REDIRECT");

    expect(writeBusinesses).toHaveBeenCalledWith([
      expect.objectContaining({ ...validPayload, id: mockUUID }),
      ...mockExistingBusinesses,
    ]);
  });
});
