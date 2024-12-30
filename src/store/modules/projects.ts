import request from "@/services/axios";
import type { Project } from "@/types/types";

export const projects = {
  namespaced: true,
  state: () => ({
    projects: [],
  }),

  mutations: {
    setProjects: (state, project: Project[]) => {
      state.projects = project;
    },
  },

  actions: {
    async getProjects({ commit }): Promise<void> {
      try {
        const response = await request.get("/projects");
        commit("setProjects", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async addProject({ commit, state }, project: Project): Promise<void> {
      try {
        const {data} = await request.post(`/projects`, project);

        commit("setProjects", [
          ...state.projects,
          data,
        ]);
      } catch (error) {
        console.log(error);
      }
    },

    async updateProject({ commit, state }, project: Project): Promise<void> {
      try {
        const {data} = await request.patch(`/projects/${project.id}`, project);
        
        const idx = state.projects.findIndex(
          (p : Project) => p.id === project.id
        );

        const updatedProjects = [...state.projects];

        updatedProjects[idx] = {
          ...updatedProjects[idx],
          ...data,
        };

        commit("setProjects", updatedProjects);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
