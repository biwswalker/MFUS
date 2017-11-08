import { ApplyScholarshipForm } from "../../../form/apply-scholarshop-form";
import { ApFamilyDebt } from "../../../models/ap-family-debt";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-family-financial",
  templateUrl: "./family-financial.component.html",
  styleUrls: ["./family-financial.component.css", "../../pages.component.css"]
})
export class FamilyFinancialComponent implements OnInit {
  debtList: ApplyScholarshipForm[] = [];
  index: number= 0;
  debt: ApplyScholarshipForm;
  // detail: string;
  // amount: number;

  constructor() {}

  ngOnInit() {
    console.log("Begin apFamilyDept");
    this.index = 1
  }

  addRow() {
    this.debt = new ApplyScholarshipForm();
    this.debt.apFamilyDebt.seq = this.index
    let debtList = [...this.debtList];
    debtList.push(this.debt);
    this.debtList = debtList;
    this.index++
  }

  deleteRow(ref: number) {
    let index = this.debtList;
  }

  onPrevious() {

  }

  onNext() {

  }
}
