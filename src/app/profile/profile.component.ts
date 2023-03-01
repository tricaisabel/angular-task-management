import { Component, Input, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import User from '../models/user.model';
import { roleTypes } from '../models/types';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  backBtnText = 'Go Back';
  backBtnLink = '/boards';
  editMode = false;
  user: User;
  imagePath: string;
  roleTypes = roleTypes;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.authService.authUser.subscribe((user) => {
      if (user) {
        if (user.id === this.id) {
          this.user = user;
          this.imagePath = `http://localhost:3000/files/${user.avatarId}`;
          this.editMode = true;
        } else {
          this.authService.getUserById(this.id).subscribe((user) => {
            this.user = user;
            this.imagePath = `http://localhost:3000/files/${user.avatarId}`;
            this.editMode = false;
          });
        }
      }
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const selectedFile = inputNode.files[0];

    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name);

    this.authService.changeAvatar(uploadData, this.id);
  }
}
