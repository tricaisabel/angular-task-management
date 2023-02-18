import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/task-dialog/task-dialog.component';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { BoardsService } from 'src/app/shared/boards.service';

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
  @Input() board: Board;
  columns: Column[] = [
    { id: '1', name: 'NEW', tasks: [] },
    { id: '2', name: 'ACTIVE', tasks: [] },
    { id: '3', name: 'DONE', tasks: [] },
    { id: '4', name: 'BLOCKED', tasks: [] },
  ];

  constructor(public dialog: MatDialog, private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.board.tasks.forEach((task) => {
      this.columns.forEach((column) => {
        if (task.status === column.name) {
          column.tasks.push(task);
        }
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
      //change status to new status
    }
  }

  openDialog(task: Task) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { task: { ...task }, editMode: false },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getIcon(task: Task) {
    return this.boardsService.getIconByType(task);
  }
}
