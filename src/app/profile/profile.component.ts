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
      this.user = user;
      this.imagePath = `http://localhost:3000/files/${user.avatarId}`;

      this.authService.authUser.subscribe((authUser) => {
        this.editMode = authUser && authUser.id === this.user.id ? true : false;
      });
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const selectedFile = inputNode.files[0];

    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name);

    this.authService.changeAvatar(uploadData, this.id);
    this._snackBar.open('The new avatar was successfully updated!');
  }

  backClick() {
    this._location.back();
  }
}
