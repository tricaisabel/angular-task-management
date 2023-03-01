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
    if (this.user) {
      this.imagePath = `http://localhost:3000/files/${this.user.avatarId}`;
    }
  }

  visitProfile(event: any) {
    event.stopPropagation();
    event.preventDefault();

    this.router.navigate(['profile', this.user.id]);
  }
}
