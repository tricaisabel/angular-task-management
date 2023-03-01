import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./auth/auth.module').then((m) => m.AuthModule);
    },
  },
  {
    path: 'boards',
    loadChildren: () => {
      return import('./boards/boards.module').then((m) => m.BoardsModule);
    },
  },
  {
    path: 'profile',
    loadChildren: () => {
      return import('./profile/profile.module').then((m) => m.ProfileModule);
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
