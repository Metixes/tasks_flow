<template>
  <div class="task-card">
    <div class="task-card-header">
      <span>{{ task.status }}</span>
      <div class="task-card-actions">
        <Button
          icon="pi pi-pencil"
          size="small"
          aria-label="Edit"
          @click="emit('editTask', task)" />
        <Button
          icon="pi pi-times"
          size="small"
          aria-label="Edit"
          @click="emit('deleteTask', task.id)" />
      </div>
    </div>
    <h6 class="task-card-title">
      {{ task.name }}
    </h6>
    <div class="task-card-footer">
      <p class="task-card-footer-desc">{{ task.assignee }}</p>
      <span class="task-card-footer-date">{{
        dayjs(task.expiryAt).format("YYYY-MM-DD")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import dayjs from "dayjs";
import type { Task } from "@/types/types";

const emit = defineEmits(["deleteTask", "editTask"]);

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss"></style>
