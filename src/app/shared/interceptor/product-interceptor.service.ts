import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInterceptorService implements HttpInterceptor {

  // antes de cualquier peticion ve si tengo guardado un token
  // ya que el backend para hacer consultas necesita tener un token en cada peticion
  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRed = req;
    const token = this.tokenService.getToken();
    if(token !== null){
      interceptedRed = req.clone({
        headers:req.headers.set('Authorization', 'Bearer ' + token)
        .set('Access-Control-Allow-Origin','*')
        .set("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method")
        .set("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE")
        .set("Allow","GET, POST, OPTIONS, PUT, DELETE")
      });
    }
    return next.handle(interceptedRed);
  }
}

export const intercetorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProductInterceptorService, multi: true}]
