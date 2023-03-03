import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen = false;
  userSub: Subscription;
  user: User | null;
  imagePath: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authUser.subscribe((authUser) => {
      if (authUser) {
        this.user = authUser;
      }
    });

    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      this.imagePath = `http://localhost:3000/files/${user.avatarId}`;
    });
  }

  logOut() {
    this.authService.logOut();
    this.isOpen = false;
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
