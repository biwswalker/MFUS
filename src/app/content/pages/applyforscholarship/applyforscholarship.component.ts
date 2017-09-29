import { ApApplication } from './../../models/ap-application';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applyforscholarship',
  templateUrl: './applyforscholarship.component.html',
  styleUrls: ['./applyforscholarship.component.css','../pages.component.css']
})
export class ApplyforscholarshipComponent implements OnInit {

  image: any;
  textareaValue: string;

  CollageYearList: ApApplication[] = [];

  constructor() { }

  ngOnInit() {
  this.image = '../../../../assets/images/empty_profile.png';

  }

}
