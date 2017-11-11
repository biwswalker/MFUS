import { SelectItem } from 'primeng/primeng';
import { FamilyAndAddressForm } from './../../../form/family-and-address-form';
import { UtilsService } from './../../../../services/utils.service';
import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { RftProvince } from './../../../models/rft-province';
import { FamilyAndAddressComponent } from './../family-and-address.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../family-and-address.component.css' , '../../pages.component.css']
})
export class AddressComponent implements OnInit {

  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();

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

  constructor( private utilsService: UtilsService, private familyAndAddress: FamilyAndAddressComponent) { }

  ngOnInit() {
  }

  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilsService.getProvincesList();
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
    setTimeout(() => {
      this.provinceList = this.listProvince;
      this.districtList = [];
      this.subDistrictList = [];
    }, 100);

  }

  handleCompleteClickDistrict() {
    console.log('handleCompleteClickDistrict');

    this.districtList = [];
    this.thisForm.rftDistrict = new RftDistrict();
    this.thisForm.rftSubDistrict = new RftSubDistrict();
    setTimeout(() => {
      this.districtList = this.listDistrict;
      this.subDistrictList = [];
    }, 100);
  }

  handleCompleteClickSubDistrict() {
    console.log('handleCompleteClickSubDistrict');
    this.subDistrictList = [];
    this.thisForm.rftSubDistrict = new RftSubDistrict();

    setTimeout(() => {
      this.subDistrictList = this.listSubDistrict;
    }, 100);
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
  }

  nextButtonOnClick(){
    console.log('nextButtonOnClick');
    // this.familyAndAddress.onNext(1);
    // console.log(this.siblings);
  }
  prevButtonOnClick(){
    console.log('prevButtonOnClick');
    this.familyAndAddress.onNext(1);
  }
}
