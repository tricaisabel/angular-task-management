import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialogs/task-dialog/task-dialog.component';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/shared/boards.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  board: Board;
  @ViewChild('tooltip') tooltip: MatTooltip;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.boardsService.getBoardById(param['id']).subscribe((board) => {
        this.board = board;
      });
    });
  }

  changeTooltip() {
    this.tooltip.message = 'Copied!';
    this.tooltip.show();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { editMode: true },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
