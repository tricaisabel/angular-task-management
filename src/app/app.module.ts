import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { BoardsComponent } from './boards/boards.component';
import { DetailsComponent } from './boards/details/details.component';
import { UserCardComponent } from './user-card/user-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from './boards/kanban/kanban.component';
import { DialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { ManageTeamDialogComponent } from './dialogs/manage-team-dialog/manage-team-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LoginComponent,
    CreateAccountComponent,
    BoardsComponent,
    DetailsComponent,
    UserCardComponent,
    KanbanComponent,
    DialogComponent,
    ManageTeamDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
