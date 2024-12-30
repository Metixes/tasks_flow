export interface Task {
  id: string;
  project_id: string;
  name: string;
  assignee: string;
  status: "To do" | "In Progress" | "Done";
  expiryAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: number;
  status: "To do" | "In Progress" | "Done";
  createdAt: string;
}

export interface DragEvent {
  added: {
    element: Task;
  };
}

export interface RowEditSaveEvent {
  newData: Project;
}

export interface RowSelectEvent {
  data: Project;
}

export interface TaskState {
  tasks: Task[];
}

export interface ProjectsState {
  state: Project[];
}
