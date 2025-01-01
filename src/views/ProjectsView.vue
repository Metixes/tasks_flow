<template>
  <DataTable
    v-model:editingRows="editingRows"
    v-model:filters="filters"
    :value="store.state.projects.projects"
    resizableColumns
    showGridlines
    :paginator="true"
    :rows="10"
    :key="store.state.projects.projects.id"
    :globalFilterFields="['name', 'status']"
    @rowSelect="onRowSelect"
    editMode="row"
    columnResizeMode="fit"
    selectionMode="single"
    @row-edit-save="onRowEditSave">
    <template #header>
      <div class="projects-header">
        <Button
          icon="pi pi-plus"
          label="New Project"
          size="small"
          @click="showNewProjectDialog = true" />
        <InputText
          size="small"
          v-model="filters['global'].value"
          placeholder="Keyword Search" />
      </div>
    </template>
    <Column field="id" header="Id" sortable></Column>
    <Column field="name" header="Project Name" sortable icon="pi pi-user">
      <template #body="{ data }">
        <div class="projects-info">
          <span>{{ data.name }}</span>
          <IconInfo v-if="data.description" v-tooltip="data.description" />
        </div>
      </template>
    </Column>
    <Column field="tasks" header="Tasks" sortable></Column>
    <Column field="status" header="Status" sortable>
      <template #body="{ data }">
        {{ data.status }}
      </template>
      <template #editor="{ data }">
        <Select
          v-model="data.status"
          :options="statuses"
          :invalid="Boolean(errors.taskStatus)"
          placeholder="Select a status *"
          size="small"
          @click.stop />
      </template>
    </Column>
    <Column field="createdAt" header="Created At" sortable>
      <template #body="{ data }">
        {{ dayjs(data.createdAt).format("YYYY-MM-DD") }}
      </template>
    </Column>
    <Column :rowEditor="true"></Column>
    <template #empty> No projects found.</template>
  </DataTable>

  <Dialog
    v-model:visible="showNewProjectDialog"
    :style="{ width: '450px' }"
    header="New Project"
    :modal="true"
    @hide="closeModal">
    <form
      id="new-project-form"
      class="modal"
      @submit.prevent="onSubmitNewProject">
      <div class="input-group">
        <InputText
          v-model="name"
          :invalid="Boolean(errors.name)"
          id="name"
          name="name"
          placeholder="Project name *"
          fluid />
        <span v-if="errors.name" class="input-group-error">
          {{ errors.name }}
        </span>
      </div>

      <InputText
        fluid
        placeholder="Project description"
        v-model="description" />
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { FilterMatchMode } from "@primevue/core/api";
import { useForm, ErrorMessage, useField } from "vee-validate";
import { v4 as uuID } from "uuid";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { schemaProject } from "@/schemas/schemas";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import IconInfo from "@/assets/icons/IconInfo.vue";
import Tooltip from "primevue/tooltip";
import request from "@/services/axios";
import dayjs from "dayjs";
import type {
  Project,
  RowSelectEvent,
  RowEditSaveEvent,
} from "@/types/projects/types";

const router = useRouter();
const store = useStore();
const toast = useToast();

const showNewProjectDialog = ref(false);
const editingRows = ref([]);
const statuses = ["To do", "In Progress", "Done"];

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schemaProject,
});

const [name] = defineField("name");
const [description] = defineField("description");

const onSubmitNewProject = handleSubmit((project) => {
  const newProject: Project = {
    id: uuID(),
    createdAt: new Date().getTime(),
    name: project.name,
    description: project.description,
    tasks: 0,
    status: "To do",
  };

  store.dispatch("projects/addProject", newProject);

  showNewProjectDialog.value = false;
  resetForm();

  toast.add({
    severity: "success",
    summary: "Added successfully",
    detail: "Project added successfully",
    life: 2000,
  });
});

const onRowSelect = (event: RowSelectEvent) => {
  router.push(`/tasks/${event.data.id}`);
};

const onRowEditSave = async (event: RowEditSaveEvent) => {
  store.dispatch("projects/updateProject", event.newData);
};

const closeModal = () => {
  showNewProjectDialog.value = false;
  resetForm();
};

onMounted(() => {
  store.dispatch("projects/getProjects");
});
</script>

<style lang="scss" scoped></style>
