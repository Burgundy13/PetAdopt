import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PetList } from '../model/pets';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets: PetList = new PetList();
  params = {
    sort: '',
    sortDirection: '',
    filter: {
      category: '',
      sex: '',
    },
  };
  constructor(private service: PetService) {}

  ngOnInit(): void {
    this.getAllPets();
  }
  getAllPets(): void {
    this.service.getPetsList(this.params).subscribe({
      next: (response: PetList) => {
        this.pets = response;
      },
      error: (response: any) => {
        console.log('Error :', response.statusText);
      },
    });
  }
  onChangeCategory(event: any): void {
    this.params.filter.category = event.target.value;
    this.getAllPets();
  }
  onChecked(event: any): void {
    this.params.filter.sex = event.target.value;
    this.getAllPets();
  }
  onChangeSort(event: any): void {
    this.params.sort = event.target.value;
    this.getAllPets();
  }
}
