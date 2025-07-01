<template>
  <div>
    <div v-if="folder" class="space-y-4">
      <h2 class="text-xl font-semibold">📁 {{ folder.name }}</h2>

      <div>
        <h3 class="text-gray-700 font-medium mb-1">Subfolders</h3>
        <div
          v-if="subfolders.length"
          class="grid grid-cols-2 md:grid-cols-4 gap-2"
        >
          <div
            v-for="sub in subfolders"
            :key="sub.id"
            class="bg-white border p-2 rounded hover:bg-gray-100"
          >
            📁 {{ sub.name }}
          </div>
        </div>
        <p v-else class="text-gray-400">No subfolders</p>
      </div>

      <div>
        <h3 class="text-gray-700 font-medium mb-1">Files</h3>
        <div v-if="files.length" class="grid grid-cols-1 gap-1">
          <div
            v-for="file in files"
            :key="file.id"
            class="bg-white border p-2 rounded hover:bg-gray-100"
          >
            📄 {{ file.name }}
            <span class="text-xs text-gray-500">({{ file.size }} bytes)</span>
          </div>
        </div>
        <p v-else class="text-gray-400">No files</p>
      </div>
    </div>

    <div v-else class="text-gray-400">No folder selected</div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import type { FolderTree } from "@/types/folder";
import { useFolderStore } from "@/stores/folder.store";
import { useFileStore } from "@/stores/file.store";
import { useFolder } from "@/composables/useFolder";
import { useFile } from "@/composables/useFile";

const props = defineProps<{ folder: FolderTree | null }>();

const folderStore = useFolderStore();
const fileStore = useFileStore();

const subfolders = computed(() => folderStore.folders);
const files = computed(() => fileStore.files);

watch(
  () => props.folder,
  async (folder) => {
    if (folder) {
      const folderUtil = await useFolder();
      const fileUtil = await useFile();
      await folderUtil.loadSubfolders(folder.id);
      await fileUtil.loadFiles(folder.id);
    }
  },
  { immediate: true }
);
</script>
