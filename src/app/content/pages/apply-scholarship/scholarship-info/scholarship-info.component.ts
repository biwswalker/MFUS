//Begin 6/11/2017

import { StartupService } from "./../../../../services/startup.service";
import { ScholarshipService } from "../../../../services/scholarship.service";
import { SmScholarship } from "./../../../models/sm-scholarship";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../../../services/utils.service";
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';

@Component({
  selector: "app-scholarship-info",
  templateUrl: "./scholarship-info.component.html",
  styleUrls: [
    "./scholarship-info.component.css",
    "../../../pages/pages.component.css"
  ]
})
export class ScholarshipInfoComponent implements OnInit {
  scholarshipList: SmScholarshipAnnouncement[] = [];
  listScholarship: SmScholarshipAnnouncement[] = [];

  constructor(
    private utilService: UtilsService) {}

  ngOnInit() {
    this.getScholarship();
  }

  getScholarship() {
    this.listScholarship = [];
    this.listScholarship = this.utilService.getScholarshipList();
    console.log(this.listScholarship)
  }

  autocompleteScholarship(event) {
    // let query = event.query;
    // this.scholarshipList = [];
    // let objList: SmScholarshipAnnouncement[];
    // for (let obj of objList) {
    //   if (obj.scholarship_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //     this.scholarshipList.push(obj);
    //   }
    // }
  }

  handleCompleteClickautocompleteScholarship(event) {
    this.scholarshipList = [];
    this.scholarshipList = this.listScholarship;
    setTimeout(() => {
    }, 100)
  }
}
