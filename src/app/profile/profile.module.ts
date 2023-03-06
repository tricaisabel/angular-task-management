import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: ProfileComponent, canActivate: [AuthGuard] },
    ]),
  ],
})
export class ProfileModule {}
