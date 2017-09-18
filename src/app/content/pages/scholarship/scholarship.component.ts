import { SmSponsors } from './../../models/sm-sponsors';
import { AutoCompleteObjectModel } from './../tag/autocomplete/autocomplete.component';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css', '../pages.component.css']
})
export class ScholarshipComponent implements OnInit {
  // Datatable
  sponsorsFormList: SmSponsors[] = [];
  selectedSponsors: SmSponsors = new SmSponsors();
  textStr: string;
  textareaValue: string;
  // Dropdown List
  dropdownList: SelectItem[];
  // Value
  dropdownValue: string;
  // Autocomplete List
  autocompleteList: SmSponsors[] = [];

  // Object [(ngModel)]
  autocompleteObj: SmSponsors = new SmSponsors();

  constructor() { }

  ngOnInit() {
    // Get List
    this.getAutocompleteList();
    this.dropdownValue = 'Y';
  }

  // Make Data List
  getAutocompleteList() {
    this.dropdownList = [];
    this.dropdownList.push({ label: 'ใช้งาน', value: 'Y' });
    this.dropdownList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

  autocompleteMethod(event) {
    let query = event.query;
    this.autocompleteList = [];
    let objList: SmSponsors[] = [];
    for (let obj of objList) {
      // Filter By string event
      if (obj.sponsors_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.autocompleteList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClick() {
    this.autocompleteList = [];
    //mimic remote call
    setTimeout(() => {
      this.autocompleteList = [];
    }, 100)
  }

  onRowSelect(event) {
  }
}
