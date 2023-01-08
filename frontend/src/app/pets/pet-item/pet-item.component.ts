import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/pets';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  styleUrls: ['./pet-item.component.css'],
})
export class PetItemComponent implements OnInit {
  @Input() pet: Pet = new Pet();
  constructor() {}

  ngOnInit(): void {}
}
