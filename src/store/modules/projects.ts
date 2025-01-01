import request from "@/services/axios";
import type { Project, ProjectState, Mutations, Actions } from "@/types/projects/types";
import type { Module, MutationTree, ActionTree } from "vuex";

const state : ProjectState = {
  projects: [],
};

const mutations : MutationTree<ProjectState> = {
  setProjects : (state, projects) => {
    state.projects = projects;
  },
}

const actions : ActionTree<ProjectState, any> = {
  async getProjects({ commit }) {
    try {
      const {data} = await request.get("/projects");
      commit("setProjects", data);
    } catch (error) {
      console.log(error);
    }
  },

  async addProject({ commit, state }, project : Project) {
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

  async updateProject({ commit, state }, project : Project) {
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
}

const projects  = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default projects;
