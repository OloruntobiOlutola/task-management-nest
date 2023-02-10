import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from './tasks.model';

export class TaskUpdateValidationPipe implements PipeTransform {
  transform(value: any) {
    const allowedStatus = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];
    const { status, description, title } = value;
    if (status) {
      const modified_status = status.toUpperCase();
      const result = allowedStatus.includes(modified_status);
      if (!result) {
        throw new BadRequestException('Status not valid');
      }
    }
    if (description) {
      if (description.length <= 3) {
        throw new BadRequestException('Description not valid');
      }
    }
    if (title) {
      if (title.length <= 3) {
        throw new BadRequestException('Title is not valid');
      }
    }
    return value;
  }
}
