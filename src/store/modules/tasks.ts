import request from "@/services/axios";
import type { Task, TaskState } from "@/types/types";

export const tasks = {
  namespaced: true,
  state: ()  => ({
    tasks : [],
  }),

  mutations: {
    setTasks : (state : TaskState, tasks : Task[]) => {
      state.tasks = tasks;
    },
  },

  actions: {
    async getTasks({ commit }, id : string): Promise<void> {
      try {
        const {data} = await request.get(`/tasks?project_id=${id}`);
        commit("setTasks", data);
      } catch (error) {
        console.log(error);
      }
    },

    async addTask({ commit, state, dispatch }, {task, projectId}): Promise<void> {
      try {
        const {data} = await request.post("/tasks", task );
        
        await commit("setTasks", [
          ...state.tasks,
          data,
        ]);

        dispatch("updateProjectTasks", projectId);
      } catch (error) {

        console.log(error);
      }
    },

    async updateTask({ commit, state }, {task, id }): Promise<void> {
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

    async updateProjectTasks({ commit, state }, projectId : string): Promise<void> {
      try {        
        const {data} = await request.patch(`/projects/${projectId}`, {
          tasks: state.tasks.length,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTask({ commit, state, dispatch }, {id, projectId} : {id: string, projectId: string}): Promise<void> {
      try {
        
        const {data} = await request.delete(`/tasks/${id}`);
        
        commit("setTasks", state.tasks.filter((task : Task) => task.id !== id));

        dispatch("updateProjectTasks", projectId);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
