import User from './user.model';
export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: string,
    public type: string,
    public priority: string,
    public deadline: string,
    public createdOn: string,
    public createdBy: User,
    public assignedTo: User
  ) {}

  public static createTemplateTask() {
    return new Task(
      '',
      '',
      '',
      'NEW',
      '',
      '',
      '',
      '',
      new User('none', 'none', '', ''),
      new User('none', 'none', '', '')
    );
  }
}
