import { Message } from 'primeng/primeng';
import { Response } from '@angular/http';
import { ApplyscholarshipService } from './../../../../services/applyscholarship.service';
import { ApplyScholarshipForm } from "../../../form/apply-scholarshop-form";
import { ApFamilyDebt } from "../../../models/ap-family-debt";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-family-financial",
  templateUrl: "./family-financial.component.html",
  styleUrls: ["./family-financial.component.css", "../../pages.component.css"]
})
export class FamilyFinancialComponent implements OnInit {

  msgs: Message[];


  debtList: ApplyScholarshipForm[] = [];
  index: number= 0;
  debt: ApplyScholarshipForm;
  financial: ApplyScholarshipForm;

  constructor(private applyscholarshipService: ApplyscholarshipService) {}

  ngOnInit() {
    this.financial = new ApplyScholarshipForm();
    this.debt = new ApplyScholarshipForm();
    console.log("Begin apFamilyDept");
    this.index = 1
  }

  addRow() {
    this.debt = new ApplyScholarshipForm();
    this.debt.apFamilyDebt.seq = this.index
    let debtList = [...this.debtList];
    debtList.push(this.debt);
    this.debtList = debtList;
    debtList = [];
    this.index++
    console.log(this.debtList)
  }

  deleteRow(obj: ApplyScholarshipForm) {
   console.log(obj)
   let index = this.debtList.indexOf(obj);
   console.log(index);
   this.debtList.splice(index,1);
  }

  onPrevious() {

  }

  onNext() {
    this.addFinancial();
    this.addDebt();
  }

  addFinancial() {
    console.log('addFinancial')
    this.financial.apFamilyFinancial.application_ref = '11111';
    console.log(this.financial.apFamilyFinancial)
    // this.applyscholarshipService.addFamilyFinancial(this.financial).subscribe(
    //   (res: Response) =>{
    //     this.showSuccess('บันทึกข้อมูลเจ้าหน้าที่เรียบร้อยแล้ว รหัสอ้างอิงคือ ' + res.json().family_financial_ref);
    //   }
    // )
  }

  addDebt() {
    console.log('this.addDebt')
    console.log(this.debtList)

  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }
}
