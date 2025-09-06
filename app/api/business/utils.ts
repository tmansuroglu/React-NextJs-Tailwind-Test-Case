import path from "path";
import { promises as fs } from "fs";
import { Business } from "../../types/payload";

const businessesFilePath = path.join(process.cwd(), "businesses.json");

export const writeBusinesses = async (businesses: Business[]) => {
  try {
    await fs.writeFile(
      businessesFilePath,
      JSON.stringify(businesses, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log("business write error", error);
    throw new Error("Failed to write into the file");
  }
};

export const readBusinesses = async () => {
  try {
    const fileContent = await fs.readFile(businessesFilePath, "utf-8");

    return (JSON.parse(fileContent) as Business[]) || [];
  } catch (error) {
    console.log("business read error", error);
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      await writeBusinesses([]);

      return [];
    }

    throw new Error("Failed to read the file");
  }
};
