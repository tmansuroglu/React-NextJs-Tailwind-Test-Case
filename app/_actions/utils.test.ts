import { promises as fs } from "fs";
import path from "path";
import { Business } from "@/types/payload";
import { readBusinesses, writeBusinesses } from "./utils";

const mockPath = "/mock/cwd/businesses.json";

jest.mock("path", () => ({
  join: jest.fn().mockReturnValue("/mock/cwd/businesses.json"),
}));

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

const mockCwd = "/mock/cwd";
jest.spyOn(process, "cwd").mockReturnValue(mockCwd);

describe("File Utilities", () => {
  const mockBusinesses: Business[] = [
    {
      id: "1",
      name: "Test Name",
      company: "Test Company",
      mobile_phone: "+1234567890",
      email_address: "test@example.com",
      postcode: "12345",
      pay_later: true,
      pay_now: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("writeBusinesses", () => {
    it("writes businesses to file successfully", async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await writeBusinesses(mockBusinesses);

      expect(fs.writeFile).toHaveBeenCalledWith(
        mockPath,
        JSON.stringify(mockBusinesses, null, 2),
        "utf-8"
      );
    });

    it("throws error on write failure", async () => {
      const mockError = new Error("Write failed");
      (fs.writeFile as jest.Mock).mockRejectedValue(mockError);

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      await expect(writeBusinesses(mockBusinesses)).rejects.toThrow(
        "Failed to write into the file"
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "business write error",
        mockError
      );

      consoleLogSpy.mockRestore();
    });
  });

  describe("readBusinesses", () => {
    it("reads and parses businesses successfully", async () => {
      const mockContent = JSON.stringify(mockBusinesses);
      (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

      const result = await readBusinesses();

      expect(fs.readFile).toHaveBeenCalledWith(mockPath, "utf-8");
      expect(result).toEqual(mockBusinesses);
    });

    it("returns empty array if file not found and creates file", async () => {
      const mockError = new Error("File not found");
      (mockError as any).code = "ENOENT";
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      const result = await readBusinesses();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "business read error",
        mockError
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockPath,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      expect(result).toEqual([]);

      consoleLogSpy.mockRestore();
    });

    it("throws error on other read failures", async () => {
      const mockError = new Error("Read failed");
      (mockError as any).code = "OTHER";
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      await expect(readBusinesses()).rejects.toThrow("Failed to read the file");
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "business read error",
        mockError
      );
      expect(fs.writeFile).not.toHaveBeenCalled();

      consoleLogSpy.mockRestore();
    });

    it("handles empty file content by throwing error", async () => {
      (fs.readFile as jest.Mock).mockResolvedValue("");

      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      await expect(readBusinesses()).rejects.toThrow("Failed to read the file");
      expect(consoleLogSpy).toHaveBeenCalledTimes(1); // Logs the SyntaxError

      consoleLogSpy.mockRestore();
    });
  });
});
