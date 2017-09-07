import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css', '../../pages.component.css']
})
export class DropdownComponent implements OnInit {

  // Dropdown List
  dropdownList: SelectItem[];

  // Value
  dropdownValue: string;

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

}
