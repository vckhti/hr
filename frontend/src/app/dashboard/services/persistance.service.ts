import {Injectable} from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
    }
  }
  delete() {
    localStorage.removeItem('email');
    localStorage.removeItem('token-exp');
    localStorage.removeItem('roles');
    localStorage.removeItem('id');
  }

  get(key: string): any {
    try {
      let str: string | null;
      str = localStorage.getItem(key);
      if (str) {
        return JSON.parse(str);
      }

    } catch (e) {
      return null
    }
  }

}
