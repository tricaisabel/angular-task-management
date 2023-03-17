import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { BoardDialogComponent } from './dialogs/board-dialog/board-dialog.component';
import { ManageTeamDialogComponent } from './dialogs/manage-team-dialog/manage-team-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { HeaderComponent } from './header/header.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ChipComponent } from './chip/chip.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    HeaderComponent,
    UserCardComponent,
    TaskDialogComponent,
    ManageTeamDialogComponent,
    BoardDialogComponent,
    UserCardComponent,
    ChipComponent,
    FooterComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TextFieldModule,
    RouterModule,
    GoogleChartsModule.forRoot(),
  ],
  exports: [
    //shared components
    HeaderComponent,
    UserCardComponent,
    TaskDialogComponent,
    ManageTeamDialogComponent,
    BoardDialogComponent,
    ChipComponent,
    FooterComponent,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    ChartComponent,
  ],
})
export class SharedModule {}
