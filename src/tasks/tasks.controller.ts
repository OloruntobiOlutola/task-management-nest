import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTaskDto } from './task.dto';
import { TaskResponse } from './tasks.response';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(): TaskResponse {
    const tasks = this.tasksService.getAllTask();
    return {
      status: 'success',
      results: tasks.length,
      tasks,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor(''))
  createTask(@Body() createTaskDto: CreateTaskDto): TaskResponse {
    console.log(createTaskDto);
    const task = this.tasksService.createTask(createTaskDto);
    return {
      status: 'success',
      task,
    };
  }
}
