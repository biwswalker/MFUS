import { SelectItem } from 'primeng/primeng';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ApplicationTrackingService } from './../../../services/application-tracking.service';
import { Component, OnInit } from '@angular/core';
import { ApplicationTrackingForm } from '../../form/application-tracking-form';

@Component({
  selector: 'app-application-tracking',
  templateUrl: './application-tracking.component.html',
  styleUrls: ['./application-tracking.component.css', './../../pages/pages.component.css']
})
export class ApplicationTrackingComponent implements OnInit {

  status: SelectItem[];
  studentRef: string = '5a03e52ce518a'

  scholarshipList: SmScholarshipAnnouncement[] = [];
  selectedScholarship: any;
  listScholarship: SmScholarshipAnnouncement[] = [];

  public applicationTrackingForm: ApplicationTrackingForm = new ApplicationTrackingForm();
  public applicationTrackingCriteriaForm: ApplicationTrackingForm = new ApplicationTrackingForm();

  constructor(private applicationTrackingService: ApplicationTrackingService) { }

  ngOnInit() {
    this.getApplicationAnnoucementByStudentRef();
    this.getStatus();


  }

  getStatus() {
    this.status = [];
    this.status.push({ label: "ไม่ระบุ", value: "0" });
    this.status.push({ label: "เปิดรับสมัคร", value: "1" });
    this.status.push({ label: "คัดเลือกผู้มีสิทธิ์สัมภาษณ์", value: "2" });
    this.status.push({ label: "ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์", value: "3" });
    this.status.push({ label: "สัมภาษณ์", value: "4" });
    this.status.push({ label: "ประกาศผู้ที่ได้รับทุน", value: "5" });
    this.applicationTrackingForm.status = "0";
  }

  getApplicationAnnoucementByStudentRef() {
    this.applicationTrackingService.getScholarshipAnnoucement(this.studentRef)
      .subscribe((res: any[]) => {
        this.listScholarship.push(...res);
      })
  }

  autocompleteScholarship(event) {
    let query = event.query;
    this.scholarshipList = [];
    let objList: SmScholarshipAnnouncement[];
    objList = this.listScholarship;
    for (let obj of objList) {
      if (obj.scholarship_ref.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.scholarshipList.push(obj);
      }
    }
  }

  handleCompleteClickautocompleteScholarship(event) {
    let objList: SmScholarshipAnnouncement[];
    this.scholarshipList = [];
    objList = this.scholarshipList;

    setTimeout(() => {
      this.scholarshipList = this.listScholarship;
      console.log(this.scholarshipList)
    }, 100)
  }

  onSearch(){
    console.log(this.applicationTrackingCriteriaForm)
  }

  searchApplicationTracking(){

  }
}
