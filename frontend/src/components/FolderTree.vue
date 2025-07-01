<template>
  <ul>
    <li v-for="folder in tree" :key="folder.id" class="pl-2">
      <div
        @click="select(folder)"
        class="cursor-pointer flex items-center gap-2 hover:bg-blue-50 p-1 rounded"
      >
        📁 <span class="text-gray-800">{{ folder.name }}</span>
      </div>
      <FolderTree
        v-if="folder.children && folder.children.length"
        :tree="folder.children"
        @select="select"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FolderTree } from "@/types/folder";

// const props = defineProps<{ tree: FolderTree[] }>();
defineProps<{ tree: FolderTree[] }>();

const emit = defineEmits<{
  (e: "select", folder: FolderTree): void;
}>();

const openIds = ref<number[]>([]);

function toggle(id: number) {
  if (openIds.value.includes(id)) {
    openIds.value = openIds.value.filter((x) => x !== id);
  } else {
    openIds.value.push(id);
  }
}

function isOpen(id: number) {
  return openIds.value.includes(id);
}

function select(folder: FolderTree) {
  emit("select", folder);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
