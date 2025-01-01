import type { SortableEvent } from "sortablejs";

export interface Task {
    id: string;
    project_id: string;
    name: string;
    assignee: string;
    status: "To do" | "In Progress" | "Done";
    expiryAt: string;
}

export interface TaskState {
    tasks: Task[];
}

export interface Mutations { 
    setTasks: (state: TaskState, tasks: Task[]) => void;
}

export type Commit = <K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
) => void;

export interface Dispatch {
    (type: string, payload?: any): void;
}

export type Actions = {
    getTasks(context: { commit: Commit }, { id }: { id: string }): Promise<void>;
    addTask(context: { commit: Commit, state: TaskState, dispatch: Dispatch }, { task, projectId }: { task: Task, projectId: string }): Promise<void>;
    updateTask(context: { commit: Commit, state: TaskState }, { task, id }: { task: Task, id: string }): Promise<void>;
    updateProjectTasks(context: { commit: Commit, state: TaskState }, projectId: string): Promise<void>;
    deleteTask(context: { commit: Commit, state: TaskState, dispatch: Dispatch }, { id, projectId }: { id: string, projectId: string }): Promise<void>;
};

export interface Module {
    namespaced: boolean;
    state: TaskState ;
    mutations: Mutations;
    actions: Actions;
}

export interface DraggableEvent extends SortableEvent {
    added?: {
        element: Task;
        newIndex: number;
    };
    removed?: {
        element: Task;
        oldIndex: number;
    };
    moved?: {
        element: Task;
        oldIndex: number;
        newIndex: number;
    };
}