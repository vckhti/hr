import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "data",
  pure: true
})
export class DataPipe implements PipeTransform {

  transform(id: number, usersDecriptions: any[]): any {
    if (usersDecriptions && usersDecriptions.length >0) {
      if (id && usersDecriptions && usersDecriptions.length > 0) {
        for (let i = 0; i < usersDecriptions.length; i++) {
          if (usersDecriptions[i].id === id) {
            return usersDecriptions[i].address;
          }
        }
      }
    }
    else {
      return "";
    }
  }

}
