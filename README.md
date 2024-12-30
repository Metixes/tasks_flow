# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Install json-server

```sh
npm install -g json-server
```

### Compile and Hot-Reload for Development

```sh
npm run start
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Used libraries and frameworks

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [Axios](https://github.com/axios/axios)
- [Vuex](https://next.vuex.vuejs.org/)
- [Vue-Resizable](https://www.npmjs.com/package/vue-resizable)
- [Vue-Draggable-Next](https://www.npmjs.com/package/vue-draggable-next)
- [UUID](https://www.npmjs.com/package/uuid)
- [Dayjs](https://www.npmjs.com/package/dayjs)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [vee-validate](https://www.npmjs.com/package/vee-validate)
- [yup](https://www.npmjs.com/package/yup)
- [json-server](https://www.npmjs.com/package/json-server)

## Architecture

1. **public/**:

   - Contains static files that will not be processed by the build system. For example, `index.html` is the main entry point for the Vue application.

2. **src/**:

   - This is the main source folder where all the application code resides.

   - **assets/**: Contains static assets like images, fonts, or any other media files.

   - **components/**: Contains reusable Vue components, like buttons, headers, footers, and any other UI elements that are used in multiple parts of the application.

   - **router/**: Contains the routing configuration, typically with `Vue Router`, to define paths and associated components.

   - **views/**: Contains the main page components or views, each representing a different page in the application.

   - **App.vue**: The root component of the application, where the overall layout of the app is structured.

   - **main.ts**: The main entry point of the application where Vue is initialized, and the root component (`App.vue`) is mounted. If using TypeScript, this file will have a `.ts` extension.

   - **store/**: Contains the Vuex store, which manages the state of the application.

   - **services/**: Contains the service layer, which handles the communication with the server.

   - **types/**: Contains the TypeScript interfaces for the application.

   - **schemas/**: Contains the validation schemas for the application.

3. **package.json**:

   - This file contains metadata about the project, such as its name, version, and author. It also lists dependencies and scripts for running and building the project.

4. **vite.config.js**:

   - Configuration file for **Vite**, where you can customize build options, set up aliases, and configure plugins.

5. **tsconfig.json** (if applicable):

   - Configuration file for **TypeScript**, containing settings that control the compilation of TypeScript files.

6. **.env.example**:

   - Rename the Template: To create your own environment file, rename .env.example to .env

## Description

- Tasks Flow is a Single Page Application (SPA) designed to manage "Projects and Tasks." It leverages modern web technologies like Vue.js 3, TypeScript, Vuex, and Axios to create a highly interactive and stateful user experience. The application includes complex UI elements and state management features to streamline project and task workflows.

## Features

**General Application Features**

      - Projects Table: View projects in a sortable and filterable table with resizable columns.

      - Project Details Page: Interactive task table with drag-and-drop functionality for task ordering and status updates.

      - Task Form: Create and edit tasks with field validation.

      - Persistent State: Retain application state across reloads using LocalStorage.

**Technical Highlights**

      - Frontend Framework: Vue.js 3 (Composition API).

      - State Management: Vuex.

      - HTTP Requests: Axios with mock API or JSON Server.

      - Styling: SCSS for modular and maintainable styles.

      - Drag-and-Drop: Implemented using VueDraggable or equivalent.

**Data Tables: Enhanced with:**

      - Sorting by columns.

      - Filtering options.

      - Resizable columns.

      - Functionality

      - Projects Table

**Columns:**

      - Project ID

      - Project Name

      - Number of Tasks

      - Status

      - Creation Date

**Features:**

      - Resizable columns via drag-and-drop.

**Add Project:**

      - Opens a modal form to create a new project with fields for Name (required) and Description.

      - Saves new projects to the list.

**Navigation:**

      - Click a project row to navigate to the Project Details page.

      - Project Details Page (Task List)

**Columns:**

      - Task ID

      - Task Name

      - Assignee

      - Status

      - Due Date

**Features:**

      - Reorder tasks using drag-and-drop.

      - Change task status by dragging tasks between sections (e.g., "To Do," "In Progress," "Done").

      - Resizable columns.

**Add Task:**

      - Opens a modal form to create a new task with fields for:

      - Task Name

      - Assignee (dropdown)

      - Status

      - Due Date

      - Validates all fields.

      - API and State Management
