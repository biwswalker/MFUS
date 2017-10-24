import { AcUser } from './../../models/ac-user';
import { OfficerService } from './../../../services/officer.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectItem, Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { RftProvince } from '../../models/rft-province';
import { RftDistrict } from '../../models/rft-district';
import { RftSubDistrict } from '../../models/rft-sub-district';
import { OfficerForm } from '../../form/officer-form';
import { Response } from '@angular/http';
import { AcOfficer } from '../../models/ac-officer';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css', '../pages.component.css']
})
export class OfficerComponent implements OnInit {

  msgs: Message[];

  selectedOfficer: OfficerForm;
  officerEditForm: OfficerForm;
  officerCriteriaForm: OfficerForm;
  officerFormGroup: FormGroup;
  formList: OfficerForm[] = [];

  mode = 'S'; // I-insert, U-update, S-search

  //image
  image: any;
  img_name: string;
  img_type: string;

  // Dropdown List
  statusList: SelectItem[];
  titleList: SelectItem[];

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

  submitBtn:string;

  fileList: FileList;
  binaryString: string;
  file: File;

  manage_status: boolean;

  constructor(private officerService: OfficerService,
              private utilService: UtilsService,
              private userService: UserService) { }

  ngOnInit() {
    // Get List
    this.getStatusList();
    this.getTitleList();
    this.initEditData();
    this.getProvince();
    this.getDistrict();
    this.getSubDistrict();
    this.initSearchData();
  }

  initEditData() {
    this.officerEditForm = new OfficerForm();
    this.provinceObject = new RftProvince();
    this.districtObject = new RftDistrict();
    this.subDistrictObject = new RftSubDistrict();
    this.officerEditForm.acOfficer.active_flag = 'Y';
    this.officerEditForm.acOfficer.create_user = 'phai';
    this.officerEditForm.acOfficer.update_user = 'phai';
    this.officerEditForm.acOfficer.gender = 'M';
    this.officerEditForm.acOfficer.title_ref = '';
    this.image = './assets/images/empty_profile.png';
    this.postcode = this.officerEditForm.rftDistrict.postcode;
    this.validatorEditForm();
    this.submitBtn = 'สร้าง';
  }

  initSearchData() {
    this.officerCriteriaForm = new OfficerForm();
  }

  validatorEditForm() {
    this.officerFormGroup = new FormGroup({
      //OfficerForm-----------------------------------------------------------------------------------
      'officer_code': new FormControl(this.officerEditForm.acOfficer.officer_code,
        Validators.compose([Validators.required])),
      'active_flag': new FormControl(this.officerEditForm.acOfficer.active_flag,
        Validators.compose([Validators.required])),
      'gender': new FormControl(this.officerEditForm.acOfficer.gender),
      'title_ref': new FormControl(this.officerEditForm.acOfficer.title_ref,
        Validators.compose([Validators.required])),
      'personal_id': new FormControl(this.officerEditForm.acOfficer.personal_id,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'first_name': new FormControl(this.officerEditForm.acOfficer.first_name),
      'last_name': new FormControl(this.officerEditForm.acOfficer.last_name),
      'address': new FormControl(this.officerEditForm.acOfficer.address),
      'phone_no': new FormControl(this.officerEditForm.acOfficer.phone_no,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'email': new FormControl(this.officerEditForm.acOfficer.email),
      'profile_image': new FormControl(this.image)
    });


    if(this.mode == 'I') {
      this.officerFormGroup.controls['active_flag'].disable();
    }else if (this.mode == 'U') {
      this.officerFormGroup.controls['active_flag'].enable();
      this.officerFormGroup.controls['officer_code'].disable();
      this.officerFormGroup.controls['personal_id'].disable();

    }
  }

  // Make Data List
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: 'ไม่ระบุ', value: '' });
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

  //Begin Province Autocomplete Method // On key wording
  autocompleteProvince(event) {
    let query = event.query;
    this.provinceList = [];
    this.officerEditForm.rftDistrict = new RftDistrict();
    this.officerEditForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
        if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.provinceList.push(obj);
        }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickProvince() {
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
          this.provinceList.push(obj);

    }
    setTimeout(() => {
      this.provinceList = this.listProvince;
      this.districtList = [];
      this.subDistrictList = [];
    }, 100)
  }

  getProvince() {
    let listProvince = [];
    this.utilService.getProvinces()
      .subscribe((res: RftProvince[]) => {
        this.listProvince.push(...res);
      }
    );
  }
