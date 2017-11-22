import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar';
import { SiblingService } from './../../../services/sibling.service';
import { AcParent } from './../../models/ac-parent';
import { FamilyAndAddressService } from './../../../services/familyandaddress.service';
import { RftEducationLevel } from './../../models/rft-education-level';
import { EducationLevelService } from './../../../services/educationlevel.service';
import { AcSibling } from "./../../models/ac-sibling";
import { FamilyAndAddressForm } from "./../../form/family-and-address-form";
import { SelectItem, StepsModule, MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../../services/utils.service";
import { Response } from "@angular/http";
import { ParentService } from '../../../services/parent.service';
import { AcAddress } from '../../models/ac-address';
import { AddressService } from '../../../services/address.service';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: "app-family-and-address",
  templateUrl: "./family-and-address.component.html",
  styleUrls: ["./family-and-address.component.css", "../pages.component.css"]
})
export class FamilyAndAddressComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  familyAndAddressForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  onLoaded = false;


  educationLevelList: RftEducationLevel[];
  constructor(private utilsService: UtilsService,
    private educationLevelService: EducationLevelService,
    private familyAndAddressService: FamilyAndAddressService,
    private parentService: ParentService,
    private addressService: AddressService,
    private siblingService: SiblingService,
    public ngProgress: NgProgress) {}

  ngOnInit() {
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.stepDisplay();


    this.findDataFromServer();



    this.getEducationDropDown();
  }


  initialSetup(){
    console.log('initialSetup');
    this.familyAndAddressForm.acParent.parent_flag = "1";
    this.familyAndAddressForm.acParent.relationship_status = "1";
    this.familyAndAddressForm.acParent.father_status = "1";
    this.familyAndAddressForm.acParent.mother_status = "1";
    this.familyAndAddressForm.acParent.patrol_status = "1";
    this.familyAndAddressForm.acParent.father_land_flag = "1";
    this.familyAndAddressForm.acParent.mother_land_flag = "1";
    this.familyAndAddressForm.acParent.patrol_land_flag = "1";


    this.familyAndAddressForm.acParent.student_ref = '1';
    this.familyAndAddressForm.acAddress.student_ref = '1';

    this.familyAndAddressForm.siblingList = [];
    this.sibling = new AcSibling();
    this.sibling.student_ref = '1';
    this.familyAndAddressForm.siblingList.push(this.sibling);
  }
  stepDisplay() {
    this.items = [
      {
        label: "ข้อมูลครอบครัว", command: (event: any) => {this.activeIndex = 0;}},
      {
        label: "ข้อมูลพี่น้อง", command: (event: any) => { this.activeIndex = 1;}},
      {
        label: "ข้อมูลที่อยู่", command: (event: any) => {this.activeIndex = 2;}}
    ];
  }

  findDataFromServer(){
    console.log('findDataFromServer');

    this.ngProgress.start();
    new Observable((observer: Observer<boolean>) => {

      setTimeout(() => {
        this.parentService.getParentByStudentRef('1').subscribe((res: AcParent) => {
          this.familyAndAddressForm.acParent = res;
          if(res)
          console.log('1');
          observer.next(true);
        });

      }, 1000);

      setTimeout(() => {
        this.addressService.getAddressByStudentRef('1').subscribe((res: AcAddress) => {
          this.familyAndAddressForm.acAddress = res;
          if(res)
          console.log('2');
          observer.next(true);
        });

      }, 2000);

      setTimeout(() => {
        this.siblingService.getSiblingByStudentRef('1').subscribe((res: AcSibling[]) => {
          this.familyAndAddressForm.siblingList.push(...res);
          if(res)
          console.log('3');
          observer.next(true);
        });

      }, 3000);
      setTimeout(() => {
        console.log(this.familyAndAddressForm);

        this.onLoaded = true;
        if(this.familyAndAddressForm.acParent.parent_ref == '' || this.familyAndAddressForm.acParent.parent_ref == undefined)
        this.initialSetup();
        observer.complete();
        this.ngProgress.done();
    }, 4000);
    }).subscribe();
  }



  getEducationDropDown(){
    this.educationLevelService
    .getEducationLevel()
    .subscribe((res: RftEducationLevel[]) => {
      this.educationLevelList = [];
      this.educationLevelList.push(...res);

    });
  }

  getData(): FamilyAndAddressForm {
    console.log("getData");
    return this.familyAndAddressForm;
  }

  onChangePanel(index: number, form: FamilyAndAddressForm) {
    console.log("onChangePanel");
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.familyAndAddressForm = form;


    this.activeIndex = index;
    console.log("activeIndex = " + this.activeIndex);

  }

  onSubmit(form: FamilyAndAddressForm){
    this.familyAndAddressForm = new FamilyAndAddressForm();
    this.familyAndAddressForm = form;
    console.log("home_address = " + form.acAddress.home_address);
    console.log("home_address = " + this.familyAndAddressForm.acAddress.home_address);


    // this.familyAndAddressService.insertFamilyAndAddress(this.familyAndAddressForm);
  }
}
