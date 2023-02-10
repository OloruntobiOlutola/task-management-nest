import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto, FilterTask, UpdateTaskDto } from './task.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getAllTask = async (filterTask: FilterTask, user: User): Promise<Task[]> => {
    const { status, search } = filterTask;
    const { id } = user;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.andWhere('task.userId = :userId', { userId: id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  };

  createTask = async (
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> => {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user,
    });
    const task = await this.tasksRepository.save(newTask);
    delete task.user;
    return task;
  };

  getTask = async (id: number, user: User): Promise<Task> => {
    const userId = user.id;
    const task = await this.tasksRepository.findOne({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException(`Task with the ID "${id}" not found`);
    }
    return task;
  };

  deleteTask = async (id: number, user: User): Promise<void> => {
    const result = await this.tasksRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with the ID "${id}" not found`);
    }
  };

  updateTask = async (
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> => {
    const task = await this.getTask(id, user);
    if (!task) {
      throw new NotFoundException(`Task with the ID "${id}" not found`);
    }
    const updatedTask = await this.tasksRepository.save({
      id,
      ...updateTaskDto,
    });

    // const task = await this.getTask(id, user);
    return updatedTask;
  };
}
