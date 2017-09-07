import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css', '../../pages.component.css']
})
export class CheckboxComponent implements OnInit {

  // Boolean Value
  checkedBool: boolean = false;

  // List Value
  selectedSchoolCheckbox: string[] = [];
  selectedMajorCheckbox: string[] = [];

  // Checkbox Major List
  majorCheckboxList = [];

  constructor() { }

  ngOnInit() {
  }

  // On select checkbox
  onSelectSchool() {
    // New Data
    this.majorCheckboxList = [];
    // Clear Data
    this.selectedMajorCheckbox = [];
    // Add list
    for (let schoolRef of this.selectedSchoolCheckbox) {
      let school = this.getMajor(schoolRef);
      this.majorCheckboxList.push(...school);
    }
  }

  // BEGIN MAKE DATA //
  getMajor(ref: string) {
    let listObj: string[] = [];
    if (ref === 'IT') {
      return [{ value: 'IT', name: 'InformationTechnology' }, { value: 'SE', name: 'Software Engineering' }, { value: 'CE', name: 'Computer Engineering' }];
    } else if (ref === 'MA') {
      return [{ value: 'ACC', name: 'Accounting' }, { value: 'ECON', name: 'Economic' }];
    } else if (ref === 'SCI') {
      return [{ value: 'CHEM', name: 'Chemistry' }, { value: 'BIO', name: 'Biosciences' }];
    }
    return null;
  }
  // END MAKE DATA

}
