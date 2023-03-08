import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { BoardsService } from 'src/app/services/boards.service';
import { TaskDialogComponent } from 'src/app/shared/dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  @Input() board: Board;
  displayedColumns: string[] = [
    'id',
    'title',
    'type',
    'status',
    'priority',
    'createdBy',
    'deadline',
  ];
  selectedColumns = this.displayedColumns.slice();

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;

  constructor(public dialog: MatDialog, private boardsService: BoardsService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.board.tasks);
    console.log(this.board.tasks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIcon(element: Task) {
    return this.boardsService.getIconByType(element);
  }

  getName(type: string, value: string) {
    return this.boardsService.getName(type, value);
  }

  showDetail(task: Task) {
    this.dialog.open(TaskDialogComponent, {
      data: { task: { ...task }, editMode: false, team: this.board.team },
      width: '500px',
    });
  }
}
