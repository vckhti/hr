import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LocalStorageInterface} from "../interfaces/local-storage.interface";

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

  addAuthorsToLocalstorage(args: object): void {
    let array=new Array();
    array.push(args);
    let str=JSON.stringify(array);
    console.log('array', array);
    this.set('authors',str);
  }

  getAllDataFromLocalstorage(): Observable<any> {
    const response = new PersistanceService();

    response.authors = this.get('authors');
    response.books = this.get('books');

    let authorsArray= JSON.parse(response.authors);

    return of(authorsArray)
      .pipe(
        catchError(() => of(null)),
      );
  }

}
