import { AcSibling } from './../../../models/ac-sibling';
import { FamilyAndAddressComponent } from './../family-and-address.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sibling',
  encapsulation: ViewEncapsulation.None,
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
    this.sibling = new AcSibling();
    this.siblings.push(this.sibling);
    console.log('siblings: '+this.siblings.length);
  }

  nextButtonOnClick(){
    console.log('nextButtonOnClick');
    this.familyAndAddress.onNext(2);
    console.log(this.siblings);
  }
  prevButtonOnClick(){
    console.log('prevButtonOnClick');
    this.familyAndAddress.onNext(0);
  }
}
