import { config } from "../config";
import type { File } from "@/types/file";
import axios from "axios";

const API_VERSION = config.api.version || "v1";
const API_URL =
  config.api.url + `/${API_VERSION}` ||
  `http://localhost:3000/api/${API_VERSION}`;
const API_KEY = config.api.key || "DanielsDeveloper";

interface FileResponse {
  [key: string]: File[] | boolean | string;
}

export async function fetchFilesByFolder(
  folderId: number
): Promise<FileResponse> {
  try {
    const res = await axios.get(`${API_URL}/files/folder/${folderId}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const data = res.data;
    const dynamicKey = Object.keys(data).find((key) =>
      Array.isArray(data[key])
    );

    return {
      [dynamicKey || "files"]: data[dynamicKey || "files"] || [],
      success: true,
      message: data.message || "Success",
    } as FileResponse;
  } catch (err: any) {
    console.error(`Error fetching files for folder ${folderId}:`, err);
    return {
      files: [],
      success: false,
      message: err?.response?.data?.message || "Error fetching files",
    };
  }
}
