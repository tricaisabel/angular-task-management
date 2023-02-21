import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import User from 'src/app/models/user.model';
import { BoardsService } from 'src/app/services/boards.service';

export interface TeamMember {
  username: string;
  id: string;
}

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
  assignedToId: string;

  //autocomplete input
  myControl = new FormControl<string | TeamMember>('');
  options: TeamMember[];
  filteredOptions: Observable<TeamMember[]>;

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

  priorityTypes = [
    { viewValue: 'Low', value: 'LOW' },
    { viewValue: 'Medium', value: 'MEDIUM' },
    { viewValue: 'High', value: 'HIGH' },
    { viewValue: 'Critical', value: 'CRITICAL' },
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
      this.assignedToId = this.data.task.assignedTo
        ? this.data.task.assignedTo.id
        : 'Unassigned';
    }

    this.options = [];
    this.data.team.forEach((member: TeamMember) => {
      this.options.push({ username: member.username, id: member.id });
    });

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
  }

  onSubmit() {
    const form = this.form.value;

    if (this.templateMode === true) {
      this.boardsService.newTask(form, this.data.boardId);
    } else {
      this.boardsService.editTask(this.task.id, form, this.assignedToId);
    }
  }

  getIcon() {
    return this.boardsService.getIconByType(this.task);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.username.toLowerCase().includes(filterValue)
    );
  }
}
