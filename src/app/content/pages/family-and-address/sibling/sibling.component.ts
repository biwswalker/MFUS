import { FamilyAndAddressForm } from './../../../form/family-and-address-form';
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
  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  constructor(private familyAndAddress: FamilyAndAddressComponent) { }

  ngOnInit() {
    this.thisForm = this.familyAndAddress.getData();
  }

  addButtonOnClick(){
    console.log('addButtonOnClick');
    this.sibling = new AcSibling();
    this.thisForm.siblingList.push(this.sibling);
  }
    deleteButtonOnClick(index){
    console.log('deleteButtonOnClick');
    this.thisForm.siblingList.splice(index,1);
  }
  nextButtonOnClick(){
    console.log('nextButtonOnClick');
    this.familyAndAddress.onChangePanel(2,this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
  prevButtonOnClick(){
    console.log('prevButtonOnClick');
    this.familyAndAddress.onChangePanel(0,this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
}
