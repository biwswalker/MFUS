import { ApplyScholarshipComponent } from './../../apply-scholarship.component';
import { RftSubDistrict } from './../../../../models/rft-sub-district';
import { RftDistrict } from './../../../../models/rft-district';
import { RftProvince } from './../../../../models/rft-province';

import { UtilsService } from '../../../../../services/utils.service';
import { FamilyAndAddressForm } from '../../../../form/family-and-address-form';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FamilyInformationService } from '../../../../../services/family-information.service';

@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.css', '../../../pages.component.css']
})
export class FamilyInformationComponent implements OnInit {

  mode: string;

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

  constructor(private utilService: UtilsService,
              private familyInformationService: FamilyInformationService,
              private applysholarshipcomponent: ApplyScholarshipComponent ) { }

  ngOnInit() {
    console.log('Begin family information')
    this.mode = 'S';
    this.initBirthMonth();
    this.getProvince();
    this.getFamilyInformation();
  }

  getFamilyInformation() {
    let ref = this.applysholarshipcomponent.applyScholarshipForm.acStudent.student_ref;
    this.familyInformationService.getFamilyInformationFromRef(ref);
  }

  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilService.getProvincesList();
  }

  initBirthMonth() {
    this.dadDropdownMonths = this.utilService.getDropdownMonthShort();
    this.dadDropdownDays = this.utilService.getDropdownDayInMonth(
      this.dadMonth
    );
    this.momDropdownMonths = this.utilService.getDropdownMonthShort();
    this.momDropdownDays = this.utilService.getDropdownDayInMonth(
      this.dadMonth
    );
    this.patrolDropdownMonths = this.utilService.getDropdownMonthShort();
    this.patrolDropdownDays = this.utilService.getDropdownDayInMonth(
      this.dadMonth
    );
  }

  selectMonth(seq: number) {
    console.log("sequence: " + seq);
    if (seq == 1) {
      this.dadDropdownDays = this.utilService.getDropdownDayInMonth(
        this.dadMonth
      );
      this.dadDay = null;
    }
    if (seq == 2) {
      this.momDropdownDays = this.utilService.getDropdownDayInMonth(
        this.momMonth
      );
      this.momDay = null;
    }
    if (seq == 3) {
      this.patrolDropdownDays = this.utilService.getDropdownDayInMonth(
        this.patrolMonth
      );
      this.patrolDay = null;
    }
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

  // Autocomplete Selected
  selectProvince(index: number) {
    console.log("selectProvince");
    if (index == 0) {
      this.fDistrictList = [];
      this.fSubDistrictList = [];
      this.thisForm.acParent.father_postcode = null;
      this.utilService
        .getDistrictsByProvinceRef(this.dadProvince.province_ref)
        .subscribe((res: RftDistrict[]) => {
          this.fListDistrict = [];
          this.fListDistrict.push(...res);
        });
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

    selectDistrict(index: number) {
      console.log("selectDistrict");
      if (index == 0) {
        this.fSubDistrictList = [];

        this.thisForm.acParent.father_postcode = null;
        this.utilService
          .getSubDistrictsByDistrictRef(this.dadDistrict.district_ref)
          .subscribe((res: RftSubDistrict[]) => {
            this.fListSubDistrict = [];
            this.fListSubDistrict.push(...res);
          });
      }
      if (index == 1) {
        this.mSubDistrictList = [];
        this.thisForm.acParent.mother_postcode = null;
        this.utilService
          .getSubDistrictsByDistrictRef(this.momDistrict.district_ref)
          .subscribe((res: RftSubDistrict[]) => {
            this.mListSubDistrict = [];
            this.mListSubDistrict.push(...res);
          });
      }
      if (index == 2) {
        this.pSubDistrictList = [];
        this.thisForm.acParent.patrol_postcode = null;
        this.utilService
          .getSubDistrictsByDistrictRef(this.patrolDistrict.district_ref)
          .subscribe((res: RftSubDistrict[]) => {
            this.pListSubDistrict = [];
            this.pListSubDistrict.push(...res);
          });
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
  onEdit()  {
    this.mode = 'U'
  }

  onSubmit() {

  }
}
