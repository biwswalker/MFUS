import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipComponent } from '../apply-scholarship.component';
import { ApplyscholarshipService } from '../../../../services/applyscholarship.service';

@Component({
  selector: 'app-family-and-address-info',
  templateUrl: './family-and-address.component.html',
  styleUrls: ['./family-and-address.component.css']
})
export class FamilyAndAddressInfoComponent implements OnInit {

  flag: string;
  status: string;
  province: string;
  district: string;
  subdistrict: string;
  constructor(private router: Router,
  public applyScholarship:ApplyScholarshipComponent,
  public applyscholarshipService: ApplyscholarshipService) { }

  ngOnInit() {
    this.getParentFlag();
    this.getRelationshipStatus();
  }

  getParentFlag() {
    let flag = this.applyScholarship.applyScholarshipForm.acParent.parent_flag;
    if(flag == "1"){
      this.flag = "บิดา-มารดา";
    } else {
      this.flag = "ผู้อุปการะ";
    }
  }

  getRelationshipStatus() {
    let status = this.applyScholarship.applyScholarshipForm.acParent.relationship_status;
    switch(status) {
      case "1": this.status = "สมรสอยู่ด้วยกัน"; break;
      case "2": this.status = "สมรสแยกกันอยู่"; break;
      case "3": this.status = "หย่าร้าง";
    }
  }

  onUpdate() {
    this.router.navigate(["pages/family-and-address"]);
  }

  onNext() {
    console.log(this.applyScholarship.applyScholarshipForm)
    this.applyscholarshipService.nextIndex(4);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
