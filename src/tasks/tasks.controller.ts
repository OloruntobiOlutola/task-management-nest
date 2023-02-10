import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get_user_decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto, FilterTask, UpdateTaskDto } from './task.dto';
import { TaskResponse } from './tasks.response';
import { TasksService } from './tasks.service';
import { TaskUpdateValidationPipe } from './task_status_validation_pipe';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query() filterTask: FilterTask,
    @GetUser() user: User,
  ): Promise<TaskResponse> {
    this.logger.verbose(
      `${user.username} wants to get all task. Filter ${JSON.stringify(
        filterTask,
      )}`,
    );
    const tasks = await this.tasksService.getAllTask(filterTask, user);

    return {
      status: 'success',
      results: tasks.length,
      tasks,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor(''))
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskResponse> {
    const task = await this.tasksService.createTask(createTaskDto, user);
    return {
      status: 'success',
      task,
    };
  }

  @Get(':id')
  async getTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TaskResponse> {
    const task = await this.tasksService.getTask(id, user);
    return {
      status: 'success',
      task,
    };
  }

  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): TaskResponse {
    this.tasksService.deleteTask(id, user);
    return {
      status: 'success',
    };
  }
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskUpdateValidationPipe) updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    const task = await this.tasksService.updateTask(id, updateTaskDto, user);
    return {
      status: 'success',
      task,
    };
  }
}
