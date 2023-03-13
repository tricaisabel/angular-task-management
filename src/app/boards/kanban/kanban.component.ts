import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from 'src/app/shared/dialogs/task-dialog/task-dialog.component';
import { Task } from 'src/app/models/task.model';
import User from 'src/app/models/user.model';
import { BoardsService } from 'src/app/services/boards.service';

type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  @Input() boardId: string;
  columns: Column[] = [
    { id: '1', name: 'New', tasks: [] },
    { id: '2', name: 'Active', tasks: [] },
    { id: '3', name: 'Done', tasks: [] },
    { id: '4', name: 'Blocked', tasks: [] },
  ];
  team: User[];

  constructor(public dialog: MatDialog, private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.fetchBoards();
    this.boardsService.boardsChanged.subscribe((boards) => {
      const board = boards.find((board) => board.id === this.boardId);

      if (!board) {
        return;
      }
      this.team = board.team;
      this.columns.forEach((column) => (column.tasks = []));

      board.tasks.forEach((task) => {
        this.columns.forEach((column) => {
          if (task.status === column.name.toUpperCase()) {
            column.tasks.push(task);
          }
        });
      });
    });
  }

  public dropGrid(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //change status
      const taskId = event.container.data[event.currentIndex].id;
      const newStatus =
        this.columns[+event.container.id - 1].name.toUpperCase();
      this.boardsService.changeTaskStatus(taskId, newStatus);
    }
  }

  openDialog(task: Task) {
    this.dialog.open(TaskDialogComponent, {
      data: { task: { ...task }, editMode: false, team: this.team },
      width: '100%',
    });
  }

  getIcon(task: Task) {
    return this.boardsService.getIconByType(task);
  }
}
