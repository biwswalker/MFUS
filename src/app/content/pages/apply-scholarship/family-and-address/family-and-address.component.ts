import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipComponent } from '../apply-scholarship.component';

@Component({
  selector: 'app-family-and-address-info',
  templateUrl: './family-and-address.component.html',
  styleUrls: ['./family-and-address.component.css']
})
export class FamilyAndAddressInfoComponent implements OnInit {

  constructor(private router: Router,
  public applyScholarship:ApplyScholarshipComponent) { }

  ngOnInit() {
    console.log('Begin family and address')
    console.log(this.applyScholarship.applyScholarshipForm)
  }

  onUpdate() {
    this.router.navigate(["pages/family-and-address"]);
  }
}
