import { config } from "../config";
import type { FolderTree } from "@/types/folder";
import axios from "axios";

const API_VERSION = config.api.version || "v1";
const API_URL =
  config.api.url + `/${API_VERSION}` ||
  `http://localhost:3000/api/${API_VERSION}`;
const API_KEY = config.api.key || "DanielsDeveloper";

interface FolderResponse {
  [key: string]: FolderTree[] | boolean | string;
}

export async function fetchAllFolders(): Promise<FolderResponse> {
  try {
    const res = await axios.get(`${API_URL}/folders`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const data = res.data;
    const dynamicKey = Object.keys(data).find((key) =>
      Array.isArray(data[key])
    );
    return {
      [dynamicKey || "folders"]: data[dynamicKey || "folders"] || [],
      success: true,
      message: data.message || "Success",
    } as FolderResponse;
  } catch (err) {
    console.error("Error fetching all folders:", err);
    return {
      folders: [],
      success: false,
      message: "Error fetching folders",
    };
  }
}

export async function fetchSubfolders(id: number): Promise<FolderResponse> {
  try {
    const res = await axios.get(`${API_URL}/folders/${id}/subfolders`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const data = res.data;
    const dynamicKey = Object.keys(data).find((key) =>
      Array.isArray(data[key])
    );
    return {
      [dynamicKey || "folders"]: data[dynamicKey || "folders"] || [],
      success: true,
      message: data.message || "Success",
    } as FolderResponse;
  } catch (err) {
    console.error(`Error fetching subfolders for folder ${id}:`, err);
    return {
      folders: [],
      success: false,
      message: "Error fetching subfolders",
    };
  }
}
