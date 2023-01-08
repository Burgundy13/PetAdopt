import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PetList } from '../model/pets';

const petsUrl = 'http://localhost:3000/api/pets';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getPetsList(params?: any): Observable<PetList> {
    let options = {};
    if (params) {
      options = {
        params:
          new HttpParams()
            .set('sort', params.sort || '')
            .set('sortDirection', params.sortDirection || '')
            .set('filter', params.filter && JSON.stringify(params.filter)) ||
          '',
      };
    }
    return this.http.get(petsUrl, options).pipe(
      map((data: any) => {
        return new PetList(data);
      })
    );
  }
}
