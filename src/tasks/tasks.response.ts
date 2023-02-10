import { Task } from './task.entity';

export interface TaskResponse {
  status: string;
  tasks?: Task[];
  task?: Task;
  results?: number;
}
