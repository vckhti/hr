import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "ip",
  pure: true
})
export class IpPipe implements PipeTransform {

  transform(string: string): any {
    if (string && string.length >0) {
      const searchTerm = "REDIRECT_REDIRECT_GEOIP_ADDR";
      const index = string.indexOf(searchTerm);

      return string.substring((index+36), (index + 51));
    }
    else {
      return "";
    }
  }

}
