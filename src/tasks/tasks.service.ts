import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTask = (): Tasks[] => {
    return this.tasks;
  };

  createTask = (createTaskDto: CreateTaskDto): Tasks => {
    const task: Tasks = {
      ...createTaskDto,
      status: TaskStatus.OPEN,
      id: uuidv4(),
    };
    this.tasks.push(task);
    return task;
  };
}
