import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pet } from 'src/app/model/pets';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css'],
})
export class PetInfoComponent implements OnInit {
  petInfo: Pet = new Pet();

  constructor(private service: PetService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPet();
  }

  getPet(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getOnePet(params['id']).subscribe({
        next: (response: Pet) => {
          this.petInfo = response;
        },
        error: (response: any) => {
          console.log('Error: ', response.statusText);
        },
      });
    });
  }
}
