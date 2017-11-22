import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar';
import { FamilyAndAddressComponent } from "./../../family-and-address/family-and-address.component";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "./../../../../services/utils.service";
import { RftSubDistrict } from "./../../../models/rft-sub-district";
import { RftDistrict } from "./../../../models/rft-district";
import { RftProvince } from "./../../../models/rft-province";
import { FamilyAndAddressForm } from "./../../../form/family-and-address-form";
import { Message, SelectItem } from "primeng/primeng";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Response } from "@angular/http";
import { forEach } from '@angular/router/src/utils/collection';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: "app-family",
  templateUrl: "./family.component.html",
  styleUrls: [
    "../family-and-address.component.css",
    "../../pages.component.css"
  ]
})
export class FamilyComponent implements OnInit {
  //message
  msgs: Message[] = [];

  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();

  dadDropdownMonths: SelectItem[];
  dadDropdownDays: SelectItem[];
  dadMonth: string = null;
  dadDay: string = null;
  dadYear: string = null;

  momDropdownMonths: SelectItem[];
  momDropdownDays: SelectItem[];
  momMonth: string = null;
  momDay: string = null;
  momYear: string = null;

  patrolDropdownMonths: SelectItem[];
  patrolDropdownDays: SelectItem[];
  patrolMonth: string = null;
  patrolDay: string = null;
  patrolYear: string = null;

  // Autocomplete Province
  listProvince: RftProvince[] = [];

  fProvinceList: RftProvince[] = [];
  mProvinceList: RftProvince[] = [];
  pProvinceList: RftProvince[] = [];

  // Autocomplete District
  fDistrictList: RftDistrict[] = [];
  fListDistrict: RftDistrict[] = [];
  mDistrictList: RftDistrict[] = [];
  mListDistrict: RftDistrict[] = [];
  pDistrictList: RftDistrict[] = [];
  pListDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  fSubDistrictList: RftSubDistrict[] = [];
  fListSubDistrict: RftSubDistrict[] = [];
  mSubDistrictList: RftSubDistrict[] = [];
  mListSubDistrict: RftSubDistrict[] = [];
  pSubDistrictList: RftSubDistrict[] = [];
  pListSubDistrict: RftSubDistrict[] = [];

  dadProvince: RftProvince = new RftProvince;
  dadDistrict: RftDistrict = new RftDistrict;
  dadSubDistrict: RftSubDistrict = new RftSubDistrict;

  momProvince: RftProvince = new RftProvince;
  momDistrict: RftDistrict = new RftDistrict;
  momSubDistrict: RftSubDistrict = new RftSubDistrict;

  patrolProvince: RftProvince = new RftProvince;
  patrolDistrict: RftDistrict = new RftDistrict;
  patrolSubDistrict: RftSubDistrict = new RftSubDistrict;

  constructor(
    private utilsService: UtilsService,
    public familyAndAddress: FamilyAndAddressComponent,

  ) {}

  ngOnInit() {
    console.log("FamilyComponent.ngOnInit ");
    this.getProvince();
    this.initBirthMonth();

    this.thisForm = this.familyAndAddress.getData();
    if(this.thisForm.acParent.parent_ref != '' || this.thisForm.acParent.parent_ref != undefined){
      this.prepareBirthDateData();
      this.prepareAddressData();

    }
  }

  prepareBirthDateData(){

    if(this.thisForm.acParent.parent_flag == '1'){


        this.dadYear = this.thisForm.acParent.father_birth_date.substr(0,4);
        this.dadMonth = this.thisForm.acParent.father_birth_date.substr(4,2);
        this.dadDay =  this.thisForm.acParent.father_birth_date.substr(6,2);

        this.momYear = this.thisForm.acParent.mother_birth_date.substr(0,4);
        this.momMonth = this.thisForm.acParent.mother_birth_date.substr(4,2);
        this.momDay =  this.thisForm.acParent.mother_birth_date.substr(6,2);
    }else{
      this.dadYear = this.thisForm.acParent.patrol_birth_date.substr(0,4);
      this.dadMonth = this.thisForm.acParent.patrol_birth_date.substr(4,2);
      this.dadDay =  this.thisForm.acParent.patrol_birth_date.substr(6,2);
    }


    this.initBirthMonth();
    // console.log('dad year: '+this.dadDay+'/'+this.dadMonth+'/'+this.dadYear);

  }


