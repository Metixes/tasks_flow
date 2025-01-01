<template>
  <div>
    <div class="tasks-header">
      <h2>Tasks</h2>
      <div class="tasks-header-options">
        <InputText
          size="small"
          v-model="searchValue"
          placeholder="Keyword Search" />
        <Button
          icon="pi pi-plus"
          size="small"
          aria-label="Create"
          @click="showDddTaskModal = true" />
      </div>
    </div>

    <Select
      v-model="sortedValue"
      :options="sortedBy"
      placeholder="Sorted by"
      size="small"
      @change="sortedTasks" />

    <div class="kanban">
      <VueResizable
        class="kanban-column"
        v-for="title of columns"
        :key="title"
        :minWidth="500"
        :active="['rb']">
        <div class="kanban-column-header">
          <h3>{{ title }}</h3>
        </div>
        <VueDraggableNext
          class="kanban-column-area"
          :list="
            store.state.tasks.tasks.filter((task : Task) => task.status === title)
          "
          :key="store.state.tasks.tasks.id"
          group="tasks"
          :sort="true"
          @change="(event) => dragTask(event, title)">
          <TaskCard
            v-for="task of store.state.tasks.tasks.filter(
              (task : Task) => task.status === title
            )"
            :key="task.id"
            :task="task"
            :title="title"
            @editTask="onEditTask"
            @deleteTask="onDeleteTask" />
        </VueDraggableNext>
        <IconResize class="kanban-resize-icon" />
      </VueResizable>
    </div>

    <Dialog
      v-model:visible="showDddTaskModal"
      :style="{ width: '450px' }"
      header="Add New Task"
      @hide="closeModal"
      :modal="true">
      <form id="new-project-form" class="modal" @submit.prevent="onSaveTask">
        <div class="input-group">
          <InputText
            placeholder="Task Name *"
            class="input"
            id="name"
            name="name"
            v-model="name"
            :invalid="Boolean(errors.name)"
            fluid />
          <span v-if="errors.name" class="input-group-error">
            {{ errors.name }}
          </span>
        </div>
        <div class="input-group">
          <Select
            id="assignee"
            name="assignee"
            v-model="assignee"
            :options="assigneeList"
            :invalid="Boolean(errors.assignee)"
            placeholder="To assign... *"
            size="small"
            fluid />
          <span v-if="errors.assignee" class="input-group-error">
            {{ errors.assignee }}
          </span>
        </div>
        <div class="input-group">
          <Select
            v-model="status"
            :options="columns"
            :invalid="Boolean(errors.status)"
            placeholder="Select a status *"
            size="small"
            fluid />
          <span v-if="errors.status" class="input-group-error">
            {{ errors.status }}
          </span>
        </div>
        <div class="input-group">
          <DatePicker
            v-model="expiryAt"
            :minDate="new Date()"
            :manualInput="false"
            :invalid="Boolean(errors.expiryAt)"
            fluid
            dateFormat="yy-mm-dd"
            placeholder="Select a date *" />
          <span v-if="errors.expiryAt" class="input-group-error">
            {{ errors.expiryAt }}
          </span>
        </div>
      </form>

      <template #footer>
        <Button
          form="new-project-form"
          label="Submit"
          type="submit"
          icon="pi pi-check"
          autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { Task, DraggableEvent } from "@/types/tasks/types";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { VueDraggableNext } from "vue-draggable-next";
import { useRoute } from "vue-router";
import { useForm, ErrorMessage, useField } from "vee-validate";
import { useToast } from "primevue/usetoast";
import { v4 as uuID } from "uuid";
import { schemaTask } from "@/schemas/schemas";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import TaskCard from "@/components/TaskCard.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import IconResize from "@/assets/icons/IconResize.vue";
import request from "@/services/axios";

const store = useStore();
const route = useRoute();
const toast = useToast();
const PROJECT_ID: string | string[] = route.params.id as string;

