import { Task } from './task.model';
import User from './user.model';

export class Board {
  constructor(
    public id: string,
    public title: string,
    public createdBy: User,
    public tasks: Task[],
    public team: User[]
  ) {}
}
