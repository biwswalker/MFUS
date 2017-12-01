import { AcParent } from './../../../models/ac-parent';
import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Rx";
import { NgProgress } from "ngx-progressbar";
import { FamilyAndAddressComponent } from "./../../family-and-address/family-and-address.component";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "./../../../../services/utils.service";
import { RftSubDistrict } from "./../../../models/rft-sub-district";
import { RftDistrict } from "./../../../models/rft-district";
import { RftProvince } from "./../../../models/rft-province";
import { FamilyAndAddressForm } from "./../../../form/family-and-address-form";
import { Message, SelectItem, RadioButtonModule } from "primeng/primeng";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Response } from "@angular/http";
import { forEach } from "@angular/router/src/utils/collection";
import { setTimeout } from "timers";
declare var jquery: any;
declare var $: any;
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
  thisFormGroup: FormGroup;

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

  dadProvince: RftProvince = new RftProvince();
  dadDistrict: RftDistrict = new RftDistrict();
  dadSubDistrict: RftSubDistrict = new RftSubDistrict();

  momProvince: RftProvince = new RftProvince();
  momDistrict: RftDistrict = new RftDistrict();
  momSubDistrict: RftSubDistrict = new RftSubDistrict();

  patrolProvince: RftProvince = new RftProvince();
  patrolDistrict: RftDistrict = new RftDistrict();
  patrolSubDistrict: RftSubDistrict = new RftSubDistrict();

  constructor(
    private utilsService: UtilsService,
    public familyAndAddress: FamilyAndAddressComponent
  ) {}

  ngOnInit() {
    console.log("FamilyComponent.ngOnInit ");
    this.getProvince();
    this.initBirthMonth();

    this.thisForm = this.familyAndAddress.getData();
    if (
      this.thisForm.acParent.parent_ref != "" ||
      this.thisForm.acParent.parent_ref != undefined
    ) {
      this.prepareBirthDateData();
      this.prepareAddressData();
    }
    this.validatorForm();

    this.whenChangeParentFlag(parseInt(this.thisForm.acParent.parent_flag));
  }

  validatorForm() {
    this.thisFormGroup = new FormGroup({
      parent_flag: new FormControl(this.thisForm.acParent.parent_flag),
      relationship_status: new FormControl(this.thisForm.acParent.relationship_status),
      because: new FormControl(this.thisForm.acParent.because),
      father_pid: new FormControl(this.thisForm.acParent.father_pid,Validators.compose([Validators.required])),
      father_status: new FormControl(this.thisForm.acParent.father_status),
      father_died_year: new FormControl(this.thisForm.acParent.father_died_year),
      father_name: new FormControl(this.thisForm.acParent.father_name,Validators.compose([Validators.required])),
      dadMonth: new FormControl(this.dadMonth,Validators.compose([Validators.required])),
      dadDay: new FormControl(this.dadDay,Validators.compose([Validators.required])),
      dadYear: new FormControl(this.dadYear,Validators.compose([Validators.required])),
      father_address: new FormControl(this.thisForm.acParent.father_address,Validators.compose([Validators.required])),
      father_province: new FormControl(this.thisForm.acParent.father_province,Validators.compose([Validators.required])),
      father_district: new FormControl(this.thisForm.acParent.father_district,Validators.compose([Validators.required])),
      father_sub_district: new FormControl(this.thisForm.acParent.father_sub_district,Validators.compose([Validators.required])),
      father_postcode: new FormControl(this.thisForm.acParent.father_postcode),
      father_phone: new FormControl(this.thisForm.acParent.father_phone),
      father_email: new FormControl(this.thisForm.acParent.father_email),
      father_occupation: new FormControl(this.thisForm.acParent.father_occupation),
      father_position: new FormControl(this.thisForm.acParent.father_position),
      father_work_address: new FormControl(this.thisForm.acParent.father_work_address),
      father_work_phone: new FormControl(this.thisForm.acParent.father_work_phone),
      father_work_fax: new FormControl(this.thisForm.acParent.father_work_fax),
      father_land_flag: new FormControl(this.thisForm.acParent.father_land_flag),
      father_land_all: new FormControl(this.thisForm.acParent.father_land_all),
      father_land_own: new FormControl(this.thisForm.acParent.father_land_own),
      father_land_rent: new FormControl(this.thisForm.acParent.father_land_rent),
      father_income_monthly: new FormControl(this.thisForm.acParent.father_income_monthly),

      mother_pid: new FormControl(this.thisForm.acParent.mother_pid,Validators.compose([Validators.required])),
      mother_status: new FormControl(this.thisForm.acParent.mother_status),
      mother_died_year: new FormControl(this.thisForm.acParent.mother_died_year),
      mother_name: new FormControl(this.thisForm.acParent.mother_name,Validators.compose([Validators.required])),
      momMonth: new FormControl(this.momMonth,Validators.compose([Validators.required])),
      momDay: new FormControl(this.momDay,Validators.compose([Validators.required])),
      momYear: new FormControl(this.momYear, Validators.compose([Validators.required])),
      mother_address: new FormControl(this.thisForm.acParent.mother_address,Validators.compose([Validators.required])),
      mother_province: new FormControl(this.momProvince,Validators.compose([Validators.required])),
      mother_district: new FormControl(this.momDistrict,Validators.compose([Validators.required])),
      mother_sub_district: new FormControl(this.momSubDistrict,Validators.compose([Validators.required])),
      mother_postcode: new FormControl(this.thisForm.acParent.mother_postcode),
      mother_phone: new FormControl(this.thisForm.acParent.mother_phone),
      mother_email: new FormControl(this.thisForm.acParent.mother_email),
      mother_occupation: new FormControl(this.thisForm.acParent.mother_occupation),
      mother_position: new FormControl(this.thisForm.acParent.mother_position),
      mother_work_address: new FormControl(this.thisForm.acParent.mother_work_address),
      mother_work_phone: new FormControl(this.thisForm.acParent.mother_work_phone),
      mother_work_fax: new FormControl(this.thisForm.acParent.mother_work_fax),
      mother_land_flag: new FormControl(this.thisForm.acParent.mother_land_flag),
      mother_land_all: new FormControl(this.thisForm.acParent.mother_land_all),
      mother_land_own: new FormControl(this.thisForm.acParent.mother_land_own),
      mother_land_rent: new FormControl(this.thisForm.acParent.mother_land_rent),
      mother_income_monthly: new FormControl(this.thisForm.acParent.mother_income_monthly),

      patrol_relationship: new FormControl(this.thisForm.acParent.patrol_relationship),
      patrol_pid: new FormControl(this.thisForm.acParent.patrol_pid),
      patrol_status: new FormControl(this.thisForm.acParent.patrol_status),
      patrol_died_year: new FormControl(this.thisForm.acParent.patrol_died_year),
      patrol_name: new FormControl(this.thisForm.acParent.patrol_name),
      patrolMonth: new FormControl(this.patrolMonth),
      patrolDay: new FormControl(this.patrolDay),
      patrolYear: new FormControl(this.patrolYear),
      patrol_address: new FormControl(this.thisForm.acParent.patrol_address),
      patrol_province: new FormControl(this.patrolProvince),
      patrol_district: new FormControl(this.patrolDistrict),
      patrol_sub_district: new FormControl(this.patrolSubDistrict),
      patrol_postcode: new FormControl(this.thisForm.acParent.patrol_postcode),
      patrol_phone: new FormControl(this.thisForm.acParent.patrol_phone),
      patrol_email: new FormControl(this.thisForm.acParent.patrol_email),
      patrol_occupation: new FormControl(this.thisForm.acParent.patrol_occupation),
      patrol_position: new FormControl(this.thisForm.acParent.patrol_position),
      patrol_work_address: new FormControl(this.thisForm.acParent.patrol_work_address),
      patrol_work_phone: new FormControl(this.thisForm.acParent.patrol_work_phone),
      patrol_work_fax: new FormControl(this.thisForm.acParent.patrol_work_fax),
      patrol_land_flag: new FormControl(this.thisForm.acParent.patrol_land_flag),
      patrol_land_all: new FormControl(this.thisForm.acParent.patrol_land_all),
      patrol_land_own: new FormControl(this.thisForm.acParent.patrol_land_own),
      patrol_land_rent: new FormControl(this.thisForm.acParent.patrol_land_rent),
      patrol_income_monthly: new FormControl(this.thisForm.acParent.patrol_income_monthly)
    });

  }

  whenChangeParentFlag(index: number) {
      console.log("whenChangeParentFlag: " + index);
      if (index == 1) {

          this.thisFormGroup.controls["father_pid"].setValidators([Validators.required]);
          this.thisFormGroup.controls["father_name"].setValidators([Validators.required]);
          this.thisFormGroup.controls["dadMonth"].setValidators([Validators.required]);
          this.thisFormGroup.controls["dadDay"].setValidators([Validators.required]);
          this.thisFormGroup.controls["dadYear"].setValidators([Validators.required]);
          this.thisFormGroup.controls["father_address"].setValidators([Validators.required]);
          this.thisFormGroup.controls["father_province"].setValidators([Validators.required]);
          this.thisFormGroup.controls["father_district"].setValidators([Validators.required]);
          this.thisFormGroup.controls["father_sub_district"].setValidators([Validators.required]);

          this.thisFormGroup.controls["mother_pid"].setValidators([Validators.required]);
          this.thisFormGroup.controls["mother_name"].setValidators([Validators.required]);
          this.thisFormGroup.controls["momMonth"].setValidators([Validators.required]);
          this.thisFormGroup.controls["momDay"].setValidators([Validators.required]);
          this.thisFormGroup.controls["momYear"].setValidators([Validators.required]);
          this.thisFormGroup.controls["mother_address"].setValidators([Validators.required]);
          this.thisFormGroup.controls["mother_province"].setValidators([Validators.required]);
          this.thisFormGroup.controls["mother_district"].setValidators([Validators.required]);
          this.thisFormGroup.controls["mother_sub_district"].setValidators([Validators.required]);

          this.thisFormGroup.controls["patrol_relationship"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_relationship"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_pid"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_pid"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_name"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_name"].updateValueAndValidity();
          this.thisFormGroup.controls["patrolMonth"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrolMonth"].updateValueAndValidity();
          this.thisFormGroup.controls["patrolDay"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrolDay"].updateValueAndValidity();
          this.thisFormGroup.controls["patrolYear"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrolYear"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_address"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_address"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_province"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_province"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_district"].updateValueAndValidity();
          this.thisFormGroup.controls["patrol_sub_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
        }else{
          this.thisFormGroup.controls["father_pid"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["father_name"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["dadMonth"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["dadDay"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["dadYear"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["father_address"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["father_province"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["father_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();
          this.thisFormGroup.controls["father_sub_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["patrol_sub_district"].updateValueAndValidity();

          this.thisFormGroup.controls["mother_pid"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_pid"].updateValueAndValidity();
          this.thisFormGroup.controls["mother_name"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_name"].updateValueAndValidity();
          this.thisFormGroup.controls["momMonth"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["momMonth"].updateValueAndValidity();
          this.thisFormGroup.controls["momDay"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["momDay"].updateValueAndValidity();
          this.thisFormGroup.controls["momYear"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["momYear"].updateValueAndValidity();
          this.thisFormGroup.controls["mother_address"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_address"].updateValueAndValidity();
          this.thisFormGroup.controls["mother_province"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_province"].updateValueAndValidity();
          this.thisFormGroup.controls["mother_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_district"].updateValueAndValidity();
          this.thisFormGroup.controls["mother_sub_district"].setValidators([Validators.nullValidator]);
          this.thisFormGroup.controls["mother_sub_district"].updateValueAndValidity();

          this.thisFormGroup.controls["patrol_relationship"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_pid"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_name"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrolMonth"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrolDay"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrolYear"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_address"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_province"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_district"].setValidators([Validators.required]);
          this.thisFormGroup.controls["patrol_sub_district"].setValidators([Validators.required]);
      }


  }

  prepareBirthDateData() {
    if (this.thisForm.acParent.parent_flag == "1") {
      this.dadYear = this.thisForm.acParent.father_birth_date.substr(0, 4);
      this.dadMonth = this.thisForm.acParent.father_birth_date.substr(4, 2);
      this.dadDay = this.thisForm.acParent.father_birth_date.substr(6, 2);

      this.momYear = this.thisForm.acParent.mother_birth_date.substr(0, 4);
      this.momMonth = this.thisForm.acParent.mother_birth_date.substr(4, 2);
      this.momDay = this.thisForm.acParent.mother_birth_date.substr(6, 2);
    } else {
      this.dadYear = this.thisForm.acParent.patrol_birth_date.substr(0, 4);
      this.dadMonth = this.thisForm.acParent.patrol_birth_date.substr(4, 2);
      this.dadDay = this.thisForm.acParent.patrol_birth_date.substr(6, 2);
    }

    this.initBirthMonth();
  }

  prepareAddressData() {
    if (this.thisForm.acParent.parent_flag == "1") {
      //Setup dad address
      this.utilsService
        .getProvinceByRef(this.thisForm.acParent.father_province)
        .subscribe((res: RftProvince) => {
          this.dadProvince = res;
        });
      this.utilsService
        .getDistrictByRef(this.thisForm.acParent.father_district)
        .subscribe((res: RftDistrict) => {
          this.dadDistrict = res;
        });
      this.utilsService
        .getSubDistrictByRef(this.thisForm.acParent.father_sub_district)
        .subscribe((res: RftSubDistrict) => {
          this.dadSubDistrict = res;
        });

      //Setup mom address
      this.utilsService
        .getProvinceByRef(this.thisForm.acParent.mother_province)
        .subscribe((res: RftProvince) => {
          this.momProvince = res;
        });
      this.utilsService
        .getDistrictByRef(this.thisForm.acParent.mother_district)
        .subscribe((res: RftDistrict) => {
          this.momDistrict = res;
        });
      this.utilsService
        .getSubDistrictByRef(this.thisForm.acParent.mother_sub_district)
        .subscribe((res: RftSubDistrict) => {
          this.momSubDistrict = res;
        });
    } else {
      this.utilsService
        .getProvinceByRef(this.thisForm.acParent.patrol_province)
        .subscribe((res: RftProvince) => {
          this.patrolProvince = res;
        });
      this.utilsService
        .getDistrictByRef(this.thisForm.acParent.patrol_district)
        .subscribe((res: RftDistrict) => {
          this.patrolDistrict = res;
        });
      this.utilsService
        .getSubDistrictByRef(this.thisForm.acParent.patrol_sub_district)
        .subscribe((res: RftSubDistrict) => {
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

  autocompleteProvince(event,seq: number) {
    console.log("autocompleteProvince: "+seq);
    let query = event.query;
    if(seq == 1){
      this.fProvinceList = [];
      this.dadDistrict = new RftDistrict();
      this.dadSubDistrict = new RftSubDistrict();
      this.thisForm.acParent.father_province = null;
      this.thisForm.acParent.father_postcode = null;
      let objList: RftProvince[];
      objList = this.listProvince;
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.fProvinceList.push(obj);
        }
      }
    }
    if(seq == 2){
      this.mProvinceList = [];
      this.momDistrict = new RftDistrict();
      this.momSubDistrict = new RftSubDistrict();
      this.thisForm.acParent.mother_postcode = null;
      let objList: RftProvince[];
      objList = this.listProvince;
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.mProvinceList.push(obj);
        }
      }
    }
    if(seq == 3){
      this.pProvinceList = [];
      this.patrolDistrict = new RftDistrict();
      this.patrolSubDistrict = new RftSubDistrict();
      this.thisForm.acParent.patrol_postcode = null;
      let objList: RftProvince[];
      objList = this.listProvince;
      for (let obj of objList) {
        // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.pProvinceList.push(obj);
        }
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
      this.dadDistrict = new RftDistrict();
      this.dadSubDistrict = new RftSubDistrict();
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
      this.momDistrict = new RftDistrict();
      this.momSubDistrict = new RftSubDistrict();
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
      this.patrolDistrict = new RftDistrict();
      this.patrolSubDistrict = new RftSubDistrict();
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
      this.dadSubDistrict = new RftSubDistrict();
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
      this.momSubDistrict = new RftSubDistrict();
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
      this.patrolSubDistrict = new RftSubDistrict();
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

  setupDistictList() {
    console.log("setupDistictList");
    this.fListDistrict = [];
    this.mListDistrict = [];
    this.pListDistrict = [];
    if (this.thisForm.acParent.parent_flag == "1") {
      this.fListDistrict = this.utilsService.getDistrictListByProvinceRef(
        this.thisForm.acParent.father_province
      );
      this.mListDistrict = this.utilsService.getDistrictListByProvinceRef(
        this.thisForm.acParent.mother_province
      );
    }

    if (this.thisForm.acParent.parent_flag == "2") {
      this.pListDistrict = this.utilsService.getDistrictListByProvinceRef(
        this.thisForm.acParent.patrol_province
      );
    }
  }

  setupSubDistictList() {
    console.log("setupSubDistictList");
    this.fListSubDistrict = [];
    this.mListSubDistrict = [];
    this.pListSubDistrict = [];
    if (this.thisForm.acParent.parent_flag == "1") {
      this.fListSubDistrict = this.utilsService.getSubDistrictListByDistrictRef(
        this.thisForm.acParent.father_district
      );
      this.mListSubDistrict = this.utilsService.getSubDistrictListByDistrictRef(
        this.thisForm.acParent.mother_district
      );
    }
    if (this.thisForm.acParent.parent_flag == "2") {
      this.pListSubDistrict = this.utilsService.getSubDistrictListByDistrictRef(
        this.thisForm.acParent.patrol_district
      );
    }
  }

  nextButtonOnClick() {
    console.log("nextButtonOnClick");
    if (this.thisForm.acParent.parent_flag == "1") {
      // set father data
      this.thisForm.acParent.father_birth_date =
        this.dadYear + this.dadMonth + this.dadDay;
      this.thisForm.acParent.father_province = this.dadProvince.province_ref;
      this.thisForm.acParent.father_district = this.dadDistrict.district_ref;
      this.thisForm.acParent.father_sub_district = this.dadSubDistrict.sub_district_ref;

      // set father data
      this.thisForm.acParent.mother_birth_date =
        this.momYear + this.momMonth + this.momDay;
      this.thisForm.acParent.mother_province = this.momProvince.province_ref;
      this.thisForm.acParent.mother_district = this.momDistrict.district_ref;
      this.thisForm.acParent.mother_sub_district = this.momSubDistrict.sub_district_ref;
    } else {
      // set father data
      this.thisForm.acParent.patrol_birth_date = this.patrolYear+this.patrolMonth+this.patrolDay;
      this.thisForm.acParent.patrol_province = this.patrolProvince.province_ref;
      this.thisForm.acParent.patrol_district = this.patrolDistrict.district_ref;
      this.thisForm.acParent.patrol_sub_district = this.patrolSubDistrict.sub_district_ref;
    }
















    console.log(this.thisFormGroup.status);
    console.log(this.thisFormGroup.value);
    if(this.thisFormGroup.invalid){
      this.thisFormGroup.controls["father_pid"].markAsDirty();
      this.thisFormGroup.controls["father_died_year"].markAsDirty();
      this.thisFormGroup.controls["father_name"].markAsDirty();
      this.thisFormGroup.controls["dadMonth"].markAsDirty();
      this.thisFormGroup.controls["dadDay"].markAsDirty();
      this.thisFormGroup.controls["dadYear"].markAsDirty();
      this.thisFormGroup.controls["father_address"].markAsDirty();
      this.thisFormGroup.controls["father_province"].markAsDirty();
      this.thisFormGroup.controls["father_district"].markAsDirty();
      this.thisFormGroup.controls["father_sub_district"].markAsDirty();
      this.thisFormGroup.controls["father_land_all"].markAsDirty();


      this.thisFormGroup.controls["mother_pid"].markAsDirty();
      this.thisFormGroup.controls["mother_died_year"].markAsDirty();
      this.thisFormGroup.controls["mother_name"].markAsDirty();
      this.thisFormGroup.controls["momMonth"].markAsDirty();
      this.thisFormGroup.controls["momDay"].markAsDirty();
      this.thisFormGroup.controls["momYear"].markAsDirty();
      this.thisFormGroup.controls["mother_address"].markAsDirty();
      this.thisFormGroup.controls["mother_province"].markAsDirty();
      this.thisFormGroup.controls["mother_district"].markAsDirty();
      this.thisFormGroup.controls["mother_sub_district"].markAsDirty();

      this.thisFormGroup.controls["patrol_relationship"].markAsDirty();
      this.thisFormGroup.controls["patrol_pid"].markAsDirty();
      this.thisFormGroup.controls["patrol_died_year"].markAsDirty();
      this.thisFormGroup.controls["patrol_name"].markAsDirty();
      this.thisFormGroup.controls["patrolMonth"].markAsDirty();
      this.thisFormGroup.controls["patrolDay"].markAsDirty();
      this.thisFormGroup.controls["patrolYear"].markAsDirty();
      this.thisFormGroup.controls["patrol_address"].markAsDirty();
      this.thisFormGroup.controls["patrol_province"].markAsDirty();
      this.thisFormGroup.controls["patrol_district"].markAsDirty();
      this.thisFormGroup.controls["patrol_sub_district"].markAsDirty();
    }else{
                this.familyAndAddress.onChangePanel(1, this.thisForm);
        this.thisForm = new FamilyAndAddressForm();
    }
  }
}
