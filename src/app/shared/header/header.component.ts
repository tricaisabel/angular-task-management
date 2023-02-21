import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen = false;
  userSub: Subscription;
  user: User | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.authUser.subscribe((authUser) => {
      if (authUser) {
        this.user = authUser;
      }
    });
  }

  logOut() {
    this.authService.logOut();
    this.isOpen = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
