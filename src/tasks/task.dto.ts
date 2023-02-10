import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './tasks.model';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export class FilterTask {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
