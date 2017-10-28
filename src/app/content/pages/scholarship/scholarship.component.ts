import { SponsorsForm } from './../../form/sponsors-form';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { SponsorsService } from './../../../services/sponsors.service';
import { ScholarshipService } from './../../../services/scholarship.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScholarshipForm } from './../../form/scholarship-form';
import { SmSponsors } from './../../models/sm-sponsors';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';
import { SelectItem, Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';



@Component({

  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css', '../pages.component.css']
})
export class ScholarshipComponent implements OnInit {

  //primeng เช็คอิมพอทดีๆ
  //วาริเดเตอร์ เช็คinput
  //fromgroup ใช้รับจากหน้าจอเสอม  from เลยๆใช้ทำinit

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];

  //insert
  scholarshipForm: ScholarshipForm = new ScholarshipForm();
  scholarshipFormGroup: FormGroup;


  //autocomplete
  sponsorsList: SmSponsors[] = [];
  sponsors: SmSponsors = new SmSponsors();

  // Dropdown List
  statusList: SelectItem[];
  scholarshipType: SelectItem[];

  //for datatable
  scholarshipFormList: ScholarshipForm[] = [];
  selectScholarship: ScholarshipForm = new ScholarshipForm();
  sponsorsFormList: SponsorsForm[] = [];
  sponsorsScholarship: SponsorsForm = new SponsorsForm();

  //search
  scholarshipCriteriaForm: ScholarshipForm = new ScholarshipForm();
  sponsorsCriteriaForm: SponsorsForm = new SponsorsForm();

  //redirect
  redirectTime = "2500";

  constructor(private scholarshipService: ScholarshipService, private sponsorsService: SponsorsService, ) { }

  ngOnInit() {
    this.initEditData();
    this.initSearchData();

    //autocomplete
    this.sponsors = new SmSponsors();
    this.getStatusList();
    this.getScholarshipType();
  }

  validatorEditForm() {
    this.scholarshipFormGroup = new FormGroup({
      'scholarship_ref': new FormControl(this.scholarshipForm.smScholarship.scholarship_ref),

      'scholarship_name': new FormControl(this.scholarshipForm.smScholarship.scholarship_name,
        Validators.compose([Validators.required, Validators.maxLength(100)])),

      'scholarship_type': new FormControl(this.scholarshipForm.smScholarship.scholarship_type),

      'detail': new FormControl(this.scholarshipForm.smScholarship.detail),

      'unit': new FormControl(this.scholarshipForm.smScholarship.unit,
        Validators.compose([Validators.required, Validators.maxLength(10)])),

      'financial_aid': new FormControl(this.scholarshipForm.smScholarship.financial_aid,
        Validators.compose([Validators.required, Validators.maxLength(10)])),

      'active_flag': new FormControl(this.scholarshipForm.smScholarship.active_flag, Validators.required),

      'create_user': new FormControl(this.scholarshipForm.smScholarship.create_user),

      'update_user': new FormControl(this.scholarshipForm.smScholarship.update_user),

      'sponsors_ref': new FormControl(this.scholarshipForm.smScholarship.sponsors_ref, Validators.required)
    });

    if (this.mode == 'I') {
      this.scholarshipFormGroup.controls['active_flag'].disable();
    } else if (this.mode == 'U') {
      this.scholarshipFormGroup.controls['active_flag'].enable();
    }
  }

  onSubmit() {
    console.log(this.scholarshipFormGroup);
    console.log('onSubmit mode ' + this.mode)
    if (this.mode == 'I') {
      this.onAddScholarship();
    } else if (this.mode == 'U') {
      this.onUpdateScholarship();
    }
  }

  initEditData() {
    this.scholarshipForm = new ScholarshipForm();
    this.scholarshipForm.smScholarship.active_flag = 'Y';
    this.scholarshipForm.smScholarship.create_user = this.getUser();
    this.scholarshipForm.smScholarship.update_user = this.getUser();

    this.validatorEditForm();
  }

  getUser() {
    return 'knes';
  }

  onResetEdit() {
    console.log(this.mode);
    if (this.mode == 'I') {
      this.initEditData();
    } else if (this.mode == 'U') {
      this.scholarshipForm = new ScholarshipForm();
      this.scholarshipForm = this.selectScholarship;
      this.sponsors = new SmSponsors();
      console.log(this.scholarshipForm.smSponsors);
      this.sponsors = this.scholarshipForm.smSponsors;
      console.log(this.sponsors);
      this.validatorEditForm();
    }
  }

  onAddScholarship() {
    console.log(this.scholarshipFormGroup.value);
    const value = this.scholarshipFormGroup.value;

    value.active_flag = 'Y';
    value.sponsors_ref = this.sponsors.sponsors_ref;


    console.log(this.scholarshipFormGroup.value);

    this.scholarshipService.addScholarship(value)
      .subscribe(
      (res: Response) => {
        let scholarship_ref = res.json().scholarship_ref;
        console.log(res.json());
        console.log(res.json().scholarship_ref);
        console.log(res.statusText);

        this.scholarshipFormGroup.reset();

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + scholarship_ref);

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status == 409) {
          message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
      );
  }

  onUpdateScholarship() {
    console.log(this.scholarshipFormGroup.value);
    const value = this.scholarshipFormGroup.value;
    console.log(this.sponsors.sponsors_ref);
    value.sponsors_ref = this.sponsors.sponsors_ref;
    this.scholarshipService.updateScholarship(value, this.scholarshipForm.smScholarship.scholarship_ref)
      .subscribe(
      (res: Response) => {
        let sponsors_ref = res.json().sponsprs_ref;
        console.log(res.json());
        console.log(res.json().sponsprs_ref);
        console.log(res.statusText);

        this.scholarshipFormGroup.reset()

        this.initEditData();

        this.showSuccess('แก้ไขข้อมูลทุนการศึกษาเรียบร้อยแล้ว');

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status == 409) {
          message = 'มีการใช้รหัสทุนการศึกษานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
      );

  }

  onRowSelect(event) {
    console.log(this.selectScholarship);
    console.log(event.data);
    this.mode = 'U';
    this.scholarshipForm = new ScholarshipForm();
    this.scholarshipForm = this.selectScholarship;
    console.log(this.selectScholarship);
    this.scholarshipForm.smScholarship.create_user = this.getUser();
    this.scholarshipForm.smScholarship.update_user = this.getUser();
    this.validatorEditForm();
    console.log(this.scholarshipForm.smScholarship);
    this.sponsors = new SmSponsors();
    this.sponsors = this.scholarshipForm.smSponsors;
    console.log(this.sponsors);
    console.log(this.mode);
  }

  // //dropdown
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

  getScholarshipType() {
    this.scholarshipType = [];
    this.scholarshipType.push({ label: '', value: '' });
    this.scholarshipType.push({ label: 'Academic', value: '1' });
  }


  autocompleteMethod(event) {
    let query = event.query;
    this.sponsorsList = [];
    let objList: SmSponsors[] = this.getSponsorsList()
    for (let obj of objList) {
      // Filter By string event
      if (obj.sponsors_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.sponsorsList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClick() {
    this.sponsorsList = [];
    //mimic remote call
    setTimeout(() => {
      this.sponsorsList = this.getSponsorsList();
    }, 100)
  }

  getSponsorsList(): SmSponsors[] {

    if (this.mode !== 'U') {
      let results = []
      this.sponsorsService.getSponsors()
        .subscribe(
        result => {
          this.sponsorsList = result;
          results = result;
        }
        );
      return results;
    }
  }

  searchScholarship() {
    let resultList: ScholarshipForm[] = [];

    if (this.sponsors) {
      this.scholarshipCriteriaForm.smScholarship.sponsors_ref = this.sponsors.sponsors_ref
    }
    console.log(this.scholarshipCriteriaForm)
    this.scholarshipService.searchScholarship(this.scholarshipCriteriaForm)
      .subscribe(
      result => {
        this.scholarshipFormList = result;
      },
      (error) => {
        console.log(error);
        this.showError(error);
      }
      );
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

  initSearchData() {
    this.scholarshipCriteriaForm = new ScholarshipForm();
    this.selectScholarship = new ScholarshipForm();
    this.scholarshipFormList = [];
  }


  onSearch() {
    this.scholarshipFormList = [];
    this.sponsorsFormList = [];
    console.log(this.scholarshipCriteriaForm);
    console.log(this.sponsorsCriteriaForm);
    this.searchScholarship();
  }
  onResetSearch() {
    this.initSearchData();
  }

  //changPage
  onPageSearch() {
    this.mode = 'S';
    this.initSearchData();
  }

  //redirect
  // timedRedirect() {
  //   if (this.mode == 'U') {
  //     //setTimeout(this.onPageSearch(), this.redirectTime);
  // }
  // }


  onPageInsert() {
    this.mode = 'I';
    this.initEditData();
  }
  //message
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }

}

