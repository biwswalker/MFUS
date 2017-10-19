
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
    this.officerEditForm.acOfficer.postcode = this.subDistrictObject.postcode;
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

<<<<<<< HEAD
  onInsertPage() {
    this.mode = 'I';
    this.initEditData();
  }

  onSubmit() {
    console.log('Begin onSubmit');
      if (this.mode === 'I') {
        console.log('Begin Insert');
          this.addAcOfficer();
          this.addAcUser();
        } else if (this.mode === 'U') {
          console.log('Begin Update');
          this.updateAcOfficer();
      }
  }

  addAcOfficer() {
    const value = this.officerFormGroup.value;
    value.profile_image = this.image;
    value.profile_name = this.officerEditForm.acOfficer.personal_id;
    value.profile_type = this.file.type;
    value.province = this.officerEditForm.rftProvince.province_code;
    value.district = this.officerEditForm.rftDistrict.district_code;
    value.sub_district = this.officerEditForm.rftSubDistrict.sub_district_code;
    value.create_user = 'phai';
    value.update_user = 'phai';
    value.active_flag = this.officerEditForm.acOfficer.active_flag;
    console.log('officerForm : ', value);

    this.officerService.addOfficer(value)
    .subscribe(
      (res: Response) => {
        const officer_ref = res.json().officer_ref;

        console.log(res.statusText);
        this.officerFormGroup.reset();

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลเจ้าหน้าที่เรียบร้อยแล้ว รหัสอ้างอิงคือ ' + officer_ref);

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status === 409) {
          message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
  }

  addAcUser() {
    console.log('addAcUser');
    const value = this.officerFormGroup.value;
    value.user_id = this.officerEditForm.acOfficer.personal_id;
    value.password = this.officerEditForm.acOfficer.personal_id;
    value.user_role = '2';
    value.manage_officer_flag = this.officerEditForm.acOfficer.manage_officer_flag;
    value.create_user = 'phai';
    value.update_user = 'phai';
    console.log('userForm : ', value);

    this.userService.addUser(value)
    .subscribe(
      (res: Response) => {
        const officer_ref = res.json().officer_ref;

        console.log(res.statusText);
        this.officerFormGroup.reset();

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลข่าวสารเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + officer_ref);

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status === 409) {
          message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
  }

  onPageSearch() {
    this.formList = [];
    console.log('Mode Search');
    this.mode = 'S';
    this.initSearchData();
  }

  resetSearchButtonOnClick() {
    this.officerCriteriaForm = new OfficerForm();
    this.formList = [];
  }

  onSearch() {
    console.log('Begin OnSearch');
    const formList = [];
    this.officerService.searchOfficer(this.officerCriteriaForm).subscribe(
      result => {
        this.formList = result;
        console.log('officerFormList: ', this.formList);
      },
      (error) => {
        console.log(error);
        this.showError(error);
      }
      );
  }

  onRowSelect(event) {
    this.mode = 'U';
    this.officerEditForm = new OfficerForm();
    this.officerEditForm = event.data;
    this.officerEditForm.rftProvince = this.getSelectedProvince(this.officerEditForm.acOfficer.province);
    this.officerEditForm.rftDistrict = this.getSelectedDistrict(this.officerEditForm.acOfficer.district);
    this.officerEditForm.rftSubDistrict = this.getSelectedSubDistrict(this.officerEditForm.acOfficer.sub_district);
    this.image = this.officerEditForm.acOfficer.profile_image;

    console.log('form: ', this.officerEditForm);

    this.validatorEditForm();
  }

  updateAcOfficer() {
    console.log('this.offierFormGroup: ', this.officerFormGroup.value);
    const value = this.officerFormGroup.value;
    value.officer_ref = this.officerEditForm.acOfficer.officer_ref;
    value.profile_image = this.image;
    value.profile_name = this.officerEditForm.acOfficer.personal_id;
    console.log('form.image.type: ', this.officerEditForm.acOfficer.profile_type);
    console.log('file.type: ',this.file.type);
    console.log('image.type: ', this.file.type);
    if(this.file.type == null) {
      value.profile_type = this.officerEditForm.acOfficer.profile_type;
    }else {
      value.profile_type = this.file.type;
    }
    console.log('ref: ', this.officerEditForm.acOfficer.officer_ref);
    this.officerService.updateOfficer(value, this.officerEditForm.acOfficer.officer_ref)
    .subscribe(
      (res: Response) => {
        let officer_ref = res.json().officer_ref;
        console.log(res.json());
        console.log(res.json().officer_ref);
        console.log(res.statusText);

        this.officerFormGroup.reset();

        this.onPageSearch();

        this.showSuccess('แก้ไขข้อมูลเจ้าหน้าที่เรียบร้อยแล้ว');

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสเจ้าหน้าที่นี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
  }

  getSelectedProvince(province_code: string) {
    this.provinceObject = new RftProvince();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
        if (obj.province_code == province_code) {
          this.provinceObject = obj;
          return this.provinceObject;
        }
    }
  }

  getSelectedDistrict(code: string) {
    this.districtObject = new RftDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      // Filter By string event
        if (obj.district_code == code) {
          this.districtObject = obj;
          return this.districtObject;
        }
    }
  }

  getSelectedSubDistrict(code: string) {
    this.subDistrictObject = new RftSubDistrict();
    let objList: RftSubDistrict[];
    objList = this.listSubDistrict;
    for (let obj of objList) {
      // Filter By string event
        if (obj.sub_district_code == code) {
          this.subDistrictObject = obj;
          return this.subDistrictObject;
        }
    }
  }
=======
>>>>>>> 53d0f32ffe470a8346a206da270b624f1a318ebc


}
