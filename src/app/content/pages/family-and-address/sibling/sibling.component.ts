import { AcSibling } from './../../../models/ac-sibling';
import { FamilyAndAddressComponent } from './../family-and-address.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['../family-and-address.component.css' , '../../pages.component.css']
})
export class SiblingComponent implements OnInit {

  siblings: AcSibling[];
  sibling: AcSibling = new AcSibling();
  constructor(private familyAndAddress: FamilyAndAddressComponent) { }

  ngOnInit() {
    this.sibling = new AcSibling();
    this.sibling.born_year = '2560';
    this.siblings = [];
    this.siblings.push(this.sibling);
    this.siblings.push(this.sibling);

    console.log('siblings: '+this.siblings.length);
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
