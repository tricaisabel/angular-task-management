import { Task } from './task.model';

export class Column {
  constructor(public id: string, public name: string, public tasks: Task[]) {}

  addTask(task: Task) {
    if (!task) {
      this.tasks = [];
    }
    this.tasks.push(task);
  }

  removeTask(id: string): any {
    const taskIndex = this.tasks.findIndex((x) => x.id === id);
    if (taskIndex > -1) {
      const foundTasks = this.tasks.splice(taskIndex, 1);
      return foundTasks[0];
    }
    return null;
  }
}
