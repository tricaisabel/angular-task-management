import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';
import User from '../models/user.model';
import { map } from 'rxjs';

// const columns: Column[] = [
//   new Column('1', 'NEW', [
//     new Task(
//       '123',
//       'Bug example ',
//       'Bug example description ',
//       'NEW',
//       'BUG',
//       '1',
//       new User('User one', 'Project Owner', 'userone@email.com'),
//       new User('User two', 'Software Developer', 'none.none@email.com')
//     ),
//   ]),
//   new Column('2', 'ACTIVE', [
//     new Task(
//       '124',
//       'Issue example',
//       'Issue example description',
//       'ACTIVE',
//       'ISSUE',
//       '1',
//       new User('User three', 'Project Manager', 'userthree@email.com'),
//       new User('User two', 'Software Developer', 'none.none@email.com')
//     ),
//   ]),
//   new Column('3', 'DONE', [
//     new Task(
//       '124',
//       'User story example',
//       'User story example description',
//       'DONE',
//       'USER_STORY',
//       '1',
//       new User('User three', 'Project Manager', 'userthree@email.com'),
//       new User('User two', 'Software Developer', 'none.none@email.com')
//     ),
//   ]),
//   new Column('4', 'BLOCKED', []),
// ];

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private boards: Board[] = [];

  constructor(private http: HttpClient) {}

  getAllBoards() {
    return this.boards.slice();
  }

  getBoardById(id: string) {
    return this.http.get<Board>(`http://localhost:3000/boards/${id}`);
  }

  getIconByType(task: Task) {
    switch (task.type) {
      case 'BUG':
        return 'bug_report';
      case 'USER_STORY':
        return 'code';
      case 'ISSUE':
        return 'report_problem';
      case 'EPIC':
        return 'description';
      default:
        return 'help_outline';
    }
  }

  fetchBoards() {
    return this.http.get<Board[]>('http://localhost:3000/boards');
  }
}
