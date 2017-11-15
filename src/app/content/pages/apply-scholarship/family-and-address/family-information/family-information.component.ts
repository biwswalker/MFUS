import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.css', '../../../pages.component.css']
})
export class FamilyInformationComponent implements OnInit {

  mode: string;

  constructor() { }

  ngOnInit() {
    console.log('Begin family information')
    this.mode = 'S';
  }

  onEdit()  {
    this.mode = 'U'
  }
}
