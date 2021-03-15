import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseModel } from 'src/app/model/response.model';
import { CoreService } from 'src/app/service/core.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent<T> implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<T>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  modelList: T[];
  handleResponse = {
    next: (response: ResponseModel<T>) => {
      if (response.status === 'success' && Array.isArray(response.data)) {
        this.modelList = response.data;
      }
    },
    error: (error: HttpErrorResponse) => {
      this.toastService.showErrorMessage(error.statusText);
    },
  };
  constructor(
    protected toastService: ToastService,
    protected service: CoreService<T>,
    protected router: Router,
    protected activedRoute: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.modelList);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(
    pageSize: number = 10,
    pageIndex: number = 1,
    searchParam?: { searchText: string; searchStatus: number }
  ): void {
    this.service.getList().subscribe(
      (response: ResponseModel<T>) => {
        if (response.status === 'ok' && Array.isArray(response.data)) {
          this.modelList = response.data;
          this.dataSource = new MatTableDataSource(this.modelList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.total = response.total;
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.showErrorMessage(error.statusText);
      }
    );
  }
  create(): void {
    this.router.navigate(['../add'], { relativeTo: this.activedRoute });
  }
  // edit(id: string, ...rest) {
  //   this.router.navigate(['../edit', id], { relativeTo: this.activedRoute });
  // }
  // paginate(event: { first: number, page: number, pageCount: number, rows: number }) {
  //   this.itemPerPage = event.rows;
  //   this.currentPage = event.page + 1;
  //   this.getList(event.rows, ++event.page);
  // }
  // onSearch(event) {
  //   this.getList(this.itemPerPage, 1, event);
  // }
}
