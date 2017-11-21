import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectItem } from "primeng/primeng";
import { FamilyAndAddressForm } from "./../../../form/family-and-address-form";
import { UtilsService } from "./../../../../services/utils.service";
import { RftSubDistrict } from "./../../../models/rft-sub-district";
import { RftDistrict } from "./../../../models/rft-district";
import { RftProvince } from "./../../../models/rft-province";
import { FamilyAndAddressComponent } from "./../family-and-address.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: [
    "../family-and-address.component.css",
    "../../pages.component.css"
  ]
})
export class AddressComponent implements OnInit {
  thisForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  // Autocomplete Province
  listProvince: RftProvince[] = [];

  homeProvinceList: RftProvince[] = [];
  currentProvinceList: RftProvince[] = [];

  // Autocomplete District
  homeDistrictList: RftDistrict[] = [];
  homeListDistrict: RftDistrict[] = [];
  currentDistrictList: RftDistrict[] = [];
  currentListDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  homeSubDistrictList: RftSubDistrict[] = [];
  homeListSubDistrict: RftSubDistrict[] = [];
  currentSubDistrictList: RftSubDistrict[] = [];
  currentListSubDistrict: RftSubDistrict[] = [];

  homeProvince: RftProvince = new RftProvince();
  homeDistrict: RftDistrict = new RftDistrict();
  homeSubDistrict: RftSubDistrict = new RftSubDistrict();

  currentProvince: RftProvince = new RftProvince();
  currentDistrict: RftDistrict = new RftDistrict();
  currentSubDistrict: RftSubDistrict = new RftSubDistrict();

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  img_name: string;
  img_type: string;

  constructor(
    private utilsService: UtilsService,
    private familyAndAddress: FamilyAndAddressComponent
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.thisForm = new FamilyAndAddressForm();
    this.thisForm = this.familyAndAddress.getData();
    this.getProvince();
    this.setupImage();
  }

