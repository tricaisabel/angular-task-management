import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() avatarId: string;
  @ViewChild('avatar') avatarImage: any;
  imagePath: any;

  ngOnInit(): void {
    if (this.avatarId) {
      this.imagePath = `http://localhost:3000/files/${this.avatarId}`;
    }
  }
}
