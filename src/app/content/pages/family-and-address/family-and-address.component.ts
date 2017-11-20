import { FamilyAndAddressService } from './../../../services/familyandaddress.service';
import { RftEducationLevel } from './../../models/rft-education-level';
import { EducationLevelService } from './../../../services/educationlevel.service';
import { AcSibling } from "./../../models/ac-sibling";
import { FamilyAndAddressForm } from "./../../form/family-and-address-form";
import { SelectItem, StepsModule, MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../../services/utils.service";
import { Response } from "@angular/http";

@Component({
  selector: "app-family-and-address",
  templateUrl: "./family-and-address.component.html",
  styleUrls: ["./family-and-address.component.css", "../pages.component.css"]
})
export class FamilyAndAddressComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 2;
  familyAndAddressForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();


  educationLevelList: RftEducationLevel[];
  constructor(private utilsService: UtilsService,private educationLevelService: EducationLevelService, private familyAndAddressService: FamilyAndAddressService) {}

  ngOnInit() {
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.stepDisplay();
    this.familyAndAddressForm.acParent.parent_flag = "1";
    this.familyAndAddressForm.acParent.relationship_status = "1";
    this.familyAndAddressForm.acParent.father_status = "1";
    this.familyAndAddressForm.acParent.mother_status = "1";
    this.familyAndAddressForm.acParent.patrol_status = "1";
    this.familyAndAddressForm.acParent.father_land_flag = "1";
    this.familyAndAddressForm.acParent.mother_land_flag = "1";
    this.familyAndAddressForm.acParent.patrol_land_flag = "1";

    this.familyAndAddressForm.siblingList = [];
    this.sibling = new AcSibling();
    this.familyAndAddressForm.siblingList.push(this.sibling);

    this.getEducationDropDown();
  }

  getEducationDropDown(){
    this.educationLevelService
    .getEducationLevel()
    .subscribe((res: RftEducationLevel[]) => {
      this.educationLevelList = [];
      this.educationLevelList.push(...res);
      console.log(this.educationLevelList.length);
    });
  }

  stepDisplay() {
    this.items = [
      {
        label: "ข้อมูลครอบครัว",
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: "ข้อมูลพี่น้อง",
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: "ข้อมูลที่อยู่",
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }

  getData(): FamilyAndAddressForm {
    console.log("getData");
    return this.familyAndAddressForm;
  }

  onChangePanel(index: number, form: FamilyAndAddressForm) {
    console.log("addButtonOnClick");
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.familyAndAddressForm = form;

    console.log(this.familyAndAddressForm.siblingList);

    this.activeIndex = index;
    console.log("activeIndex = " + this.activeIndex);
    //   console.log('data = ' + this.applyScholarshipForm);
  }

  onSubmit(form: FamilyAndAddressForm){
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.familyAndAddressForm = form;
    console.log("home_address = " + this.familyAndAddressForm.acAddress.home_address);


    this.familyAndAddressService.insertFamilyAndAddress(this.familyAndAddressForm);
  }
}
}
