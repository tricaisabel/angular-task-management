import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from 'src/app/models/user.model';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-manage-team-dialog',
  templateUrl: './manage-team-dialog.component.html',
  styleUrls: ['./manage-team-dialog.component.css'],
})
export class ManageTeamDialogComponent implements OnInit {
  team: User[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.team = this.data.team;
  }
}
