import { Component, Inject, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import User from 'src/app/models/user.model';
import { BoardsService } from 'src/app/shared/boards.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class DialogComponent implements OnInit {
  task: Task;
  editMode: boolean = false;
  taskTypes = [
    { viewValue: 'Bug', value: 'BUG' },
    { viewValue: 'User Story', value: 'USER_STORY' },
    { viewValue: 'Issue', value: 'ISSUE' },
  ];

  statusTypes = [
    { viewValue: 'New', value: 'NEW' },
    { viewValue: 'Active', value: 'ACTIVE' },
    { viewValue: 'Done', value: 'DONE' },
    { viewValue: 'Done', value: 'BLOCKED' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.editMode;
    if (!this.data.task) {
      this.task = new Task(
        '',
        '',
        '',
        'NEW',
        '',
        '',
        new User('none', 'none', ''),
        new User('none', 'none', '')
      );
    } else {
      this.task = this.data.task;
    }
  }

  onSubmit(form: Form) {
    //display form values
    console.log(form);
  }

  getIcon() {
    return this.boardsService.getIconByType(this.task);
  }
}
