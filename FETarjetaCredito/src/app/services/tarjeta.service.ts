import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//se importa observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppURL = 'https://localhost:7140/';
  private myApiURL = 'api/tarjeta/';

  constructor(private http:HttpClient) { }

  savetTarjeta(tarjeta: any): Observable<any>{
    return this.http.post(this.myAppURL + this.myApiURL, tarjeta);
    }

  getListTarjeta(): Observable<any>{
  return this.http.get(this.myAppURL + this.myApiURL);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any>{
    return this.http.put(this.myAppURL + this.myApiURL + id ,tarjeta);
  }

 deleteTarjeta(id: number): Observable<any>{
    return this.http.delete(this.myAppURL + this.myApiURL + id );
  }


}


