import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BoardsComponent } from './boards/boards.component';
import { DetailsComponent } from './boards/details/details.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'boards',
    component: BoardsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'boards/:id', component: DetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
