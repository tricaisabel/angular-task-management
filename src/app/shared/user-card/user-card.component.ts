import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input('user') user: User;
  @ViewChild('avatar') avatarImage: any;
  imagePath: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.user.avatarId !== null) {
      this.imagePath = `http://localhost:3000/files/${this.user.avatarId}`;
    } else {
      this.imagePath =
        'http://localhost:3000/files/e8bc2380-fc64-44a2-932b-5b6f221904f9';
    }
  }

  visitProfile(event: any) {
    event.stopPropagation();
    event.preventDefault();

    this.router.navigate(['profile', this.user.id]);
  }
}
