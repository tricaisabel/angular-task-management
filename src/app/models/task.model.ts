import User from './user.model';
export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: string,
    public type: string,
    public priority: string,
    public createdBy: User,
    public assignedTo: User
  ) {}
}
