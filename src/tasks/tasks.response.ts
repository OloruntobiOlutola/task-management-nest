import { Tasks } from './tasks.model';

export interface TaskResponse {
  status: string;
  tasks?: Tasks[];
  task?: Tasks;
  results?: number;
}
