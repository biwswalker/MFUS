import { RftEducationLevel } from './../../../models/rft-education-level';
import { FamilyAndAddressComponent } from './../family-and-address.component';
import { UtilsService } from './../../../../services/utils.service';
import { AcSibling } from './../../../models/ac-sibling';
import { FamilyAndAddressForm } from './../../../form/family-and-address-form';
import { ViewEncapsulation } from '@angular/core';
import { EducationLevelService } from './../../../../services/educationlevel.service';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: "app-sibling",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./sibling.component.html",
  styleUrls: ["../family-and-address.component.css", "../../pages.component.css"
  ]
})
export class SiblingComponent implements OnInit {
  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  educationLevel: SelectItem[];
  newRow:boolean = true;
  constructor(
    private utilsService: UtilsService,
    private familyAndAddress: FamilyAndAddressComponent,
    private educationLevelService: EducationLevelService
  ) {}

  ngOnInit() {
    this.thisForm = this.familyAndAddress.getData();
    console.log(this.thisForm.siblingList);
    this.getDropDown();
  }



  getDropDown(){
    console.log('getDropDown');

    let dropdown: SelectItem[];
    this.educationLevel = [];
    this.educationLevel = [{label: 'ระบุระดับการศึกษา', value: null},];
    for(let data of this.familyAndAddress.educationLevelList){
      dropdown = [];
      dropdown = [{label: data.education_name_t, value: data.education_ref},];
      this.educationLevel = this.educationLevel.concat(dropdown);
    }

  }

  dataCheckcing(){
    console.log("dataCheckcing");
    this.newRow = true;
    for(let data of this.thisForm.siblingList){
      if(data.sibling_name == ''|| data.sibling_name == undefined){
        this.newRow = false;
      }
    }
  }

  addButtonOnClick() {
    console.log("addButtonOnClick");
    this.dataCheckcing();
    this.sibling = new AcSibling();
    if(this.newRow){
      this.sibling.student_ref = '1';
      this.thisForm.siblingList.push(this.sibling);
    }

  }
  deleteButtonOnClick(index) {
    console.log("deleteButtonOnClick");
    this.thisForm.siblingList.splice(index, 1);
  }
  nextButtonOnClick() {
    console.log("nextButtonOnClick");
    this.dataCheckcing();
    if(this.newRow){
      this.familyAndAddress.onChangePanel(2, this.thisForm);
    }
  }
  prevButtonOnClick() {
    console.log("prevButtonOnClick");
    this.familyAndAddress.onChangePanel(0, this.thisForm);
  }
}
