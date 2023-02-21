import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user.model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-manage-team-dialog',
  templateUrl: './manage-team-dialog.component.html',
  styleUrls: ['./manage-team-dialog.component.css'],
})
export class ManageTeamDialogComponent implements OnInit {
  team: User[];
  newUserId: string;
  myControl = new FormControl<string | User>('');
  options: User[];
  filteredOptions: Observable<User[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private boardService: BoardsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.team = this.data.team;
    this.authService.getAllUsers().subscribe((users) => {
      this.options = users;

      //autocomplete filter
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const username = typeof value === 'string' ? value : value?.username;
          return username
            ? this._filter(username as string)
            : this.options.slice();
        })
      );
    });
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.username.toLowerCase().includes(filterValue)
    );
  }

  addUserToTeam() {
    this.boardService
      .addUserToTeam(this.data.boardId, this.newUserId)
      .subscribe(
        (user) => {
          if (user) {
            this.team.push(user);
            this.boardService.fetchBoards();
          }
        },
        (error) => {
          console.log(error.error.message);
          this.snackBar.open(error.error.message);
        }
      );
  }
}
