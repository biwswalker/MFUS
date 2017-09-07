import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css', '../../pages.component.css']
})
export class SliderComponent implements OnInit {

  // Value
  rangeValues: number[] = [1,2];

  constructor() { }

  ngOnInit() {
  }

}
