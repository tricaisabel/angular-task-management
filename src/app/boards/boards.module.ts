import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { DetailsComponent } from './details/details.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ListviewComponent } from './listview/listview.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    BoardsComponent,
    DetailsComponent,
    KanbanComponent,
    ListviewComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BoardsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class BoardsModule {}
