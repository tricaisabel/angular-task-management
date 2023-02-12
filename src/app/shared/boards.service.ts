import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import User from '../models/user.model';

const columns: Column[] = [
  new Column('1', 'NEW', [
    new Task(
      '123',
      'Bug example ',
      'Bug example description ',
      'NEW',
      'BUG',
      '1',
      new User('User one', 'Project Owner', 'userone@email.com'),
      new User('User two', 'Software Developer', 'none.none@email.com')
    ),
  ]),
  new Column('2', 'ACTIVE', [
    new Task(
      '124',
      'Issue example',
      'Issue example description',
      'ACTIVE',
      'ISSUE',
      '1',
      new User('User three', 'Project Manager', 'userthree@email.com'),
      new User('User two', 'Software Developer', 'none.none@email.com')
    ),
  ]),
  new Column('3', 'DONE', [
    new Task(
      '124',
      'User story example',
      'User story example description',
      'DONE',
      'USER_STORY',
      '1',
      new User('User three', 'Project Manager', 'userthree@email.com'),
      new User('User two', 'Software Developer', 'none.none@email.com')
    ),
  ]),
  new Column('4', 'BLOCKED', []),
];

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private boards: Board[] = [
    new Board('100', 'First Board', 'me', columns),
    new Board('102', 'Second Board', 'you', columns),
    new Board('103', 'ETM Board', 'me', columns),
    new Board('105', 'Example Board', 'isa', columns),
  ];

  getAllBoards() {
    return this.boards.slice();
  }

  getBoardById(id: string) {
    return this.boards.find((board) => board.id === id);
  }

  addTaskToColumn(boardId: string, columnName: string, task: Task) {
    const board = this.getBoardById(boardId);
    if (!board) {
      return;
    }
    const column = board.columns.find((column) => column.name === columnName);
    column?.addTask(task);
  }

  getIconByType(task: Task) {
    switch (task.type) {
      case 'BUG':
        return 'bug_report';
      case 'USER_STORY':
        return 'code';
      case 'ISSUE':
        return 'report_problem';
      default:
        return 'help_outline';
    }
  }
}
