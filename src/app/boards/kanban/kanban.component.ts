import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/task-dialog/task-dialog.component';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { BoardsService } from 'src/app/shared/boards.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent {
  @Input() board: Board;

  constructor(public dialog: MatDialog, private boardsService: BoardsService) {}

  public dropGrid(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
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
