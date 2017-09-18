
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { RftProvince } from'../../models/rft-province';
import { RftDistrict } from'../../models/rft-district';
import { RftSubDistrict } from'../../models/rft-sub-district';

import { OfficerForm } from'../../form/officer-form';


@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css','../pages.component.css']
})
export class OfficerComponent implements OnInit {


officerEditForm: OfficerForm;
officerSearchForm: OfficerForm;
formList: OfficerForm[]=[];


image: any = './assets/images/empty_profile.png';

// Dropdown List
  statusList: SelectItem[];
  titleList: SelectItem[];

   // Autocomplete List
  provinceList: RftProvince[] = [];
  districtList: RftDistrict[] = [];
  subDistrictList: RftSubDistrict[] = [];


  fileList: FileList;
  binaryString: string;
  file: File;


  constructor() { }

  ngOnInit() {

  this.officerEditForm = new OfficerForm();
  this.officerSearchForm = new OfficerForm();
        // Get List
    this.getStatusList();
    this.getTitleList();
    this.officerEditForm.acOfficer.active_flag = 'Y';
    this.officerEditForm.acOfficer.gender ='M';
    this.officerEditForm.acOfficer.title_ref = '';
    this.officerSearchForm.acOfficer.active_flag = '';
  }

  // Make Data List
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

   getTitleList() {
    this.titleList = [];
    this.titleList.push({ label: '', value: '' });
    this.titleList.push({ label: 'นาย', value: 'Mr' });
    this.titleList.push({ label: 'นาง', value: 'Miss' });
    this.titleList.push({ label: 'นางสาว', value: 'Mrs' });
  }

    // Province Autocomplete Method // On key wording
  provinceMethod(event) {
    let query = event.query;
    this.provinceList = [];
    let objList: RftProvince[] = [];
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickProvince() {
    this.provinceList = [];
    //mimic remote call
    setTimeout(() => {
      this.provinceList = [];
    }, 100)
  }

    // District Autocomplete Method // On key wording
  districtMethod(event) {
    let query = event.query;
    this.districtList = [];
    let objList: RftDistrict[] = [];
    for (let obj of objList) {
      // Filter By string event
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.districtList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickDistrict() {
    this.districtList = [];
    //mimic remote call
    setTimeout(() => {
      this.districtList = [];
    }, 100)
  }

  // SubDistrict Autocomplete Method // On key wording
  subDistrictMethod(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[] = [];
    for (let obj of objList) {
      // Filter By string event
      if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.subDistrictList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickSubDistrict() {
    this.subDistrictList = [];
    //mimic remote call
    setTimeout(() => {
      this.subDistrictList = [];
    }, 100)
  }

onUpload(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
    }
  }

  handleReaderLoaded(readerEvent) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    // console.log(btoa(this.binaryString));
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }



}
