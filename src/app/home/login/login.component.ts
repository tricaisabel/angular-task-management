import { Component, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('f') form: NgForm;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/boards']);
      },
      (error) => {
        this.snackBar.open('Credentials are not correct');
        this.form.reset();
      }
    );
  }
}
