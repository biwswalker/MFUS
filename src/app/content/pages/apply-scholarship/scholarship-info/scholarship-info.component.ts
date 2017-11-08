import { ApplyScholarshipForm } from './../../../form/apply-scholarshop-form';
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

  historyList: ApplyScholarshipForm[] = [];
  history: ApplyScholarshipForm;

  constructor(
    private utilService: UtilsService) {}

  ngOnInit() {

  }


  autocompleteScholarship(event) {

  }

  handleCompleteClickautocompleteScholarship(event) {
    setTimeout(() => {
    }, 100)
  }

  addRow() {
    this.history = new ApplyScholarshipForm();
    let historyList = [...this.historyList];
    historyList.push(this.history);
    this.historyList = historyList;
    console.log(this.historyList)
  }

  deleteRow() {

  }

}