const tasksCopy = ref<Task[]>(store.state.tasks.tasks);
const showDddTaskModal = ref(false);
const isTaskEditing = ref(false);
const editedTaskId = ref("");
const searchValue = ref("");
const sortedValue = ref("");
const assigneeList = ["John Doe", "Dy Loch"];
const columns = ["To do", "In Progress", "Done"];
const sortedBy = ["date-asc", "date-desc"];

const { defineField, handleSubmit, resetForm, errors, setValues, values } =
  useForm({
    validationSchema: schemaTask,
  });

const [name] = defineField("name");
const [assignee] = defineField("assignee");
const [status] = defineField("status");
const [expiryAt] = defineField("expiryAt");

const onSaveTask = handleSubmit((task) => {
  if (isTaskEditing.value) {
    store.dispatch("tasks/updateTask", {
      task,
      id: editedTaskId.value,
    });

    toast.add({
      severity: "success",
      summary: "Edited successfully",
      detail: "Task edited successfully",
      life: 2000,
    });
  } else {
    const newTask: Task = {
      id: uuID(),
      project_id: PROJECT_ID,
      name: task.name,
      assignee: task.assignee,
      status: task.status,
      expiryAt: task.expiryAt,
    };

    store.dispatch("tasks/addTask", { task: newTask, projectId: PROJECT_ID });
    tasksCopy.value = store.state.tasks.tasks;

    toast.add({
      severity: "success",
      summary: "Added successfully",
      detail: "Task added successfully",
      life: 2000,
    });

    newTask.id = "";
    newTask.project_id = "";
    newTask.name = "";
    newTask.assignee = "";
    newTask.status = "" as "To do" | "In Progress" | "Done";
    newTask.expiryAt = "";
  }
  closeModal();
});

const onEditTask = async (task: Task) => {
  isTaskEditing.value = true;
  showDddTaskModal.value = true;
  editedTaskId.value = task.id;

  setValues({
    name: task.name,
    assignee: task.assignee,
    status: task.status,
    expiryAt: task.expiryAt,
  });
};

const onDeleteTask = (id: string) => {
  store.dispatch("tasks/deleteTask", { id, projectId: PROJECT_ID });

  toast.add({
    severity: "success",
    summary: "Deleted successfully",
    detail: "Task deleted successfully",
    life: 2000,
  });
};

const closeModal = () => {
  showDddTaskModal.value = false;
  isTaskEditing.value = false;
  editedTaskId.value = "";
  resetForm();
};

const dragTask = (event: DraggableEvent, title: string) => {
  if (event.moved) {
    const { oldIndex, newIndex } = event.moved;

    if (oldIndex !== newIndex) {
      const movedItem = store.state.tasks.tasks.splice(oldIndex, 1)[0];
      store.state.tasks.tasks.splice(newIndex, 0, movedItem);
    }
  }

  if (event.added) {
    event.added.element.status = title as "To do" | "In Progress" | "Done";
    store.dispatch("tasks/updateTask", { task: event.added.element });
  }
};

const sortedTasks = () => {
  store.dispatch("tasks/sortTasks", sortedValue.value);
};

const searchByKeyword = () => {
  const filteredTasks = tasksCopy.value.filter(
    (task: Task) =>
      task.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchValue.value.toLowerCase())
  );
  store.commit("tasks/setTasks", filteredTasks);
};

watch(searchValue, (newValue, oldValue) => {
  if (newValue.trim()) {
    searchByKeyword();
  } else if (newValue.trim() !== oldValue.trim()) {
    store.commit("tasks/setTasks", tasksCopy.value);
  }
});

onMounted(async () => {
  await store.dispatch("tasks/getTasks", PROJECT_ID);
  tasksCopy.value = store.state.tasks.tasks;
});
</script>

<style scoped lang="scss">
.draggable-item {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: grab;
  color: white !important;
}

.drag-ghost {
  opacity: 0.6;
}
</style>