  prepareAddressData(){

    if(this.thisForm.acParent.parent_flag == '1'){

        //Setup dad address
        this.utilsService.getProvinceByRef(this.thisForm.acParent.father_province).subscribe((res: RftProvince) => {
          this.dadProvince = res;
        });
        this.utilsService.getDistrictByRef(this.thisForm.acParent.father_district).subscribe((res: RftDistrict) => {
          this.dadDistrict = res;
        });
        this.utilsService.getSubDistrictByRef(this.thisForm.acParent.father_sub_district).subscribe((res: RftSubDistrict) => {
          this.dadSubDistrict = res;
        });

        //Setup mom address
        this.utilsService.getProvinceByRef(this.thisForm.acParent.mother_province).subscribe((res: RftProvince) => {
          this.momProvince = res;
        });
        this.utilsService.getDistrictByRef(this.thisForm.acParent.mother_district).subscribe((res: RftDistrict) => {
          this.momDistrict = res;
        });
        this.utilsService.getSubDistrictByRef(this.thisForm.acParent.mother_sub_district).subscribe((res: RftSubDistrict) => {
          this.momSubDistrict = res;
        });
    }else{
      this.utilsService.getProvinceByRef(this.thisForm.acParent.patrol_province).subscribe((res: RftProvince) => {
        this.patrolProvince = res;
      });
      this.utilsService.getDistrictByRef(this.thisForm.acParent.patrol_district).subscribe((res: RftDistrict) => {
        this.patrolDistrict = res;
      });
      this.utilsService.getSubDistrictByRef(this.thisForm.acParent.patrol_sub_district).subscribe((res: RftSubDistrict) => {
        this.patrolSubDistrict = res;
      });
    }
    this.setupDistictList();
    this.setupSubDistictList();
  }

  initBirthMonth() {
    this.dadDropdownMonths = this.utilsService.getDropdownMonthShort();
    this.dadDropdownDays = this.utilsService.getDropdownDayInMonth(
      this.dadMonth
    );
    this.momDropdownMonths = this.utilsService.getDropdownMonthShort();
    this.momDropdownDays = this.utilsService.getDropdownDayInMonth(
      this.dadMonth
    );
    this.patrolDropdownMonths = this.utilsService.getDropdownMonthShort();
    this.patrolDropdownDays = this.utilsService.getDropdownDayInMonth(
      this.dadMonth
    );
  }

