import { AcParent } from './../../../models/ac-parent';
import { RftDistrict } from './../../../models/rft-district';
import { UtilsService } from '../../../../services/utils.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipComponent } from '../apply-scholarship.component';
import { ApplyscholarshipService } from '../../../../services/applyscholarship.service';
import { RftProvince } from '../../../models/rft-province';
import { RftSubDistrict } from '../../../models/rft-sub-district';
import { ParentService } from '../../../../services/parent.service';

@Component({
  selector: 'app-family-and-address-info',
  templateUrl: './family-and-address.component.html',
  styleUrls: ['./family-and-address.component.css']
})
export class FamilyAndAddressInfoComponent implements OnInit {

  flag: string;

  dadProvince: RftProvince = new RftProvince();
  dadDistrict: RftDistrict = new RftDistrict();
  dadSubDistrict: RftSubDistrict = new RftSubDistrict();

  momProvince: RftProvince = new RftProvince();
  momDistrict: RftDistrict = new RftDistrict();
  momSubDistrict: RftSubDistrict = new RftSubDistrict();

  patrolProvince: RftProvince = new RftProvince();
  patrolDistrict: RftDistrict = new RftDistrict();
  patrolSubDistrict: RftSubDistrict = new RftSubDistrict();

  constructor(private router: Router,
    public applyScholarship: ApplyScholarshipComponent,
    public applyscholarshipService: ApplyscholarshipService,
    private utilsService: UtilsService,
    private parentService: ParentService) { }

  ngOnInit() {
    console.log('Begin Family and Address Component')
    this.getFamilyData();
  }

  getFamilyData() {
    this.parentService.getParentByStudentRef(this.applyScholarship.applyScholarshipForm.acStudent.student_ref).subscribe((res: AcParent)=>{
      this.applyScholarship.applyScholarshipForm.acParent = res;
      this.getParentFlag();
      this.getRelationshipStatus();
      this.prepareAddressData();
  });
}

  getParentFlag() {
    let flag = this.applyScholarship.applyScholarshipForm.acParent.parent_flag;
    if (flag == "1") {
      this.flag = "บิดา-มารดา";
    } else {
      this.flag = "ผู้อุปการะ";
    }
  }

  getRelationshipStatus() {
    let status = this.applyScholarship.applyScholarshipForm.acParent.relationship_status;
    switch (status) {
      case "1": status = "สมรสอยู่ด้วยกัน"; break;
      case "2": status = "สมรสแยกกันอยู่"; break;
      case "3": status = "หย่าร้าง";
    }
    return status;
  }

  getstatus(status: string){
        switch (status){
          case "1": status = "มีชีวิตอยู่"; break;
          case "2": status = "เสียชีวิต";
        }
        return status;
  }

  prepareAddressData() {
    if (this.applyScholarship.applyScholarshipForm.acParent.parent_flag == '1') {
      console.log(this.applyScholarship.applyScholarshipForm.acParent.father_province)
      //Setup dad address
      this.utilsService.getProvinceByRef(this.applyScholarship.applyScholarshipForm.acParent.father_province).subscribe((res: RftProvince) => {
        this.dadProvince = res;
      });
      this.utilsService.getDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.father_district).subscribe((res: RftDistrict) => {
        this.dadDistrict = res;
      });
      this.utilsService.getSubDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.father_sub_district).subscribe((res: RftSubDistrict) => {
        this.dadSubDistrict = res;
      });

      //Setup mom address
      this.utilsService.getProvinceByRef(this.applyScholarship.applyScholarshipForm.acParent.mother_province).subscribe((res: RftProvince) => {
        this.momProvince = res;
      });
      this.utilsService.getDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.mother_district).subscribe((res: RftDistrict) => {
        this.momDistrict = res;
      });
      this.utilsService.getSubDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.mother_sub_district).subscribe((res: RftSubDistrict) => {
        this.momSubDistrict = res;
      });
    } else {
      console.log(this.applyScholarship.applyScholarshipForm.acParent.patrol_province)
      this.utilsService.getProvinceByRef(this.applyScholarship.applyScholarshipForm.acParent.patrol_province).subscribe((res: RftProvince) => {
        this.patrolProvince = res;
      });
      this.utilsService.getDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.patrol_district).subscribe((res: RftDistrict) => {
        this.patrolDistrict = res;
      });
      this.utilsService.getSubDistrictByRef(this.applyScholarship.applyScholarshipForm.acParent.patrol_sub_district).subscribe((res: RftSubDistrict) => {
        this.patrolSubDistrict = res;
      });
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
