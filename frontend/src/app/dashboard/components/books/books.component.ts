import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {PersistanceService} from "../../services/persistance.service";
import {AuthorInterface} from "../../interfaces/author.interface";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  lastName: string | undefined = undefined;
  firstName: string | undefined = undefined;
  middleName: string | undefined = undefined;
  birthday: string | undefined = undefined;

  onDestroy$: Subject<boolean> = new Subject();

  authors: any = [];
  books: any = [];
  showFieldErrorBorders = false;

  constructor(
    private persistanceService: PersistanceService
  ) {
  }

  ngOnInit() {
    this.persistanceService.getAuthors().pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((response: AuthorInterface[] | null) => {
        console.log('response', response);
        if (response) {
          this.authors = response.map((item: AuthorInterface) => Object.assign({}, item));
        }
      }
    );

  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }

  sortAuthorsByLastname(authors: AuthorInterface[]) {
    return authors.sort((a: AuthorInterface, b: AuthorInterface) => {
      if (a.lastName && b.lastName && a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName && b.lastName && a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    });
  }


  refreshFields(): void {
    this.lastName = undefined;
    this.firstName = undefined;
    this.middleName = undefined;
    this.birthday = undefined;
    this.showFieldErrorBorders = false;
  }

  addAuthor(): void {

    let args: AuthorInterface = {
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      birthday: this.birthday,
    }
    this.persistanceService.addAuthorsToLocalstorage(args).pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((response) => {
      console.log('addAuthorsToLocalstorage subscribe:', response);
      if (response) {
        this.authors = response.map((item: AuthorInterface) => Object.assign({}, item));
        this.refreshFields();
      }
    });
  }


}
