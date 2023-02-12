import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  goToBoards() {
    this.router.navigate(['/boards']);
  }

  onSubmit(form: Form) {}
}
