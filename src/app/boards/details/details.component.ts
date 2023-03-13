import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ManageTeamDialogComponent } from 'src/app/shared/dialogs/manage-team-dialog/manage-team-dialog.component';
import { TaskDialogComponent } from 'src/app/shared/dialogs/task-dialog/task-dialog.component';
import { Board } from 'src/app/models/board.model';
import User from 'src/app/models/user.model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string;
  board: Board | undefined;
  userSub: Subscription;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private taskDialog: MatDialog,
    private teamDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.boardsService.getBoardById(this.id).subscribe((board) => {
      this.board = board;
    });

    this.userSub = this.authService.authUser.subscribe((authUser) => {
      if (authUser) {
        this.user = authUser;
      }
    });
  }

  openTaskDialog() {
    if (!this.board) {
      return;
    }

    this.taskDialog.open(TaskDialogComponent, {
      data: { editMode: true, boardId: this.board.id },
      width: '100%',
    });
  }

  openTeamDialog() {
    if (!this.board) {
      return;
    }

    this.teamDialog.open(ManageTeamDialogComponent, {
      data: {
        team: this.board.team,
        boardId: this.board.id,
        isCreator: this.board.createdBy.id === this.user.id,
      },
      width: '500px',
    });
  }

  applyFilter(event: Event) {
    if (this.board) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.board.tasks = this.board.tasks.filter((task) =>
        task.title.concat(filterValue)
      );
    }
  }
}
