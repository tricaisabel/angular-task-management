import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { DetailsComponent } from './details/details.component';
import { KanbanComponent } from './kanban/kanban.component';

@NgModule({
  declarations: [BoardsComponent, DetailsComponent, KanbanComponent],
  imports: [SharedModule, CommonModule, BoardsRoutingModule],
})
export class BoardsModule {}
