import { createStore } from "vuex";
import projects from "./modules/projects.ts";
import tasks from "./modules/tasks.ts";

export default createStore({
  modules: {
    projects,
    tasks,
  },
  state: () => ({}),

  mutations: {},

  getters: {},
  actions: {},
});
