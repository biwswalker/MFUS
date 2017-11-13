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
   listProvince: RftProvince[] = [];

   homeProvinceList: RftProvince[] = [];
   homeProvinceObject: RftProvince;

   currentProvinceList: RftProvince[] = [];
   currentProvinceObject: RftProvince;


   // Autocomplete District
   homeDistrictList: RftDistrict[] = [];
   homeDistrictObject: RftDistrict;
   homeListDistrict: RftDistrict[] = [];

   currentDistrictList: RftDistrict[] = [];
   currentDistrictObject: RftDistrict;
   currentListDistrict: RftDistrict[] = [];

   // Autocomplete SubDistrict
   homeSubDistrictList: RftSubDistrict[] = [];
   homeSubDistrictObject: RftSubDistrict;
   homeListSubDistrict: RftSubDistrict[] = [];

   currentSubDistrictList: RftSubDistrict[] = [];
   currentSubDistrictObject: RftSubDistrict;
   currentListSubDistrict: RftSubDistrict[] = [];



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
    this.homeProvinceList = [];
    this.thisForm.homeDistrict = new RftDistrict();
    this.thisForm.homeSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.homeProvinceList.push(obj);
      }
    }
  }

  // Autocomplete filter
  autocompleteDistrict(event) {
    console.log('autocompleteDistrict');
    let query = event.query;
    this.homeDistrictList = [];
    this.thisForm.homeSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.homeListDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (this.thisForm.homeProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.homeDistrictList.push(obj);
        }
      }
    }
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteSubDistrict: " + this.thisForm.homeDistrict.district_ref
    );
    let query = event.query;
    this.homeSubDistrictList = [];
    let objList: RftSubDistrict[] = this.homeListSubDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_ref == this.thisForm.homeProvince.province_ref) {
        if (obj.district_ref == this.thisForm.homeDistrict.district_ref) {
          if (
            obj.sub_district_name_t
              .toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            this.homeSubDistrictList.push(obj);
          }
        }
      }
    }
  }

  handleCompleteClickProvince() {
    console.log('handleCompleteClickProvince');
    this.homeProvinceList = [];
    this.thisForm.homeProvince = new RftProvince();
    this.thisForm.homeDistrict = new RftDistrict();
    this.thisForm.homeSubDistrict = new RftSubDistrict();
    setTimeout(() => {
      this.homeProvinceList = this.listProvince;
      this.homeDistrictList = [];
      this.homeSubDistrictList = [];
    }, 100);

  }

  handleCompleteClickDistrict() {
    console.log('handleCompleteClickDistrict');

    this.homeDistrictList = [];
    this.thisForm.homeDistrict = new RftDistrict();
    this.thisForm.homeSubDistrict = new RftSubDistrict();
    setTimeout(() => {
      this.homeDistrictList = this.homeListDistrict;
      this.homeSubDistrictList = [];
    }, 100);
  }

  handleCompleteClickSubDistrict() {
    console.log('handleCompleteClickSubDistrict');
    this.homeSubDistrictList = [];
    this.thisForm.homeSubDistrict = new RftSubDistrict();

    setTimeout(() => {
      this.homeSubDistrictList = this.homeListSubDistrict;
    }, 100);
  }

   // Autocomplete Selected
   selectProvince(event: SelectItem) {
    console.log('selectProvince');
    this.homeDistrictList = [];
    this.homeSubDistrictList = [];

    this.utilsService
      .getDistrictsByProvinceRef(this.thisForm.homeProvince.province_ref)
      .subscribe((res: RftDistrict[]) => {
        this.homeListDistrict = [];
        this.homeListDistrict.push(...res);
      });
  }

  selectDistrict(event: SelectItem) {
    console.log('selectDistrict');
    console.log(this.thisForm.homeDistrict);

    this.utilsService
      .getSubDistrictsByDistrictRef(this.thisForm.homeDistrict.district_ref)
      .subscribe((res: RftSubDistrict[]) => {
        this.homeListSubDistrict = [];
        this.homeListSubDistrict.push(...res);

      });
  }

  selectSubDistrict(event: SelectItem) {
    console.log('selectSubDistrict');
  }

  submitButtonOnClick(){
    console.log('nextButtonOnClick');
    // this.familyAndAddress.onNext(1);
    // console.log(this.siblings);
  }
  prevButtonOnClick(){
    console.log('prevButtonOnClick');
    this.familyAndAddress.onChangePanel(1, this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
}
