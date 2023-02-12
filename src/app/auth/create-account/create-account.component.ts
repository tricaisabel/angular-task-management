import { Component, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  existingUsernames = ['test', 'anotherTest'];
  @ViewChild('f') formData: NgForm;
  checks = [
    { name: 'Contains at least one digit', value: false },
    { name: 'Contains at least one lowercase character', value: false },
    { name: 'Contains at least one uppercase character', value: false },
    { name: 'Length > 8 characters', value: false },
  ];

  onChangeUsername(newValue: string) {
    const usernameField = this.formData.form.controls['username'];
    if (this.existingUsernames.includes(newValue)) {
      usernameField.setErrors({ incorrect: true });
    }
  }

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

  onSubmit(form: Form) {
    //display form values
    console.log(form);
    //reset values
    this.formData.reset();
    //reset valid state
    for (let name in this.formData.controls) {
      this.formData.controls[name].setErrors(null);
    }
  }

  getErrorMessage(input: any) {
    const value = input.control.value;
    if (value === '') return `${input.name} can't be empty`;

    switch (input.name) {
      case 'username':
        return 'The username already exists';
      case 'repeat':
        return 'The passwords must match';
    }
    return '';
  }

  checkboxClick() {
    return false;
  }
}
