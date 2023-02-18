import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
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
  @ViewChild('f') form: NgForm;
  date: FormControl;
  task: Task;
  templateMode: boolean = false;
  editMode: boolean = false;
  taskTypes = [
    { viewValue: 'Bug', value: 'BUG' },
    { viewValue: 'User Story', value: 'USER_STORY' },
    { viewValue: 'Issue', value: 'ISSUE' },
    { viewValue: 'Epic', value: 'EPIC' },
  ];

  statusTypes = [
    { viewValue: 'New', value: 'NEW' },
    { viewValue: 'Active', value: 'ACTIVE' },
    { viewValue: 'Done', value: 'DONE' },
    { viewValue: 'Blocked', value: 'BLOCKED' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.editMode;
    if (!this.data.task) {
      this.task = Task.createTemplateTask();
      this.templateMode = true;
      this.date = new FormControl(new Date());
    } else {
      this.task = this.data.task;
      this.templateMode = false;
      // this.date = new FormControl(this.task.deadline);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getIcon() {
    return this.boardsService.getIconByType(this.task);
  }
}
