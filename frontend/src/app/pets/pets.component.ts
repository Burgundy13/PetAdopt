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
  constructor(private service: PetService) {}

  ngOnInit(): void {
    this.getAllPets();
  }
  getAllPets(): void {
    this.service.getPetsList().subscribe({
      next: (response: PetList) => {
        this.pets = response;
      },
      error: (response: any) => {
        console.log('Error :', response.statusText);
      },
    });
  }
}
