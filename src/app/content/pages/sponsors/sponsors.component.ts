import { UtilsService } from './../../../services/utils.service';
import { SponsorsService } from './../../../services/sponsors.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { SponsorsForm } from './../../form/sponsors-form';
import { RftSubDistrict } from './../../models/rft-sub-district';
import { RftDistrict } from './../../models/rft-district';
import { RftProvince } from './../../models/rft-province';
import { SmSponsors } from './../../models/sm-sponsors';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css', '../pages.component.css']
})
export class SponsorsComponent implements OnInit {

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];

  //insert
  sponsorsForm: SponsorsForm = new SponsorsForm();
  sponsorsFormGroup: FormGroup;

  //search
  sponsorsCriteriaForm: SponsorsForm = new SponsorsForm();
  //for datatable
  sponsorsFormList: SponsorsForm[] = [];
  selectSponsors: SponsorsForm = new SponsorsForm();

  //autocomplete
  rftProvinceList: RftProvince[] = [];
  rftProvinces: RftProvince[] = [];
  rftProvince: RftProvince = new RftProvince();

  rftDistrictList: RftDistrict[] = [];
  rftDistricts: RftDistrict[] = [];
  rftDistrict: RftDistrict = new RftDistrict();

  rftSubDistrictList: RftSubDistrict[] = [];
  rftSubDistricts: RftSubDistrict[] = [];
  rftSubDistrict: RftSubDistrict = new RftSubDistrict();

  //dropdown
  statusList: SelectItem[];

  image: any;

  smSponsorsList: SmSponsors[] = [];
  smSponsors: SmSponsors = new SmSponsors();


  constructor(private sponsorsService: SponsorsService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.initEditData();
    this.initSearchData();
    this.image = '../../../../assets/images/empty_profile.png';
    this.sponsorsFormList = [];
    this.getProvinceList();
    this.getDistrictList();
    this.getSubDistrictList();
    //autocomplete
    this.smSponsors = new SmSponsors();
    this.getStatusList();

  }

  initEditData() {
    this.sponsorsForm = new SponsorsForm();
    this.sponsorsForm.smSponsors.active_flag = 'Y';
    this.sponsorsForm.smSponsors.create_user = this.getUser();
    this.sponsorsForm.smSponsors.update_user = this.getUser();

    this.validatorEditForm();
  }

  getUser() {
    return '';
  }

  validatorEditForm() {
    this.sponsorsFormGroup = new FormGroup({
      'sponsors_ref': new FormControl(this.sponsorsForm.smSponsors.sponsors_ref),
      'sponsors_name': new FormControl(this.sponsorsForm.smSponsors.sponsors_name, Validators.compose([Validators.required, Validators.maxLength(50)])),
      'active_flag': new FormControl(this.sponsorsForm.smSponsors.active_flag, Validators.required),
      'address': new FormControl(this.sponsorsForm.smSponsors.address, Validators.required),
      'province': new FormControl(this.sponsorsForm.smSponsors.province, Validators.required),
      'district': new FormControl(this.sponsorsForm.smSponsors.district, Validators.required),
      'sub_district': new FormControl(this.sponsorsForm.smSponsors.sub_district, Validators.required),
      'postcode': new FormControl(this.sponsorsForm.smSponsors.postcode, Validators.required),
      'phone_no': new FormControl(this.sponsorsForm.smSponsors.phone_no, Validators.required),
      'email': new FormControl(this.sponsorsForm.smSponsors.email, Validators.required),
      'website': new FormControl(this.sponsorsForm.smSponsors.website, Validators.required),
      'create_user': new FormControl(this.sponsorsForm.smSponsors.create_user, Validators.required),
      'update_user': new FormControl(this.sponsorsForm.smSponsors.update_user, Validators.required)
    });

    if (this.mode == 'I') {
      this.sponsorsFormGroup.controls['active_flag'].disable();
    } else if (this.mode == 'U') {
      this.sponsorsFormGroup.controls['active_flag'].enable();
    }
  }

  initSearchData() {
    this.sponsorsCriteriaForm = new SponsorsForm();
    this.selectSponsors = new SponsorsForm();
    this.sponsorsFormList = [];
  }

  onSubmit() {
    console.log(this.sponsorsFormGroup);
    console.log('onSubmit mode ' + this.mode)
    if (this.mode == 'I') {
      this.onAddSponsors();
    } else if (this.mode == 'U') {
      this.onUpdateSponsors();
    }
  }

  onAddSponsors() {
    const value = this.sponsorsFormGroup.value;
    value.active_flag = 'Y';
    value.province = '1';
    value.district = '1';
    value.sub_district = '1'
    value.postcode = '57100'
    value.sponsors_ref = this.smSponsors.sponsors_ref;
    value.create_user = 'Anda';
    value.update_user = 'Anda';
    console.log(this.sponsorsFormGroup.value);

    // this.sponsorsService.addSponsors(value)
    // .subscribe(
    //   (res: Response) => {
    //     let sponsors_ref = res.json().sponsors_ref;
    //     console.log(res.json());
    //     console.log(res.json().sponsors_ref);
    //     console.log(res.statusText);

    //     this.sponsorsFormGroup.reset();

    //     this.initEditData();

    //     this.showSuccess('บันทึกข้อมูลผู้ให้ทุนการศึกษาเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + sponsors_ref);

    //   },
    //   (error) => {
    //     console.log(error);
    //     let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //     if(error.status == 409) {
    //       message = 'มีการใช้รหัสผู้ให้ทุนการศึกษานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //     }
    //     this.showError(message);
    //     return;
    //   }
    // );

  }

  onSearch() {
    this.sponsorsFormList = [];
    console.log(this.sponsorsCriteriaForm);
    this.searchSponsors();
  }

  searchSponsors() {
    let resultList: SponsorsForm[] = [];


    this.sponsorsService.searchSponsors(this.sponsorsCriteriaForm)
      .subscribe(
      result => {
        this.sponsorsFormList = result;
      },
      (error) => {
        console.log(error);
        this.showError(error);
      }
      );

  }

  onRowSelect(event) {
    console.log(this.selectSponsors);
    console.log(event.data);
    this.mode = 'U';
    this.sponsorsForm = new SponsorsForm();
    this.sponsorsForm = this.selectSponsors;
    this.sponsorsForm.smSponsors.create_user = this.getUser();
    this.sponsorsForm.smSponsors.update_user = this.getUser();
    this.validatorEditForm();
    console.log(this.sponsorsForm.smSponsors);
    this.smSponsors = new SmSponsors();
    this.smSponsors = this.sponsorsForm.smSponsors;
    console.log(this.smSponsors);
    console.log(this.mode);
  }

  onUpdateSponsors() {
    console.log(this.sponsorsFormGroup.value);
    const value = this.sponsorsFormGroup.value;
    console.log(this.smSponsors.sponsors_ref);
    value.sponsors_ref = this.smSponsors.sponsors_ref;
    // this.sponsorsService.updateSponsors(value, this.sponsorsForm.smSponsors.sponsors_ref)
    // .subscribe(
    //   (res: Response) => {
    //     let sponsors_ref = res.json().sponsors_ref;
    //     console.log(res.json());
    //     console.log(res.json().sponsors_ref);
    //     console.log(res.statusText);

    //     this.sponsorsFormGroup.reset()

    //     this.initEditData();

    //     this.showSuccess('แก้ไขข้อมูลผู้ให้ทุนการศึกษาเรียบร้อยแล้ว');

    //   },
    //   (error) =>{
    //     console.log(error);
    //     let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //     if(error.status == 409) {
    //       message = 'มีการใช้รหัสผู้ให้ทุนการศึกษานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //     }
    //     this.showError(message);
    //     return;
    //   }
    // );
  }

  //changePage
  onPageSearch() {
    this.mode = 'S';
    this.initSearchData();
  }

  onPageInsert() {
    this.mode = 'I';
    this.initEditData();
  }

  onResetEdit() {
    console.log(this.mode);
    if (this.mode == 'I') {
      this.initEditData();
    } else if (this.mode == 'U') {
      this.sponsorsForm = new SponsorsForm();
      this.sponsorsForm = this.selectSponsors;
      this.smSponsors = new SmSponsors();
      console.log(this.sponsorsForm.smSponsors);
      this.smSponsors = this.sponsorsForm.smSponsors;
      console.log(this.smSponsors);
      this.validatorEditForm();
    }
  }

  onResetSearch() {
    this.initSearchData();
  }


  //dropdown
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

  //autocomplete
  // Autocomplete Method // On key wording
  autocompleteMethodProvince(event) {
    let query = event.query;
    this.rftProvinces = [];
    for (let obj of this.rftProvinceList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftProvinces.push(obj);
      }
    }
  }

  autocompleteMethodDistrict(event) {
    let query = event.query;
    this.rftDistricts = [];
    for (let obj of this.rftDistrictList) {
      // Filter By string event
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftDistricts.push(obj);
      }
    }
  }

  autocompleteMethodSubDistrict(event) {
    let query = event.query;
    this.rftSubDistricts = [];
    for (let obj of this.rftSubDistrictList) {
      // Filter By string event
      if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftSubDistricts.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleSponsorsClick() {
    this.smSponsorsList = [];
    //mimic remote call
    setTimeout(() => {
      this.smSponsorsList = this.getSponsorsList();
    }, 100)
  }

  handleProvinceClick() {
    this.rftProvinces = [];
    //mimic remote call
    setTimeout(() => {
      this.rftProvinces = this.rftProvinceList;
    }, 100)
  }
  handleDistrictClick() {
    this.rftDistricts = [];
    //mimic remote call
    setTimeout(() => {
      this.rftDistricts = this.rftDistrictList;
    }, 100)
  }
  handleSubDistrictClick() {
    this.rftSubDistricts = [];
    //mimic remote call
    setTimeout(() => {
      this.rftSubDistricts = this.rftSubDistrictList;
    }, 100)
  }


  getSponsorsList(): SmSponsors[] {
    let results = []
    this.sponsorsService.getSponsors()
      .subscribe(
      result => {
        this.smSponsorsList = result;
        results = result;
      }
      );
    return results;
  }

  getProvinceList() {
    this.rftProvinces = []
    this.utilsService.getProvinces()
      .subscribe(
      (result) => {
        this.rftProvinceList = result;
      }
      );
  }

  getDistrictList() {
    this.rftDistrictList = [];
    this.utilsService.getDistricts()
      .subscribe(
      result => {
        this.rftDistrictList = result;
      }
      );
  }

  getSubDistrictList() {
    this.rftSubDistrictList = []
    this.utilsService.getSubDistricts()
      .subscribe(
      result => {
        console.log(result.length)
        this.rftSubDistrictList = result;
      }
      );
  }

  // message
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }

  onUpload(event) {

  }

}
