import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Board } from '../models/board.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BoardsService } from '../services/boards.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'createdBy', 'team', 'tasks'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    private authService: AuthService,
    private boardDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.boardsService.fetchBoards();
    this.boardsService.boardsChanged.subscribe((boards) => {
      this.dataSource = new MatTableDataSource(boards);
      //makes sorting and pagination work
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDetail(row: any) {
    this.router.navigate(['/boards', row.id]);
  }

  logOut() {
    this.authService.logOut();
  }

  openBoardDialog() {
    this.boardDialog.open(BoardDialogComponent, {
      width: '500px',
    });
  }
}
