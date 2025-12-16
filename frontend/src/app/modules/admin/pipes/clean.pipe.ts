import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "clean",
  pure: true
})
export class CleanPipe implements PipeTransform {

  transform(string: string): any {
    if (string && string.length > 0) {
      const searchTerm = ":";
      const index = string.indexOf(searchTerm);
      if (index === -1) {
        return string;
      } else {
        return string.substring(0, (index - 3));
      }

    } else {
      return "";
    }
  }

}
