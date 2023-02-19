import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  taskAdded = new Subject<Task>();
  constructor(private http: HttpClient) {}

  getBoardById(id: string) {
    return this.http.get<Board>(`http://localhost:3000/boards/${id}`);
  }

  fetchBoards() {
    return this.http.get<Board[]>('http://localhost:3000/boards');
  }

  newTask(data: any, boardId: string) {
    this.taskAdded.next(data);
    data.deadline = data.deadline.toISOString();
    data.boardId = boardId;
    return this.http.post('http://localhost:3000/tasks', {
      ...data,
    });
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
}
