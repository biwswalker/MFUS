import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FamilyAndAddressForm } from "./../../form/family-and-address-form";
import { Component, OnInit } from "@angular/core";
import { Message, SelectItem } from "primeng/primeng";
import { RftSubDistrict } from "./../../models/rft-sub-district";
import { RftDistrict } from "./../../models/rft-district";
import { RftProvince } from "./../../models/rft-province";
import { UtilsService } from "../../../services/utils.service";
import { Response } from "@angular/http";

@Component({
  selector: "app-family-and-address",
  templateUrl: "./family-and-address.component.html",
  styleUrls: ["./family-and-address.component.css", "../pages.component.css"]
})
export class FamilyAndAddressComponent implements OnInit {
  //mode
  mode: string = "S"; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];

  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  thisFormGroup: FormGroup;

  dadDropdownMonths: SelectItem[];
  dadDropdownDays: SelectItem[];
  dadMonth: number = null;
  dadDay: number = null;
  dadYear: number = null;

  momDropdownMonths: SelectItem[];
  momDropdownDays: SelectItem[];
  momMonth: number = null;
  momDay: number = null;
  momYear:number = null;

  patrolDropdownMonths: SelectItem[];
  patrolDropdownDays: SelectItem[];
  patrolMonth: number = null;
  patrolDay: number = null;
  patrolYear: number = null;


  // Autocomplete Province
  provinceList: RftProvince[] = [];
  provinceObject: RftProvince;
  listProvince: RftProvince[] = [];

  // Autocomplete District
  districtList: RftDistrict[] = [];
  districtObject: RftDistrict;
  listDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  subDistrictList: RftSubDistrict[] = [];
  subDistrictObject: RftSubDistrict;
  listSubDistrict: RftSubDistrict[] = [];

  postcode: string;

  //dropdown
  // StatusList: SelectItem[];
  dropdownList: SelectItem[];
  dropdownValue: string;

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.getProvince();
    this.validatorEditForm();
    this.dadDropdownMonths = this.utilsService.getDropdownMonthShort();
    this.dadDropdownDays = this.utilsService.getDropdownDayInMonth(this.dadMonth);

  }

  onSubmit() {
    if (this.mode == "I") {
      // this.onAddSponsors();
    } else if (this.mode == "U") {
      // this.onUpdateSponsors();
    }
  }

  validatorEditForm() {
    this.thisFormGroup = new FormGroup({
      parent_flag: new FormControl(
        this.thisForm.acParent.parent_flag,
        Validators.compose([Validators.required])
      ),
      relationship_status: new FormControl(
        this.thisForm.acParent.relationship_status,
        Validators.compose([Validators.required])
      ),
      because: new FormControl(
        this.thisForm.acParent.because,
        Validators.compose([Validators.required])
      ),
      father_pid: new FormControl(
        this.thisForm.acParent.father_pid,
        Validators.compose([Validators.required])
      ),
      father_status: new FormControl(
        this.thisForm.acParent.father_status,
        Validators.compose([Validators.required])
      ),
      Father_died_year: new FormControl(
        this.thisForm.acParent.Father_died_year,
        Validators.compose([Validators.required])
      ),
      fatherBirthMonth: new FormControl(
        this.dadMonth,
        Validators.compose([Validators.required])
      ),
      fatherBirthDay: new FormControl(
        this.dadDay,
        Validators.compose([Validators.required])
      ),
      fatherBirthYear: new FormControl(
        this.dadYear,
        Validators.compose([Validators.required])
      ),
      father_name: new FormControl(
        this.thisForm.acParent.father_name,
        Validators.compose([Validators.required])
      ),
      father_birth_date: new FormControl(
        this.thisForm.acParent.father_birth_date,
        Validators.compose([Validators.required])
      ),
      father_address: new FormControl(
        this.thisForm.acParent.father_address,
        Validators.compose([Validators.required])
      ),
      province: new FormControl(
        this.thisForm.acParent.father_address,
        Validators.compose([Validators.required])
      ),
      district: new FormControl(
        this.thisForm.acParent.father_address,
        Validators.compose([Validators.required])
      ),
      subdistrict: new FormControl(
        this.thisForm.acParent.father_address,
        Validators.compose([Validators.required])
      ),
      father_postcode: new FormControl(
        this.thisForm.acParent.father_postcode,
        Validators.compose([Validators.required])
      ),
      father_phone: new FormControl(
        this.thisForm.acParent.father_phone,
        Validators.compose([Validators.required])
      ),
      father_email: new FormControl(
        this.thisForm.acParent.father_occupation,
        Validators.compose([Validators.required])
      ),
      father_occupation: new FormControl(
        this.thisForm.acParent.father_occupation,
        Validators.compose([Validators.required])
      ),
      father_position: new FormControl(
        this.thisForm.acParent.father_position,
        Validators.compose([Validators.required])
      ),
      father_work_address: new FormControl(
        this.thisForm.acParent.father_work_address,
        Validators.compose([Validators.required])
      ),
      father_work_phone: new FormControl(
        this.thisForm.acParent.father_work_phone,
        Validators.compose([Validators.required])
      ),
      father_work_fax: new FormControl(
        this.thisForm.acParent.father_work_fax,
        Validators.compose([Validators.required])
      ),
      father_land_flag: new FormControl(
        this.thisForm.acParent.father_land_flag,
        Validators.compose([Validators.required])
      ),
      father_land_all: new FormControl(
        this.thisForm.acParent.father_land_all,
        Validators.compose([Validators.required])
      ),
      father_land_own: new FormControl(
        this.thisForm.acParent.father_land_own,
        Validators.compose([Validators.required])
      ),
      father_land_rent: new FormControl(
        this.thisForm.acParent.father_land_rent,
        Validators.compose([Validators.required])
      ),
      father_income_monthly: new FormControl(
        this.thisForm.acParent.father_income_monthly,
        Validators.compose([Validators.required])
      )
    });
  }

  selectMonth(){
    console.log('dad month: '+this.dadMonth);
    this.dadDropdownDays = this.utilsService.getDropdownDayInMonth(this.dadMonth);
    this.dadDay = null;

  }

  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilsService.getProvincesList();
  }

  // Autocomplete Selected
  selectProvince(event: SelectItem) {
    console.log('selectProvince');
    this.districtList = [];
    this.subDistrictList = [];

    this.utilsService
      .getDistrictsByProvinceRef(this.thisForm.rftProvince.province_ref)
      .subscribe((res: RftDistrict[]) => {
        this.listDistrict = [];
        this.listDistrict.push(...res);
        console.log("district length: " + this.listDistrict.length);
      });
    console.log(this.listDistrict.length);
  }

  selectDistrict(event: SelectItem) {
    console.log('selectDistrict');
    console.log(this.thisForm.rftDistrict);

    this.utilsService
      .getSubDistrictsByDistrictRef(this.thisForm.rftDistrict.district_ref)
      .subscribe((res: RftSubDistrict[]) => {
        this.listSubDistrict = [];
        this.listSubDistrict.push(...res);

        console.log("listSubDistrict: " + this.listSubDistrict.length);
      });
  }

  selectSubDistrict(event: SelectItem) {
    console.log('selectSubDistrict');
    this.thisFormGroup.controls["father_postcode"].setValue(
      this.thisForm.rftDistrict.postcode
    );
  }

  autocompleteProvince(event) {
    console.log('autocompleteProvince');
    let query = event.query;
    this.provinceList = [];
    this.thisForm.rftDistrict = new RftDistrict();
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  // Autocomplete filter
  autocompleteDistrict(event) {
    console.log('autocompleteDistrict');
    let query = event.query;
    this.districtList = [];
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (this.thisForm.rftProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.districtList.push(obj);
        }
      }
    }
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteSubDistrict: " + this.thisForm.rftDistrict.district_ref
    );
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[] = this.listSubDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_ref == this.thisForm.rftProvince.province_ref) {
        if (obj.district_ref == this.thisForm.rftDistrict.district_ref) {
          if (
            obj.sub_district_name_t
              .toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            this.subDistrictList.push(obj);
          }
        }
      }
    }
  }

  handleCompleteClickProvince() {
    console.log('handleCompleteClickProvince');
    console.log(this.listProvince.length);
    this.provinceList = [];
    this.thisForm.rftProvince = new RftProvince();
    this.thisForm.rftDistrict = new RftDistrict();
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    this.provinceList = this.listProvince;

    setTimeout(() => { }, 100);
  }

  handleCompleteClickDistrict() {
    console.log('handleCompleteClickDistrict');

    this.districtList = [];
    this.thisForm.rftDistrict = new RftDistrict();
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    this.districtList = this.listDistrict;
    console.log("list district: " + this.listDistrict.length);
    setTimeout(() => {
    }, 100);
    console.log(this.districtList.length);
  }

  handleCompleteClickSubDistrict() {
    console.log('handleCompleteClickSubDistrict');
    this.subDistrictList = [];
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    this.subDistrictList = this.listSubDistrict;
    setTimeout(() => {}, 100);
  }
}
