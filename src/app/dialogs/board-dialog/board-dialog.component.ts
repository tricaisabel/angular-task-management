import { Component } from '@angular/core';
import { BoardsService } from 'src/app/shared/boards.service';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.css'],
})
export class BoardDialogComponent {
  title: string;

  constructor(private boardsService: BoardsService) {}

  onCreateNewBoard() {
    this.boardsService.createNewBoard(this.title);
  }
}
