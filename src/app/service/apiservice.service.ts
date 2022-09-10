import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private _http: HttpClient) { }

  // Conecta com o back-end node js

  apiUrl = 'http://192.168.1.5:3000';

  // Pega todos os dados

  getAllData(): Observable<any>{
    return this._http.get(`${this.apiUrl}`);
  }

  // Criar os dados

  createData(data: any): Observable<any>{
    console.log('create==>',data);
    return this._http.post(`${this.apiUrl}/create`,data);
  }

  // Pesquisar e mostrar detalhes de um dado
  getUniqueData(cod_bar: any): Observable<any>{
    let cods_bar = cod_bar;
    return this._http.get(`${this.apiUrl}/${cods_bar}`);
  }

  // Deleta dados
  deleteData(cod_bar: any): Observable<any>{
    let cods_bar = cod_bar;
    return this._http.delete(`${this.apiUrl}/${cods_bar}`);
  }

  // Atualizar dados

  updateData(data: any, cod_bar: any): Observable<any>{
    let cods_bar = cod_bar;
    return this._http.put(`${this.apiUrl}/${cods_bar}`,data);
  }

}
