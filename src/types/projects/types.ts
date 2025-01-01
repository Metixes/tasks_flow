export interface Project {
    id: string;
    name: string;
    description: string;
    tasks: number;
    status: "To do" | "In Progress" | "Done";
    createdAt: string | number ;
}

export interface ProjectState {
    projects: Project[];
}

export interface Mutations { 
    setProjects: (state: ProjectState, projects: Project[]) => void;
}

export interface RowEditSaveEvent {
    newData: Project;
}
  
export interface RowSelectEvent {
data: Project;
}


export interface ProjectsState {
    state: Project[];
}

export type Commit = <K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
) => void;

export interface Dispatch {
    (type: string, payload?: any): void;
}

export type Actions = {
    getProjects(context: { commit: Commit }): Promise<void>;
    addProject(context: { commit: Commit, state: ProjectState }, project: Project): Promise<void>;
    updateProject(context: { commit: Commit, state: ProjectState }, project: Project): Promise<void>;
};