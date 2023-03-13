import { NoDataRowOutlet } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';
import User from '../models/user.model';
import { taskTypes, statusTypes, priorityTypes } from 'src/app/models/types';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  boardsChanged = new Subject<Board[]>();

  constructor(private http: HttpClient) {}

  getBoardById(id: string) {
    return this.http.get<Board>(`http://localhost:3000/boards/${id}`);
  }

  fetchBoards() {
    this.http
      .get<Board[]>('http://localhost:3000/boards')
      .subscribe((boards) => {
        this.boardsChanged.next(boards);
      });
  }

  createNewBoard(title: string) {
    this.http
      .post('http://localhost:3000/boards', {
        title,
      })
      .subscribe((response) => {
        this.fetchBoards();
      });
  }

  newTask(data: any, boardId: string) {
    data.deadline = data.deadline.toISOString();
    data.boardId = boardId;

    this.http
      .post('http://localhost:3000/tasks', {
        ...data,
      })
      .subscribe((response) => {
        this.fetchBoards();
      });
  }

  changeTaskStatus(idTask: string, newStatus: string) {
    this.http
      .patch(`http://localhost:3000/tasks/${idTask}/status`, {
        status: newStatus,
      })
      .subscribe((response) => {
        this.fetchBoards();
      });
  }

  editTask(idTask: string, newProperties: any, assignedToId: string) {
    newProperties.deadline = new Date(newProperties.deadline).toISOString();
    newProperties.assignedTo = assignedToId;
    this.http
      .patch(`http://localhost:3000/tasks/${idTask}`, {
        ...newProperties,
      })
      .subscribe((response) => {
        this.fetchBoards();
      });
  }

  addUserToTeam(boardId: string, userId: string) {
    return this.http.post<User | void>(
      `http://localhost:3000/boards/${boardId}/team`,
      {
        userId,
      }
    );
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

  getName(type: string, value: string) {
    switch (type) {
      case 'type':
        const type = taskTypes.find((type) => type.value === value);
        return type?.viewValue;
      case 'status':
        const status = statusTypes.find((status) => status.value === value);
        return status?.viewValue;
      case 'priority':
        const priority = priorityTypes.find(
          (priority) => priority.value === value
        );
        return priority?.viewValue;
      default:
        return 'none';
    }
  }
}
