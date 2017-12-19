import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl, NgModel } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { CalendarModel } from './../../models/calendar-model';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';
import { ApplicationForm } from '../../form/application-form';

@Component({
  selector: 'app-scholarship-earning',
  templateUrl: './scholarship-earning.component.html',
  styleUrls: ['./scholarship-earning.component.css', '../pages.component.css']
})
export class ScholarshipEarningComponent extends CalendarModel implements OnInit {
  ngOnInit() {
  }
}
