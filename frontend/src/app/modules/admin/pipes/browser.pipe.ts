import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "browser",
  pure: true
})
export class BrowserPipe implements PipeTransform {

  transform(string: string): any {
    if (string && string.length >0) {
      const searchTerm = "HTTP_USER_AGENT";
      const index = string.indexOf(searchTerm);

      return string.substring((index+24), (index + 194));
    }
    else {
      return "";
    }
  }

}
