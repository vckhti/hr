import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookInterface} from "../../../../dashboard/interfaces/book.interface";
import {SortConfigInterface} from "../../../../dashboard/interfaces/sort-config.interface";
import {AdminService} from "../../services/admin.service";
import {TableColumn} from "../../interfaces/table-column";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  form = new FormGroup({
    bookAuthor: new FormControl(null, [Validators.required]),
    bookName: new FormControl(null, [Validators.required]),
    bookPublisher: new FormControl(null, [Validators.required]),
    bookYear: new FormControl(null, [Validators.required]),
  }, { updateOn: 'submit' });

  onDestroy$: Subject<boolean> = new Subject();

  sortConfig: SortConfigInterface = { asc: false, column: 'bookAuthor' };

  data: any[] = [];
  usersNames: any[] = [];

  selectedRow: any;

  columns: TableColumn[] = [
    {header: 'Id', field: 'id', width: 110, sortable: false},
    {header: 'Тестируемый', field: 'user_id', width: 200, sortable: false},
    {header: 'Кол-во правильных ответов', field: 'right_questions', width: 200, sortable: false},
    {header: 'Кол-во неправильных ответов', field: 'wrong_questions', width: 235, sortable: false},
    {header: 'Дата прохождения тестирования', field: 'created_at', width: 235, sortable: false},
  ];

  constructor(
    private adminService: AdminService
  ) {
  }

  ngOnInit() {
    this.adminService.getNames().pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((response: any[] | null) => {
      if (response) {
        this.usersNames = response.map((item: any) => Object.assign({}, item));
      }
    });


    this.adminService.getTestResults().pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((response: any[] | null) => {
      if (response) {
        this.data = response.map((item: any) => Object.assign({}, item));
      }
    });

  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }




  addBook(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }


  }

  doSort(): void {
    switch (this.sortConfig.column) {
      case 'id': {
        this.sortBooksByID(this.sortConfig.asc);
        break;
      }
      case 'bookAuthor': {
        this.sortBooksByBookAuthor(this.sortConfig.asc);
        break;
      }
      case 'bookName': {
        this.sortBooksByBookName(this.sortConfig.asc);
        break;
      }
      case 'bookPublisher': {
        this.sortBooksByBookPublisher(this.sortConfig.asc);
        break;
      }
      case 'bookYear': {
        this.sortBooksByBookYear(this.sortConfig.asc);
        break;
      }
      default: {
        break;
      }
    }
  }

  sortBooksByID(asc: boolean = true): void {
    this.data?.sort((a: BookInterface, b: BookInterface) => {
      if ( a.id && b.id && a.id > b.id) {
        return asc ? 1 : -1;
      } else if (a.id && b.id && a.id < b.id) {
        return asc ? -1 : 1;
      }

      return 0;
    });
  }

  sortBooksByBookAuthor(asc: boolean = true): void {
    this.data?.sort((a: BookInterface, b: BookInterface) => {
      if ( a.bookAuthor && b.bookAuthor && a.bookAuthor > b.bookAuthor) {
        return asc ? 1 : -1;
      } else if (a.bookAuthor && b.bookAuthor && a.bookAuthor < b.bookAuthor) {
        return asc ? -1 : 1;
      }

      return 0;
    });
  }

  sortBooksByBookName(asc: boolean = true): void {
    this.data?.sort((a: BookInterface, b: BookInterface) => {
      if ( a.bookName && b.bookName && a.bookName > b.bookName) {
        return asc ? 1 : -1;
      } else if (a.bookName && b.bookName && a.bookName < b.bookName) {
        return asc ? -1 : 1;
      }

      return 0;
    });
  }

  sortBooksByBookPublisher(asc: boolean = true): void {
    this.data?.sort((a: BookInterface, b: BookInterface) => {
      if ( a.bookPublisher && b.bookPublisher && a.bookPublisher > b.bookPublisher) {
        return asc ? 1 : -1;
      } else if (a.bookPublisher && b.bookPublisher && a.bookPublisher < b.bookPublisher) {
        return asc ? -1 : 1;
      }

      return 0;
    });
  }

  sortBooksByBookYear(asc: boolean = true): void {
    this.data?.sort((a: BookInterface, b: BookInterface) => {
      if ( a.bookYear && b.bookYear && a.bookYear > b.bookYear) {
        return asc ? 1 : -1;
      } else if (a.bookYear && b.bookYear && a.bookYear < b.bookYear) {
        return asc ? -1 : 1;
      }

      return 0;
    });
  }

  onSortContainersClick(column: string): void {
    this.sortConfig.asc = (this.sortConfig.column === column) ? !this.sortConfig.asc : true;
    this.sortConfig.column = column;
    this.doSort();
  }

  onRowSelected(event: any): void {
    // console.log('event', event);
    this.selectedRow = event;

  }


}
