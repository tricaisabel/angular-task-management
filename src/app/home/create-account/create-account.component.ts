import { Component, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  @ViewChild('f') formData: NgForm;
  checks = [
    { name: 'Contains at least one digit', value: false },
    { name: 'Contains at least one lowercase character', value: false },
    { name: 'Contains at least one uppercase character', value: false },
    { name: 'Length > 8 characters', value: false },
  ];

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onChangePassword(newValue: string) {
    var checks = [/\d/, /[a-z]/, /[A-Z]/, /^.{8,}$/];
    checks.forEach((check, i) => {
      this.checks[i].value = check.test(newValue);
    });
  }

  onRepeatPasswordChange(newValue: string) {
    const repeatField = this.formData.form.controls['repeat'];
    const passwordField = this.formData.form.controls['password'];
    if (newValue !== passwordField.value) {
      repeatField.setErrors({ incorrect: true });
    }
  }

  onSubmit(form: NgForm) {
    //display form values
    const data = {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      role: form.value.role,
    };
    this.auth.createAccount(data).subscribe(
      (response) => {
        this.snackBar.open('Your user was created. Have fun!');
        this.router.navigate(['/boards']);
      },
      (error) => {
        this.snackBar.open(error.error.message);
        this.formData.reset();
        for (let name in this.formData.controls) {
          this.formData.controls[name].setErrors(null);
        }
      }
    );
  }

  getErrorMessage(input: any) {
    const value = input.control.value;
    if (value === '') return `${input.name} can't be empty`;

    switch (input.name) {
      case 'repeat':
        return 'The passwords must match';
    }
    return '';
  }

  checkboxClick() {
    return false;
  }
}
