import { SponsorsForm } from './../../form/sponsors-form';
import { RftSubDistrict } from './../../models/rft-sub-district';
import { RftDistrict } from './../../models/rft-district';
import { RftProvince } from './../../models/rft-province';
import { SmSponsors } from './../../models/sm-sponsors';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css','../pages.component.css']
})
export class SponsorsComponent implements OnInit {

  public SponsorsForm: SponsorsForm = new SponsorsForm();
  statusList: SmSponsors[] = [];
  provinceList: RftProvince[] = [];
  districtList: RftDistrict[] = [];
  rftSubDistrictList: RftSubDistrict[] = [];

  image: any;

  // Datatable
  sponsorsFormList: SponsorsFormEx[] = [];
  selectedSponsors: SponsorsFormEx = new SponsorsFormEx();

  constructor() { }

  ngOnInit() {
    this.image = '../../../../assets/images/empty_profile.png';
    this.getProvinceDataList();
    this.getDistrictDataList();
    this.getSubDistrictDataList();
    this.sponsorsFormList = [];
    this.sponsorsFormList = this.getSponsorsList();
  }

  getProvinceDataList() {

  }

  getDistrictDataList() {

  }

  getSubDistrictDataList () {

  }

   // DATATABLES
   getSponsorsList(): SponsorsFormEx[] {
    let sponsorsListObj = [];
    let sponsorsForm: SponsorsFormEx;
    for (let i = 1; i < 20; i++) {
      sponsorsForm = new SponsorsFormEx();
      sponsorsForm.sponsors.sponsorsRef = 'sponsors' + i;
      sponsorsForm.sponsors.sponsorsName = 'name' + i;
      sponsorsForm.sponsors.address = 'address' + i;
      sponsorsForm.sponsors.phoneNo = 'phoneNo' + i;
      sponsorsForm.sponsors.activeFlag = 'status' + i;
      sponsorsListObj.push(sponsorsForm);
    }
    return sponsorsListObj;
  }

  onRowSelect(event) {
    console.log('Selected sponsors : ' + this.selectedSponsors.sponsors.sponsorsRef);
  }
}

export class SponsorsEx {
  public sponsorsRef: string;
  public sponsorsName: string;
  public address: string;
  public phoneNo: string;
  public activeFlag: string;
}

export class SponsorsFormEx {
  public sponsors: SponsorsEx;

  constructor() {
    this.sponsors = new SponsorsEx();
  }
}
