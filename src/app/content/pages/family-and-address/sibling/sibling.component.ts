import { FamilyAndAddressComponent } from './../family-and-address.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['../family-and-address.component.css' , '../../pages.component.css']
})
export class SiblingComponent implements OnInit {

  constructor(private familyAndAddress: FamilyAndAddressComponent) { }

  ngOnInit() {
  }

  nextButtonOnClick(){
    console.log('nextButtonOnClick');
    this.familyAndAddress.onNext(2);
  }
  prevButtonOnClick(){
    console.log('prevButtonOnClick');
    this.familyAndAddress.onNext(0);
  }
}
