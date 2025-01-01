import request from "@/services/axios";
import type { Task, TaskState } from "@/types/tasks/types";
import type { MutationTree, ActionTree } from "vuex";

const state : TaskState = {
  tasks: [],
};

const mutations: MutationTree<TaskState> = {
  setTasks(state, tasks: Task[]) {
    state.tasks = tasks;
  },
};

const actions : ActionTree<TaskState, any> = {
  async getTasks({ commit }, id: string){
    try {
      const {data} = await request.get(`/tasks?project_id=${id}`);

      commit("setTasks", data);
    } catch (error) {
      console.log(error);
    }
  },

  async addTask(
    { commit, state, dispatch },
    {task, projectId} : {task: Task, projectId: string}
  ){
    try {
      const {data} = await request.post("/tasks", task );
      
      commit("setTasks", [
        ...state.tasks,
        data,
      ]);

      dispatch("updateProjectTasks", projectId);
    } catch (error) {

      console.log(error);
    }
  },

  async updateTask(
    { commit, state }, 
    {task, id } : {task: Task, id: string}
  ){
    try {
      const taskId = task.id || id;
      
      const {data} = await request.patch(`/tasks/${taskId}`, task);
      
      const idx = state.tasks.findIndex(
        (task : Task) => task.id === taskId
      );

      const updatedTask = [...state.tasks];

      updatedTask[idx] = {
        ...updatedTask[idx],
        ...data,
      };

      commit("setTasks", updatedTask);

    } catch (error) {
      console.log(error);
    }
  },

  async sortTasks({ commit, state }, sortedBy: string) {
    switch (sortedBy) {
      case "date-asc":
        commit("setTasks", state.tasks.sort((a, b) => a.expiryAt.localeCompare(b.expiryAt)));
        break;
      case "date-desc":
        commit("setTasks", state.tasks.sort((a, b) => b.expiryAt.localeCompare(a.expiryAt)));
        break;
      default:
        commit("setTasks", state.tasks);
        break;
    }
  },

  async updateProjectTasks({ commit, state }, projectId : string) {
    try {        
      const {data} = await request.patch(`/projects/${projectId}`, {
        tasks: state.tasks.length,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTask(
      { commit, state, dispatch },
      {id, projectId} : {id: string, projectId: string}
    ) {
    try {
      const {data} = await request.delete(`/tasks/${id}`);
      
      commit("setTasks", state.tasks.filter((task : Task) => task.id !== id));

      dispatch("updateProjectTasks", projectId);
    } catch (error) {
      console.log(error);
    }
  },
}

const tasks = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default tasks;
