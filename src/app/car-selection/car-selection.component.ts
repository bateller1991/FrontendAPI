import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.css']
})
export class CarSelectionComponent implements OnInit {
  bodyStyles: string[] = [];
  selectedBodyStyle!: string;
  cars: any[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getBodyStyles().subscribe(styles => {
      this.bodyStyles = styles;
    });
  }

  onBodyStyleSelect() {
    this.carService.getCarsByBodyStyle(this.selectedBodyStyle).subscribe(cars => {
      this.cars = cars;
    });
  }
}
