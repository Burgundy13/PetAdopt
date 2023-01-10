import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Adoption } from 'src/app/model/adoption';

import { Pet } from 'src/app/model/pets';
import { PetService } from 'src/app/service/pet.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css'],
})
export class PetInfoComponent implements OnInit {
  petInfo: Pet = new Pet();
  petId: number = 0;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
  });

  constructor(
    private service: PetService,
    private route: ActivatedRoute,
    public toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getPet();
  }

  getPet(): void {
    this.route.params.subscribe((params: Params) => {
      this.petId = params['id'];
      this.service.getOnePet(this.petId).subscribe({
        next: (response: Pet) => {
          this.petInfo = response;
        },
        error: (response: any) => {
          console.log('Error: ', response.statusText);
        },
      });
    });
  }
  submitAdoption(): void {
    if (!this.form.valid) {
      this.toast.show('Please fill in the form', {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    let adoption = new Adoption(this.form.value);
    adoption.petId = this.petId;
    adoption.petName = this.petInfo.name;
    this.service.postAdoption(adoption).subscribe({
      next: (response: Adoption) => {
        this.toast.show('Request sent', {
          classname: 'bg-success text-light',
          delay: 5000,
        });
        this.form.reset();
      },
      error: (response: any) => {
        this.toast.show('Error', {
          classname: 'bg-danger text-light',
          delay: 10000,
        });
      },
    });
  }
}
