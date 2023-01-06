import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PetList } from '../model/pets';

const petsUrl = 'http://localhost:3000/api/pets';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getPetsList(): Observable<PetList> {
    return this.http.get(petsUrl).pipe(
      map((data: any) => {
        return new PetList(data);
      })
    );
  }
}
