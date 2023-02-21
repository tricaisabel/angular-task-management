import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { BoardDialogComponent } from './dialogs/board-dialog/board-dialog.component';
import { ManageTeamDialogComponent } from './dialogs/manage-team-dialog/manage-team-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { HeaderComponent } from './header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserCardComponent,
    TaskDialogComponent,
    ManageTeamDialogComponent,
    BoardDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    //shared components
    HeaderComponent,
    UserCardComponent,
    TaskDialogComponent,
    ManageTeamDialogComponent,
    BoardDialogComponent,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
