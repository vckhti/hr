import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LocalStorageInterface} from "../interfaces/local-storage.interface";
import {AuthorInterface} from "../interfaces/author.interface";

@Injectable()
export class PersistanceService implements LocalStorageInterface{
  authors: string = '';
  books: string = '';


  set(key: string, data: string): void {
    if (key && key.length > 0 && data && data.length > 0) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }
  }

  get(key: string): string {
    if (key && key.length > 0) {
      try {
        let str: string | null;
        str = localStorage.getItem(key);
        if (str) {
          return JSON.parse(str);
        } else {
          return '';
        }
      } catch (e) {
        console.error('Error getting data from localStorage', e);
        return '';
      }
    } else {
      return '';
    }
  }

  existAuthorsInLocalStorage(value: AuthorInterface, array: any[]): boolean {
    let exist = array.find((item) =>  value.lastName === item.lastName &&
      value.firstName === item.firstName && value.middleName === item.middleName && value.birthday === item.birthday);
    return !!exist;
  }

  addAuthorsToLocalstorage(args: AuthorInterface): Observable<any> {
    let array=new Array();
    let cureentAuthorsString = this.get('authors');
    if (cureentAuthorsString && cureentAuthorsString.length > 0) {
      array=JSON.parse(cureentAuthorsString);
      if (this.existAuthorsInLocalStorage(args,array)) {
        console.log('already exist', args);
        return EMPTY;
      }
    }
    array.push(args);
    array=this.sortAuthorsByLastname(array);
    let str=JSON.stringify(array);
    console.log('array', array);
    this.set('authors',str);

    return of(array)
      .pipe(
        catchError(() => of(null)),
      );
  }

  getAuthors(): Observable<AuthorInterface[] | null> {
    let authorsArray = new Array();

    let cureentAuthorsString = this.get('authors');
    if (cureentAuthorsString && cureentAuthorsString.length > 0) {
      authorsArray= JSON.parse(cureentAuthorsString);
    } else {
      return of(null)
    }

    return of(this.sortAuthorsByLastname(authorsArray))
      .pipe(
        catchError(() => of(null)),
      );
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

}
