import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "username",
  pure: true
})
export class UsernamePipe implements PipeTransform {

  transform(id: number, usersDecriptions: any[]): any {
    // console.log('transform', id, usersDecriptions);
    if (usersDecriptions && usersDecriptions.length >0) {
      if (id && usersDecriptions && usersDecriptions.length > 0) {
        for (let i = 0; i < usersDecriptions.length; i++) {
          if (usersDecriptions[i].id === id) {
            return usersDecriptions[i].name;
          }
        }
      }
    }
    else {
      return "";
    }
  }

}
