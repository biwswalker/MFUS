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
  provinceObject: RftProvince;

  rftDistrictList: RftDistrict[] = [];
  rftDistricts: RftDistrict[] = [];
  rftDistrict: RftDistrict = new RftDistrict();
  districtObject: RftDistrict;

  rftSubDistrictList: RftSubDistrict[] = [];
  rftSubDistricts: RftSubDistrict[] = [];
  rftSubDistrict: RftSubDistrict = new RftSubDistrict();
  subDistrictObject: RftSubDistrict;

  postcode: string;

  //dropdown
        // StatusList: SelectItem[];
  dropdownList: SelectItem[];
  dropdownValue: string;

  // picture
  image: any = './assets/images/empty_profile.png';

  fileList: FileList;
  binaryString: string;
  file: File;

  imagePath: any;

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
    // this.getStatusList();
    this.getAutocompleteList();
    this.dropdownValue = 'Y';

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
      'update_user': new FormControl(this.sponsorsForm.smSponsors.update_user, Validators.required),
      'profile_image': new FormControl(this.sponsorsForm.smSponsors.profile_image)
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
    if (this.mode == 'I') {
      this.onAddSponsors();
    } else if (this.mode == 'U') {
      this.onUpdateSponsors();
    }
  }

  onAddSponsors() {
    const value = this.sponsorsFormGroup.value;
    value.active_flag = 'Y';
    value.province = this.rftProvince.province_ref;
    value.district = this.rftDistrict.district_ref;
    value.sub_district = this.rftSubDistrict.sub_district_ref;
    value.sponsors_ref = this.smSponsors.sponsors_ref;
    value.create_user = 'Anda';
    value.update_user = 'Anda';
    value.profile_image = this.imagePath;
    value.profile_name = this.file.name;
    value.profile_type = this.file.type;

    this.sponsorsService.addSponsors(value)
    .subscribe(
      (res: Response) => {
        let sponsors_ref = res.json().sponsors_ref;

        this.sponsorsFormGroup.reset();

        this.initEditData();
        this.image = null;
        this.imagePath = null;
        this.showSuccess('บันทึกข้อมูลผู้ให้ทุนการศึกษาเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + sponsors_ref);

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสผู้ให้ทุนการศึกษานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );

  }

  onSearch() {
    this.sponsorsFormList = [];
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
    this.mode = 'U';
    this.sponsorsForm = new SponsorsForm();
    this.sponsorsForm = this.selectSponsors;
    this.sponsorsForm.smSponsors.create_user = this.getUser();
    this.sponsorsForm.smSponsors.update_user = this.getUser();
    this.validatorEditForm();
    this.smSponsors = new SmSponsors();
    this.smSponsors = this.sponsorsForm.smSponsors;
    this.imagePath = this.sponsorsForm.smSponsors.profile_image;
    this.image = 'data:' +  this.sponsorsForm.smSponsors.profile_type + ';base64,' + this.imagePath;

    // Find the models
    // this.rftProvince;
    // this.rftDistrict;
    // this.rftSubDistrict;
  }

  onUpdateSponsors() {
    const value = this.sponsorsFormGroup.value;
    value.sponsors_ref = this.smSponsors.sponsors_ref;

    value.district = this.rftDistrict.district_ref;
    value.province = this.rftProvince.province_ref;
    value.sub_district = this.rftSubDistrict.sub_district_ref;
    value.profile_image = this.imagePath;
    value.profile_name = this.file.name;
    value.profile_type = this.file.type;

 //   value.active_flag = this.dropdownValue;

    this.sponsorsService.updateSponsors(value, this.sponsorsForm.smSponsors.sponsors_ref)
    .subscribe(
      (res: Response) => {
        let sponsors_ref = res.json().sponsors_ref;

        this.sponsorsFormGroup.reset()

        this.initEditData();

        this.showSuccess('แก้ไขข้อมูลผู้ให้ทุนการศึกษาเรียบร้อยแล้ว');

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสผู้ให้ทุนการศึกษานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
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
    if (this.mode == 'I') {
      this.initEditData();
    } else if (this.mode == 'U') {
      this.sponsorsForm = new SponsorsForm();
      this.sponsorsForm = this.selectSponsors;
      this.smSponsors = new SmSponsors();
      this.smSponsors = this.sponsorsForm.smSponsors;
      this.validatorEditForm();
    }
  }

  onResetSearch() {
    this.initSearchData();
  }

  getAutocompleteList() {
    this.dropdownList = [];
    this.dropdownList.push({ label: 'ใช้งาน', value: 'Y' });
    this.dropdownList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }


  //autocomplete
  // Autocomplete Method --- On key wording
  autocompleteMethodProvince(event) {
    let query = event.query;
    this.rftProvinces = [];
    this.sponsorsForm.rftDistrict = new RftDistrict();
    this.sponsorsForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.rftProvinceList;
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftProvinces.push(obj);
      }
    }
  }

  getProvince() {
    this.rftProvinceList = [];
    this.rftProvinceList = this.utilsService.getProvincesList();
  }

  //------ autocomplete Province dropdown -----
 handleCompleteClickProvince() {
  let objList: RftProvince[];
  this.sponsorsForm.rftDistrict = new RftDistrict();
  this.sponsorsForm.rftSubDistrict = new RftSubDistrict();
  objList = this.rftProvinceList;
  for (let obj of objList) {
    this.rftProvinces.push(obj);
    }
    setTimeout(() => {
      this.rftProvinces = this.rftProvinceList;
      this.rftDistricts = [];
      this.rftSubDistricts = [];
    }, 100)
  }
  //------------ end province autocomplete ----------

  // District auto -- on key wording
  autocompleteMethodDistrict(event) {
    let query = event.query;
    this.rftDistricts = [];
    this.sponsorsForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.rftDistrictList;
    for (let obj of objList) {
      // Filter By string event
      console.log('Begin for')
      if(obj.province_ref == this.rftProvince.province_ref) {
        console.log('Begin check province');
        if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          console.log('Begin check district');
          this.rftDistricts.push(obj);
          }
        }
      }
      console.log(this.rftDistricts.length);
    }
    // district auto -- dropdown button
    handleDistrictClick() {
      //mimic remote call
      this.rftDistricts = [];
      console.log(this.rftDistrictList.length)
      setTimeout(() => {
        this.rftDistricts = [];
        this.sponsorsForm.rftSubDistrict = new RftSubDistrict();
        let objList: RftDistrict[] = this.rftDistrictList;
        this.rftDistricts = this.rftDistrictList;
      }, 100)
      console.log(this.rftDistricts.length)
     }

    // ------------ End district autocomplete ------------

    //------------ select -----------------
  selectProvince(event: SelectItem) {
    this.utilsService.getDistrictsByProvinceRef(this.sponsorsForm.rftProvince.province_ref)
    .subscribe((res: RftDistrict[]) => {
      this.rftDistrictList.push(...res);
      }
    );
    console.log(this.rftDistrictList.length);
  }

  selectDistrict(event: SelectItem) {
    this.utilsService.getSubDistrictsByDistrictRef(this.sponsorsForm.rftDistrict.district_ref)
    .subscribe((res: RftSubDistrict[]) => {
      this.rftSubDistrictList.push(...res);
      }
    );
    console.log(this.rftSubDistrictList.length);
  }

  selectSubDistrict(event: SelectItem) {
    this.postcode = this.rftDistrict.postcode;
  }
  //--------- End select ----------------

  // ------- subDistrict Auto -- on key wording -----
  autocompleteMethodSubDistrict(event) {
    let query = event.query;
    this.rftSubDistricts = [];
    let objList: RftSubDistrict[] = this.rftSubDistrictList;
    for (let obj of objList) {
      // Filter By string event
      if(obj.province_ref == this.rftProvince.province_ref) {
        if(obj.district_ref == this.rftDistrict.district_ref) {
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.rftSubDistricts.push(obj)
            }
          }
        }
      }
    }
  // On Click Autocomplete Dropdown Button
  handleSubDistrictClick(event) {
    //mimic remote call
    this.rftSubDistricts = [];
    setTimeout(() => {
      this.rftSubDistricts = this.rftSubDistrictList;
    }, 100)
    let query = event.query;
    this.rftSubDistricts = [];
    let objList: RftSubDistrict[] = this.rftSubDistrictList;
    for (let obj of objList) {
      // Filter By string event
      if(obj.province_ref == this.rftProvince.province_ref) {
        if(obj.district_ref == this.rftDistrict.district_ref) {
         {
            this.rftSubDistricts.push(obj)
  }
}
}
}
}

  // End Autocomplete ----------------------------------

  handleSponsorsClick() {
    this.smSponsorsList = [];
    setTimeout(() => {
      this.smSponsorsList = this.getSponsorsList();
    }, 100)
  }

   //--------- get Seleted ---------------
  getSelectedProvince(code: number) {
    this.provinceObject = new RftProvince();
    let objList: RftProvince[];
    objList = this.rftProvinceList;
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
    objList = this.rftDistrictList;
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
    objList = this.rftSubDistrictList;
    for (let obj of objList) {
      // Filter By string event
        if (obj.sub_district_ref == code) {
          this.subDistrictObject = obj;
          return this.subDistrictObject;
        }
    }
  }
  //--------- End get selected ----------

  // -------------------- List --------------------
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
        this.rftSubDistrictList = result;
      }
      );
  }

  // ---------------------- End List ------------------

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
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      } else {
        this.onDelete();
      }
    }
  }

  handleReaderLoaded(readerEvent) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    this.imagePath = btoa(this.binaryString);
  }

  onDelete() {
    this.image = './assets/images/empty_profile.png';
    this.fileList = null;
    this.binaryString = null;
    this.file = null;
  }

}
