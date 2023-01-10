import { Component, OnInit } from '@angular/core';
import { AdoptionList } from '../model/adoption';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css'],
})
export class AdoptionsComponent implements OnInit {
  adoptionList: AdoptionList = new AdoptionList();

  constructor(private service: PetService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getAllAdoptions().subscribe({
      next: (response: AdoptionList) => {
        this.adoptionList = response;
      },
      error: (response: any) => {
        console.log('Error', response.statusText);
      },
    });
  }
}
