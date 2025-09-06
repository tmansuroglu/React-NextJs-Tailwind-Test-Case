import { Business } from "../../../types/payload";
import path from "path";
import { promises as fs } from "fs";

const businessesFilePath = path.join(__dirname, "businesses.json");

export const writeBusinesses = async (businesses: Business[]) => {
  try {
    await fs.writeFile(businessesFilePath, JSON.stringify(businesses, null, 2));
  } catch {
    throw new Error("Failed to write into the file");
  }
};

export const readBusinesses = async () => {
  try {
    const fileContent = await fs.readFile(businessesFilePath, "utf-8");

    return (JSON.parse(fileContent) as Business[]) || [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      await writeBusinesses([]);

      return [];
    }

    throw new Error("Failed to read the file");
  }
};
