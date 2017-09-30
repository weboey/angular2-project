import { Directive, Input, TemplateRef, ViewContainerRef,ElementRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Directive({
  selector: '[appInclude]'
})
export class NgIncludeDirective {
  constructor(
    private http:Http,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef
  ) { }

  @Input() set appInclude(tpl: string) {
    if (!!tpl) {
      this.templateRequest(tpl).subscribe(
        html=>{
         // this.viewContainer.createEmbeddedView(html);
          this.elementRef.nativeElement.innerHTML=html;
        }
      );
    }
  }
  templateRequest(tpl){
    //var httpOptions = {
    //  cache: $templateCache,
    //  transformResponse: transformResponse
    //};
    return this.http.get(tpl)
      .map((res:Response) => {
        return res.text();
      })
      .catch((error:any) => Observable.throw(error || `Failed to load template: ${tpl}`));
  }
}
