<template>
  <div class="app h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b px-4 py-2 flex items-center gap-2 shadow">
      <h3 class="text-lg font-semibold text-gray-700">📁 My File Explorer</h3>
    </header>

    <!-- Toolbar -->
    <nav
      class="bg-gray-100 border-b px-4 py-2 flex items-center gap-2 text-sm text-gray-600"
    >
      <button class="px-2 py-1 border rounded hover:bg-white" @click="goBack">
        ⬅ Back
      </button>
      <span class="text-gray-400" style="padding: 10px">|</span>
      <span class="truncate text-blue-600">{{ currentPath }}</span>
    </nav>

    <!-- Main Panel -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r overflow-y-auto p-3">
        <FolderTree :tree="folders" @select="selectFolder" />
      </aside>

      <!-- Content Panel -->
      <main class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <FolderList :folder="selectedFolder" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useFolderStore } from "@/stores/folder.store";
import { useFolder } from "@/composables/useFolder";
import FolderTree from "@/components/FolderTree.vue";
import FolderList from "@/components/FolderList.vue";
import type { FolderTree as FolderType } from "@/types/folder";

const folderStore = useFolderStore();
const folderUtil = await useFolder();

onMounted(() => {
  folderUtil.loadFolders();
});

const folders = computed(() => folderStore.folders);
const selectedFolder = computed(() => folderStore.selectedFolder);
const currentPath = computed(() =>
  folderStore.breadcrumbs.map((b) => b.name).join(" / ")
);

function selectFolder(folder: FolderType) {
  folderStore.setSelectedFolder(folder);
  folderUtil.loadSubfolders(folder.id);
}

function goBack() {
  folderStore.breadcrumbBack();
  const last = folderStore.selectedFolder;
  if (last) {
    folderUtil.loadSubfolders(last.id);
  }
}
</script>

<style scoped>
body {
  @apply font-sans text-sm;
}
</style>
