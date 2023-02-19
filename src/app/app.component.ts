import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './shared/loading-spinner/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(
    private loading: LoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loading.isLoading;
    this.authService.autoAuthenticate();
  }
}
