import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CreateAccountComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarouselComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
      },
    ]),
  ],
})
export class HomeModule {}