  selectMonth(seq: number) {
    console.log("sequence: " + seq);
    if (seq == 1) {
      this.dadDropdownDays = this.utilsService.getDropdownDayInMonth(
        this.dadMonth
      );
      this.dadDay = null;
    }
    if (seq == 2) {
      this.momDropdownDays = this.utilsService.getDropdownDayInMonth(
        this.momMonth
      );
      this.momDay = null;
    }
    if (seq == 3) {
      this.patrolDropdownDays = this.utilsService.getDropdownDayInMonth(
        this.patrolMonth
      );
      this.patrolDay = null;
    }
  }

  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilsService.getProvincesList();
  }

  autocompleteProvince(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.fProvinceList = [];
    this.dadDistrict = new RftDistrict();
    this.dadSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.fProvinceList.push(obj);
      }
    }
  }

  // Autocomplete filter
  autocompleteDistrict(event) {
    console.log("autocompleteDistrict");
    let query = event.query;
    this.fDistrictList = [];
    this.dadSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.fListDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (this.dadProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.fDistrictList.push(obj);
        }
      }
    }
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteSubDistrict: " + this.dadDistrict.district_ref);
    let query = event.query;
    this.fSubDistrictList = [];
    let objList: RftSubDistrict[] = this.fListSubDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_ref == this.dadProvince.province_ref) {
        if (obj.district_ref == this.dadDistrict.district_ref) {
          if (
            obj.sub_district_name_t
              .toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            this.fSubDistrictList.push(obj);
          }
        }
      }
    }
  }

  handleCompleteClickProvince(index: number) {
    console.log("handleCompleteClickProvince");
    console.log(this.listProvince.length);
    if (index == 0) {
      this.fProvinceList = [];

      setTimeout(() => {
        this.fProvinceList = this.listProvince;
        this.fDistrictList = [];
        this.fSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      this.mProvinceList = [];
      setTimeout(() => {
        this.mProvinceList = this.listProvince;
        this.mDistrictList = [];
        this.mSubDistrictList = [];
      }, 100);
    }
    if (index == 2) {
      this.pProvinceList = [];
      setTimeout(() => {
        this.pProvinceList = this.listProvince;
        this.pDistrictList = [];
        this.pSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickDistrict(index: number) {
    console.log("handleCompleteClickDistrict");
    if (index == 0) {
      this.fDistrictList = [];
      setTimeout(() => {
        this.fDistrictList = this.fListDistrict;
        this.fSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      this.mDistrictList = [];
      setTimeout(() => {
        this.mDistrictList = this.mListDistrict;
        this.mSubDistrictList = [];
      }, 100);
    }
    if (index == 2) {
      this.pDistrictList = [];
      setTimeout(() => {
        this.pDistrictList = this.pListDistrict;
        this.pSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickSubDistrict(index: number) {
    console.log("handleCompleteClickSubDistrict");

    if (index == 0) {
      this.fSubDistrictList = [];

      setTimeout(() => {
        this.fSubDistrictList = this.fListSubDistrict;
      }, 100);
    }

    if (index == 1) {
      this.mSubDistrictList = [];

      setTimeout(() => {
        this.mSubDistrictList = this.mListSubDistrict;
      }, 100);
    }

    if (index == 2) {
      this.pSubDistrictList = [];

      setTimeout(() => {
        this.pSubDistrictList = this.pListSubDistrict;
      }, 100);
    }
  }

  // Autocomplete Selected
  selectProvince(index: number) {
    console.log("selectProvince");
    if (index == 0) {
      this.fDistrictList = [];
      this.fSubDistrictList = [];
      this.dadDistrict = new RftDistrict;
      this.dadSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.father_postcode = null;
      this.utilsService
        .getDistrictsByProvinceRef(this.dadProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.fListDistrict = [];
          this.fListDistrict.push(...res);
        });
    }

    if (index == 1) {
      this.mDistrictList = [];
      this.mSubDistrictList = [];
      this.momDistrict = new RftDistrict;
      this.momSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.mother_postcode = null;
      this.utilsService
        .getDistrictsByProvinceRef(this.momProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.mListDistrict = [];
          this.mListDistrict.push(...res);
        });
    }

    if (index == 2) {
      this.pDistrictList = [];
      this.pSubDistrictList = [];
      this.patrolDistrict = new RftDistrict;
      this.patrolSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.patrol_postcode = null;
      this.utilsService
        .getDistrictsByProvinceRef(this.patrolProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.pListDistrict = [];
          this.pListDistrict.push(...res);
        });
    }
  }


  selectDistrict(index: number) {
    console.log("selectDistrict");
    if (index == 0) {
      this.fSubDistrictList = [];
      this.dadSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.father_postcode = null;
      this.utilsService
        .getSubDistrictsByDistrictRef(this.dadDistrict.district_ref)
        .subscribe((res: RftSubDistrict[]) => {
          this.fListSubDistrict = [];
          this.fListSubDistrict.push(...res);

        });
    }
    if (index == 1) {
      this.mSubDistrictList = [];
      this.momSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.mother_postcode = null;
      this.utilsService
        .getSubDistrictsByDistrictRef(this.momDistrict.district_ref)
        .subscribe((res: RftSubDistrict[]) => {
          this.mListSubDistrict = [];
          this.mListSubDistrict.push(...res);
        });
    }
    if (index == 2) {
      this.pSubDistrictList = [];
      this.patrolSubDistrict = new RftSubDistrict;
      this.thisForm.acParent.patrol_postcode = null;
      this.utilsService
        .getSubDistrictsByDistrictRef(this.patrolDistrict.district_ref)
        .subscribe((res: RftSubDistrict[]) => {
          this.pListSubDistrict = [];
          this.pListSubDistrict.push(...res);
        });
    }
  }

  selectSubDistrict(index: number) {
    console.log("selectSubDistrict");
    if (index == 0) {
      this.thisForm.acParent.father_postcode = this.dadSubDistrict.postcode;
    }
    if (index == 1) {
      this.thisForm.acParent.mother_postcode = this.momSubDistrict.postcode;
    }
    if (index == 2) {
      this.thisForm.acParent.patrol_postcode = this.patrolSubDistrict.postcode;
    }
  }

  setupDistictList(){
    console.log("setupDistictList");
      if(this.thisForm.acParent.parent_flag == '1'){
        this.utilsService.getDistrictsByProvinceRef(this.thisForm.acParent.father_province).subscribe((res: RftDistrict[]) => {
          this.fListDistrict = [];
          this.fListDistrict.push(...res);
        });
        this.utilsService.getDistrictsByProvinceRef(this.thisForm.acParent.mother_province).subscribe((res: RftDistrict[]) => {
          this.mListDistrict = [];
          this.mListDistrict.push(...res);
        });
      }

      if(this.thisForm.acParent.parent_flag == '2'){
        this.utilsService.getDistrictsByProvinceRef(this.thisForm.acParent.patrol_province).subscribe((res: RftDistrict[]) => {
          this.pListDistrict = [];
          this.pListDistrict.push(...res);
        });
      }
  }

  setupSubDistictList(){
    console.log("setupSubDistictList");
      if(this.thisForm.acParent.parent_flag == '1'){
        this.utilsService.getSubDistrictsByDistrictRef(this.thisForm.acParent.father_district).subscribe((res: RftSubDistrict[]) => {
          this.fListSubDistrict = [];
          this.fListSubDistrict.push(...res);
        });
        this.utilsService.getSubDistrictsByDistrictRef(this.thisForm.acParent.mother_district).subscribe((res: RftSubDistrict[]) => {
          this.mListSubDistrict = [];
          this.mListSubDistrict.push(...res);
        });
      }

      if(this.thisForm.acParent.parent_flag == '2'){
        this.utilsService.getSubDistrictsByDistrictRef(this.thisForm.acParent.patrol_district).subscribe((res: RftSubDistrict[]) => {
          this.pListSubDistrict = [];
          this.pListSubDistrict.push(...res);
        });
      }
  }
  nextButtonOnClick() {
    console.log("nextButtonOnClick");
    if(this.thisForm.acParent.parent_flag == '1'){
      // set father data
      this.thisForm.acParent.father_birth_date = this.dadYear+this.dadMonth+this.dadDay;
      this.thisForm.acParent.father_province = this.dadProvince.province_ref;
      this.thisForm.acParent.father_district = this.dadDistrict.district_ref;
      this.thisForm.acParent.father_sub_district = this.dadSubDistrict.sub_district_ref;

      // set father data
      this.thisForm.acParent.mother_birth_date = this.momYear+this.momMonth+this.momDay;
      this.thisForm.acParent.mother_province = this.momProvince.province_ref;
      this.thisForm.acParent.mother_district = this.momDistrict.district_ref;
      this.thisForm.acParent.mother_sub_district = this.momSubDistrict.sub_district_ref;
    }else{
      // set father data
      this.thisForm.acParent.patrol_birth_date = this.patrolYear.concat(this.patrolMonth).concat(this.patrolDay);
      this.thisForm.acParent.patrol_province = this.patrolProvince.province_ref;
      this.thisForm.acParent.patrol_district = this.patrolDistrict.district_ref;
      this.thisForm.acParent.patrol_sub_district = this.patrolSubDistrict.sub_district_ref;
    }



    this.familyAndAddress.onChangePanel(1, this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
}