//End Autocomplete Province------------------------------------------------------------------------------------

  //Begin District Autocomplete Method // On key wording
  autocompleteDistrict(event) {
    let query = event.query;
    this.districtList = [];
    this.officerEditForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      // Filter By string event
      if(this.officerEditForm.rftProvince.province_ref == obj.province_ref) {
        if (obj.district_name_t.indexOf(query) == 0) {
          this.districtList.push(obj);
        }
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickDistrict() {
    //mimic remote call
    setTimeout(() => {
      this.districtList = [];
      let objList: RftDistrict[] = this.listDistrict;
      for (let obj of objList) {
        if(this.officerEditForm.rftProvince.province_ref == obj.province_ref) {
            this.districtList.push(obj);
        }
      }
    }, 100)
  }

  getDistrict() {
    let listDistrict = [];
    this.utilService.getDistricts()
      .subscribe((res: RftDistrict[]) => {
        this.listDistrict.push(...res);
      }
    );
  }
  //End Autocomplete District------------------------------------------------------------------------------------

   // SubDistrict Autocomplete Method // On key wording
   autocompleteSubDistrict(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[] = this.listSubDistrict;
    for (let obj of objList) {
      // Filter By string event
      if(obj.province_ref == this.officerEditForm.rftProvince.province_ref) {
        if(obj.district_ref == this.officerEditForm.rftDistrict.district_ref) {
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
           this.subDistrictList.push(obj);
          }
        }
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickSubDistrict() {
    //mimic remote call
    setTimeout(() => {
      this.subDistrictList = [];
      let objList: RftSubDistrict[] = this.listSubDistrict;
      for (let obj of objList) {
        // Filter By string event
        if(obj.province_ref == this.officerEditForm.rftProvince.province_ref) {
          if(obj.district_ref == this.officerEditForm.rftDistrict.district_ref) {
             this.subDistrictList.push(obj);
          }
        }
      }
    }, 100)
  }

  getSubDistrict() {
    let listSubDistrict = [];
    this.utilService.getSubDistricts()
      .subscribe((res: RftSubDistrict[]) => {
        this.listSubDistrict.push(...res);
      }
    );
  }
  //End Autocomplete Province------------------------------------------------------------------------------------


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
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  onInsertPage() {
    this.mode = 'I';
    this.initEditData();
  }

  onSubmit() {
    console.log('Begin onSubmit');
      if (this.mode === 'I') {
          this.addAcOfficer();
          this.addAcUser();
        } else if (this.mode === 'U') {
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
    value.active_flag = this.getStatus(this.officerEditForm.acOfficer.active_flag);
    value.manage_officer_flag = this.manage_status;
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
    const value = this.officerFormGroup.value;
    value.user_id = this.officerEditForm.acOfficer.personal_id;
    value.password = this.officerEditForm.acOfficer.personal_id;
    value.user_role = '2';
    value.create_user = 'phai';
    value.update_user = 'phai';
    this.userService.addUser(value)
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
    this.officerEditForm.rftProvince = this.getSelectedProvince(Number(this.officerEditForm.acOfficer.province));
    this.officerEditForm.rftDistrict = this.getSelectedDistrict(Number(this.officerEditForm.acOfficer.district));
    this.officerEditForm.rftSubDistrict = this.getSelectedSubDistrict(Number(this.officerEditForm.acOfficer.sub_district));
    this.image = this.officerEditForm.acOfficer.profile_image;
    this.img_name = this.officerEditForm.acOfficer.profile_name;
    this.img_type = this.officerEditForm.acOfficer.profile_type
    this.postcode = this.officerEditForm.rftDistrict.postcode;
    this.manage_status = this.getManageStatus(this.officerEditForm.acOfficer.manage_officer_flag);
    this.submitBtn = 'แก้ไข';
    this.validatorEditForm();
  }

  updateAcOfficer() {
    const value = this.officerFormGroup.value;
    value.officer_ref = this.officerEditForm.acOfficer.officer_ref;
    value.profile_image = this.image;
    value.profile_name = this.officerEditForm.acOfficer.personal_id;
    value.profile_type = this.img_type;
    value.manage_officer_flag = this.getStatus(this.manage_status);
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

  getSelectedProvince(code: number) {
    this.provinceObject = new RftProvince();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      // Filter By string event
        if (obj.province_ref == code) {
          this.provinceObject = obj;
          return this.provinceObject;
        }
    }
  }

  getSelectedDistrict(code: number) {
    this.districtObject = new RftDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      // Filter By string event
        if (obj.district_ref == code) {
          this.districtObject = obj;
          return this.districtObject;
        }
    }
  }

  getSelectedSubDistrict(code: number) {
    this.subDistrictObject = new RftSubDistrict();
    let objList: RftSubDistrict[];
    objList = this.listSubDistrict;
    for (let obj of objList) {
      // Filter By string event
        if (obj.sub_district_ref == code) {
          this.subDistrictObject = obj;
          return this.subDistrictObject;
        }
    }
  }


  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }

  getManageStatus(value: any) {
    switch(value) {
      case '2': { return true; };
      case '1': { return false; };
    }
  }

  getStatus(value) {
    switch(value) {
    case true: { return '2'; };
    case false: { return '1'; };
    }
  }
}
