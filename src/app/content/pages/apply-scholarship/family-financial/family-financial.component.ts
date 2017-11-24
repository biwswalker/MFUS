import { Message } from 'primeng/primeng';
import { Response } from '@angular/http';
import { ApplyscholarshipService } from './../../../../services/applyscholarship.service';
import { ApplyScholarshipForm } from "../../../form/apply-scholarshop-form";
import { ApFamilyDebt } from "../../../models/ap-family-debt";
import { Component, OnInit } from "@angular/core";
import { ApplyScholarshipComponent } from '../apply-scholarship.component';

@Component({
  selector: "app-family-financial",
  templateUrl: "./family-financial.component.html",
  styleUrls: ["./family-financial.component.css", "../../pages.component.css"]
})
export class FamilyFinancialComponent implements OnInit {

  debtList: ApFamilyDebt[] = [];
  debt: ApFamilyDebt;
  financial: ApplyScholarshipForm;

  constructor(public applyScholarship: ApplyScholarshipComponent,
              private applyscholarshipService: ApplyscholarshipService) {}

  ngOnInit() {
    this.financial = new ApplyScholarshipForm();
    this.debt = new ApFamilyDebt();
  }

  addRow() {
    this.debt = new ApFamilyDebt();
    this.debt.seq = this.debtList.length+1
    let debtList = [...this.debtList];
    debtList.push(this.debt);
    this.debtList = debtList;
    debtList = [];
  }

  deleteRow(obj: ApFamilyDebt) {
   let index = this.debtList.indexOf(obj);
   this.debtList.splice(index,1);
  }

  addDebt() {
    this.applyscholarshipService.setDebtList(this.debtList);
  }

  onNext() {
    this.addDebt();
    console.log(this.applyScholarship.applyScholarshipForm)
    console.log(this.applyscholarshipService.getDebtList)
    this.applyscholarshipService.nextIndex(3);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }

  onPrevious() {
      this.applyscholarshipService.nextIndex(1);
      this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
