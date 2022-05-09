import { Pipe, PipeTransform } from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: "Html"
})
export class RenderStyleHtml implements PipeTransform {

  constructor (private sanitizer: DomSanitizer) {

  }
  transform(html:any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
