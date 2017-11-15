import { RftSubDistrict } from './../../../../models/rft-sub-district';
import { RftDistrict } from './../../../../models/rft-district';
import { RftProvince } from './../../../../models/rft-province';

import { UtilsService } from '../../../../../services/utils.service';
import { FamilyAndAddressForm } from '../../../../form/family-and-address-form';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

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

  constructor(private utilService: UtilsService ) { }

  ngOnInit() {
    console.log('Begin family information')
    this.mode = 'S';
    this.initBirthMonth();
    this.getProvince();
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

  onEdit()  {
    this.mode = 'U'
  }
}
