import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManageTeamDialogComponent } from 'src/app/dialogs/manage-team-dialog/manage-team-dialog.component';
import { DialogComponent } from 'src/app/dialogs/task-dialog/task-dialog.component';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/shared/boards.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string;
  board: Board | undefined;
  @ViewChild('tooltip') tooltip: MatTooltip;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private taskDialog: MatDialog,
    private teamDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.boardsService.getBoardById(this.id).subscribe((board) => {
      this.board = board;
    });
  }

  changeTooltip() {
    this.tooltip.message = 'Copied!';
    this.tooltip.show();
  }

  openTaskDialog() {
    if (!this.board) {
      return;
    }

    this.taskDialog.open(DialogComponent, {
      data: { editMode: true, boardId: this.board.id },
      width: '500px',
    });
  }

  openTeamDialog() {
    if (!this.board) {
      return;
    }

    this.teamDialog.open(ManageTeamDialogComponent, {
      data: { team: this.board.team },
      width: '500px',
    });
  }
}
