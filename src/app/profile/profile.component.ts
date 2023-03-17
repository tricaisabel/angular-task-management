import { Component, Input, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import User from '../models/user.model';
import { roleTypes } from '../models/types';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  backBtnText = 'Go Back';
  editMode = false;
  user: User;
  imagePath: string;
  roleTypes = roleTypes;
  id: string;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.authService.getAvatarById(this.id);

    this.authService.currentUser.subscribe((user) => {
      console.log(user);
      this.user = user;
      if (this.user.avatarId !== null) {
        this.imagePath = `http://localhost:3000/files/${this.user.avatarId}`;
      } else {
        this.imagePath =
          'http://localhost:3000/files/e8bc2380-fc64-44a2-932b-5b6f221904f9';
      }
      this.authService.authUser.subscribe((authUser) => {
        this.editMode = authUser && authUser.id === this.user.id ? true : false;
      });
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const selectedFile = inputNode.files[0];

    const k = 1024;
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(selectedFile.size) / Math.log(k));
    const size = parseFloat((selectedFile.size / Math.pow(k, i)).toFixed(2));

    if (size > 1 && i >= 2) {
      this._snackBar.open(
        `File should have less than 1 MB. Currently has ${size} ${units[i]}`
      );
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name);

    this.authService.changeAvatar(uploadData, this.id).subscribe({
      next: (user) => {
        this.authService.currentUser.next(user);
        this._snackBar.open('The new avatar was successfully updated!');
      },
      error: (failed) => {
        this._snackBar.open('Upload failed');
      },
    });
  }

  backClick() {
    this._location.back();
  }
}
