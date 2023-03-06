import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./home/home.module').then((m) => m.HomeModule);
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