  setupImage(){
    console.log('setupImage');
    this.image = null;
    if(this.thisForm.acAddress.direction_image != '' || this.thisForm.acAddress.direction_image != undefined){
      this.binaryString = this.thisForm.acAddress.direction_image;
      this.image = 'data:' + this.thisForm.acAddress.direction_type + ';base64,' + btoa(this.binaryString);
    }
  }


  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilsService.getProvincesList();
  }

  autocompleteProvince(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.homeProvinceList = [];
    this.homeDistrict = new RftDistrict();
    this.homeSubDistrict = new RftSubDistrict();
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
    console.log("autocompleteDistrict");
    let query = event.query;
    this.homeDistrictList = [];
    this.homeSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.homeListDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (this.homeProvince.province_ref === obj.province_ref) {
        if (
          obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
          this.homeDistrictList.push(obj);
        }
      }
    }
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteSubDistrict: " + this.homeDistrict.district_ref);
    let query = event.query;
    this.homeSubDistrictList = [];
    let objList: RftSubDistrict[] = this.homeListSubDistrict;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_ref == this.homeProvince.province_ref) {
        if (obj.district_ref == this.homeDistrict.district_ref) {
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

  handleCompleteClickProvince(index: number) {
    console.log("handleCompleteClickProvince");
    if (index == 0) {
      this.homeProvinceList = [];

      setTimeout(() => {
        this.homeProvinceList = this.listProvince;
        this.homeDistrictList = [];
        this.homeSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      this.currentProvinceList = [];
      setTimeout(() => {
        this.currentProvinceList = this.listProvince;
        this.currentDistrictList = [];
        this.currentSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickDistrict(index: number) {
    console.log("handleCompleteClickDistrict");
    if (index == 0) {
      this.homeDistrictList = [];
      setTimeout(() => {
        this.homeDistrictList = this.homeListDistrict;
        this.homeSubDistrictList = [];
      }, 100);
    }
    if (index == 1) {
      this.currentDistrictList = [];
      setTimeout(() => {
        this.currentDistrictList = this.currentListDistrict;
        this.currentSubDistrictList = [];
      }, 100);
    }
  }

  handleCompleteClickSubDistrict(index: number) {
    console.log("handleCompleteClickSubDistrict");
    if (index == 0) {
      this.homeSubDistrictList = [];
      setTimeout(() => {
        this.homeSubDistrictList = this.homeListSubDistrict;
        console.log("index:0 ==> "+this.homeSubDistrictList.length);
      }, 100);
    }
    if (index == 1) {
      this.currentSubDistrictList = [];
      setTimeout(() => {
        this.currentSubDistrictList = this.currentListSubDistrict;
      }, 100);
    }
  }

  // Autocomplete Selected
  selectProvince(index: number) {
    console.log("selectProvince");
    if (index == 0) {
      // this.thisForm.homeProvince = new RftProvince();
      this.homeDistrict = new RftDistrict();
      this.homeSubDistrict = new RftSubDistrict();
      this.thisForm.acAddress.home_postcode = null;
      this.utilsService
        .getDistrictsByProvinceRef(this.homeProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.homeListDistrict = [];
          this.homeListDistrict.push(...res);
        });
    }
    if (index == 1) {
      this.currentDistrict = new RftDistrict();
      this.currentSubDistrict = new RftSubDistrict();
      this.thisForm.acAddress.current_postcode = null;
      this.utilsService
        .getDistrictsByProvinceRef(this.currentProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.currentListDistrict = [];
          this.currentListDistrict.push(...res);
        });
    }
  }

  selectDistrict(index: number) {
    console.log("selectDistrict");
    if (index == 0) {
      this.homeSubDistrictList = [];
      this.homeSubDistrict = new RftSubDistrict;
      this.thisForm.acAddress.home_postcode = null;
      this.utilsService
        .getSubDistrictsByDistrictRef(this.homeDistrict.district_ref)
        .subscribe((res: RftSubDistrict[]) => {
          this.homeListSubDistrict = [];
          this.homeListSubDistrict.push(...res);
          console.log("index:0 ==> "+this.homeListSubDistrict.length);
        });
    }
    if (index == 1) {
      this.currentSubDistrictList = [];
      this.currentSubDistrict = new RftSubDistrict;
      this.thisForm.acAddress.current_postcode = null;
      this.utilsService
        .getSubDistrictsByDistrictRef(this.currentDistrict.district_ref)
        .subscribe((res: RftSubDistrict[]) => {
          this.currentListSubDistrict = [];
          this.currentListSubDistrict.push(...res);
        });
    }
  }

  selectSubDistrict(index: number) {
    console.log("selectSubDistrict");
    if(index==0){
      this.thisForm.acAddress.home_postcode = this.homeSubDistrict.postcode;
    }
    if(index==1){
      this.thisForm.acAddress.current_postcode = this.currentSubDistrict.postcode;
    }
  }


  uploadDirection(event){
    console.log("uploadDirection");
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      } else {

      }
    }
  }

  handleReaderLoaded(readerEvent) {
    console.log("handleReaderLoaded");
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    // console.log(btoa(this.binaryString));
    this.img_name = this.file.name;
    this.img_type = this.file.type;

    this.thisForm.acAddress.direction_image = this.binaryString;
    this.thisForm.acAddress.direction_name = this.img_name;
    this.thisForm.acAddress.direction_type = this.img_type;
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }


  submitButtonOnClick() {
    console.log("nextButtonOnClick");
    // set home address
    console.log(this.thisForm.acAddress[0]);
    // set home address
    this.thisForm.acAddress.home_province = this.homeProvince.province_ref;
    this.thisForm.acAddress.home_district = this.homeDistrict.district_ref;
    this.thisForm.acAddress.home_sub_district = this.homeSubDistrict.sub_district_ref;

    // set home address
    this.thisForm.acAddress.current_province = this.currentProvince.province_ref;
    this.thisForm.acAddress.current_district = this.currentDistrict.district_ref;
    this.thisForm.acAddress.current_sub_district = this.currentSubDistrict.sub_district_ref;
    console.log(this.thisForm.acAddress[0].home_address);
    this.familyAndAddress.onSubmit(this.thisForm);
    // this.familyAndAddress.onNext(1);
    // console.log(this.siblings);
  }
  prevButtonOnClick() {
    console.log("prevButtonOnClick");
    this.familyAndAddress.onChangePanel(1, this.thisForm);
    this.thisForm = new FamilyAndAddressForm();
  }
}
