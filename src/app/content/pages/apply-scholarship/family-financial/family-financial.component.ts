import { ApplyScholarshipForm } from '../../../form/apply-scholarshop-form';
import { ApFamilyDebt } from '../../../models/ap-family-debt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-financial',
  templateUrl: './family-financial.component.html',
  styleUrls: ['./family-financial.component.css', '../../pages.component.css']
})
export class FamilyFinancialComponent implements OnInit {

  form: ApFamilyDebt;
  selectedDebt: ApFamilyDebt;
  debtList: ApFamilyDebt[] = [];

  applyScholarshipForm: ApplyScholarshipForm;

  constructor() {
    this.debtList = [];
   }

  ngOnInit() {

  }

  addRow() {
    console.log('addRow')
    this.debtList.push(new ApFamilyDebt());
    console.log(this.debtList.length)
  }

  deleteRow() {

  }
}
