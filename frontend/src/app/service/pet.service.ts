import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Adoption, AdoptionList } from '../model/adoption';
import { Pet, PetList } from '../model/pets';

const petsUrl = 'http://localhost:3000/api/pets';
const adoptionUrl = 'http://localhost:3000/api/adoptions';

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
  getOnePet(id: number): Observable<Pet> {
    return this.http.get(`${petsUrl}/${id}`).pipe(
      map((data: any) => {
        return new Pet(data);
      })
    );
  }

  postAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.post(adoptionUrl, adoption).pipe(
      map((data: any) => {
        return new Adoption(data);
      })
    );
  }

  getAllAdoptions(): Observable<AdoptionList> {
    return this.http.get(adoptionUrl).pipe(
      map((data: any) => {
        return new AdoptionList(data);
      })
    );
  }

  deleteAdoption(id: number): Observable<Adoption> {
    return this.http.delete(`${adoptionUrl}/${id}`).pipe(
      map((data: any) => {
        return new Adoption(data);
      })
    );
  }
}
