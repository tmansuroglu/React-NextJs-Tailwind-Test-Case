import { RegisterBusinessFormFields } from "@/types/enums";
import registerBusiness from "@/actions/register-business";
import {
  DEFAULT_VALUES,
  useEventHandlers,
  useFormProps,
} from "./RegisterBusinessForm.utils";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/actions/register-business", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useFormProps", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useFormProps());

    expect(result.current.getValues()).toEqual(DEFAULT_VALUES);
    expect(result.current.formState.isDirty).toBe(false);
  });

  it("should validate required fields on blur", async () => {
    const { result } = renderHook(() => useFormProps());

    const isValid = await act(async () => result.current.trigger());
    expect(isValid).toBe(false);
  });
});

describe("useEventHandlers", () => {
  let setValueMock: jest.Mock;
  let triggerMock: jest.Mock;

  beforeEach(() => {
    setValueMock = jest.fn();
    triggerMock = jest.fn();
    (registerBusiness as jest.Mock).mockClear();
  });

  describe("handlePayLaterChange", () => {
    it("sets PayLater true and triggers PayNow", async () => {
      triggerMock.mockResolvedValue(true);
      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      await act(async () =>
        result.current.handlePayLaterChange({
          target: { checked: true },
        } as any)
      );

      expect(setValueMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayLater,
        true,
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
      expect(triggerMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayNow
      );
    });

    it("sets PayLater false and triggers PayNow", async () => {
      triggerMock.mockResolvedValue(true);
      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      await act(async () =>
        result.current.handlePayLaterChange({
          target: { checked: false },
        } as any)
      );

      expect(setValueMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayLater,
        false,
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
      expect(triggerMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayNow
      );
    });
  });

  describe("handlePayNowChange", () => {
    it("sets PayNow true and triggers PayLater", async () => {
      triggerMock.mockResolvedValue(true);
      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      await act(async () =>
        result.current.handlePayNowChange({ target: { checked: true } } as any)
      );

      expect(setValueMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayNow,
        true,
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
      expect(triggerMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayLater
      );
    });

    it("sets PayNow false and triggers PayLater", async () => {
      triggerMock.mockResolvedValue(true);
      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      await act(async () =>
        result.current.handlePayNowChange({
          target: { checked: false },
        } as any)
      );

      expect(setValueMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayNow,
        false,
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
      expect(triggerMock).toHaveBeenCalledWith(
        RegisterBusinessFormFields.PayLater
      );
    });
  });

  describe("handleOnSubmit", () => {
    it("calls registerBusiness with correctly formatted payload", async () => {
      const formData = new FormData();
      formData.append(RegisterBusinessFormFields.Name, "John Doe");
      formData.append(RegisterBusinessFormFields.Company, "Acme Ltd");
      formData.append(
        RegisterBusinessFormFields.MobilePhone,
        "+44 7700 900 123"
      );
      formData.append(RegisterBusinessFormFields.Email, "john@example.com");
      formData.append(RegisterBusinessFormFields.PostCode, "SW1A1AA");
      formData.append(RegisterBusinessFormFields.PayLater, "true");

      triggerMock.mockResolvedValue(true);
      (registerBusiness as jest.Mock).mockResolvedValue({
        success: true,
        message: "ok",
      });

      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      const response = await act(async () =>
        result.current.handleOnSubmit({}, formData)
      );

      expect(triggerMock).toHaveBeenCalled();
      expect(registerBusiness).toHaveBeenCalledWith({
        name: "John Doe",
        company: "Acme Ltd",
        mobile_phone: "+447700900123", // spaces removed
        email_address: "john@example.com",
        postcode: "SW1A1AA",
        pay_later: true,
        pay_now: false,
      });

      expect(response).toEqual({ success: true, message: "ok" });
    });

    it("returns error when trigger fails", async () => {
      const formData = new FormData();
      triggerMock.mockResolvedValue(false);

      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      const response = await act(async () =>
        result.current.handleOnSubmit({}, formData)
      );

      expect(response).toEqual({
        success: false,
        message: "Failed to validate the form fields.",
      });
      expect(registerBusiness).not.toHaveBeenCalled();
    });

    it("handles both PayLater and PayNow checked correctly", async () => {
      const formData = new FormData();
      formData.append(RegisterBusinessFormFields.PayLater, "true");
      formData.append(RegisterBusinessFormFields.PayNow, "true");

      triggerMock.mockResolvedValue(true);
      (registerBusiness as jest.Mock).mockResolvedValue({
        success: true,
        message: "ok",
      });

      const { result } = renderHook(() =>
        useEventHandlers({ setValue: setValueMock, trigger: triggerMock })
      );

      const response = await act(async () =>
        result.current.handleOnSubmit({}, formData)
      );

      expect(registerBusiness).toHaveBeenCalledWith(
        expect.objectContaining({ pay_later: true, pay_now: true })
      );
      expect(response.success).toBe(true);
    });
  });
});
