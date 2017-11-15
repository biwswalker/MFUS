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
  dadMonth: number = null;
  dadDay: number = null;
  dadYear: number = null;

  momDropdownMonths: SelectItem[];
  momDropdownDays: SelectItem[];
  momMonth: number = null;
  momDay: number = null;
  momYear: number = null;

  patrolDropdownMonths: SelectItem[];
  patrolDropdownDays: SelectItem[];
  patrolMonth: number = null;
  patrolDay: number = null;
  patrolYear: number = null;

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
    public familyAndAddress: FamilyAndAddressComponent
  ) {}

  ngOnInit() {

    this.getProvince();
    this.initBirthMonth();

    this.thisForm = this.familyAndAddress.getData();
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

  nextButtonOnClick() {
    console.log("nextButtonOnClick");
    this.familyAndAddress.onChangePanel(1, this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
}
