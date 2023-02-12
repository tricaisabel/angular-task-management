import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Board } from '../models/board.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BoardsService } from '../shared/boards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements AfterViewInit, OnInit {
  boards: Board[] = [];

  displayedColumns: string[] = ['id', 'name', 'createdBy'];
  dataSource = new MatTableDataSource(this.boards);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private boardsService: BoardsService, private router: Router) {}
  ngOnInit(): void {
    this.boards = this.boardsService.getAllBoards();
    this.dataSource = new MatTableDataSource(this.boards);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDetail(row: any) {
    this.router.navigate(['/boards', row.id]);
  }
}
