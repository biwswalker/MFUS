import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css', '../../pages.component.css']
})
export class AutocompleteComponent implements OnInit {

  // Autocomplete List
  autocompleteList: AutoCompleteObjectModel[] = [];

  // Object [(ngModel)]
  autocompleteObj: AutoCompleteObjectModel = new AutoCompleteObjectModel();

  constructor() { }

  ngOnInit() {

  }

  // Make Data List // On real case, we get list form Service
  getAutocompleteList(): AutoCompleteObjectModel[] {
    let objList = [];
    let obj = new AutoCompleteObjectModel();
    obj.setData('001', 'Information Technology', 'IT')
    objList.push(obj);
    obj = new AutoCompleteObjectModel();
    obj.setData('002', 'Software Engineering', 'SE')
    objList.push(obj);
    obj = new AutoCompleteObjectModel();
    obj.setData('003', 'Computer Science', 'CS')
    objList.push(obj);
    obj = new AutoCompleteObjectModel();
    obj.setData('004', 'Multimedia', 'MTA')
    objList.push(obj);
    obj = new AutoCompleteObjectModel();
    obj.setData('005', 'Computer Engineering', 'CE')
    objList.push(obj);
    obj = new AutoCompleteObjectModel();

    return objList;
  }

  // Autocomplete Method // On key wording
  autocompleteMethod(event) {
    let query = event.query;
    this.autocompleteList = [];
    let objList: AutoCompleteObjectModel[] = this.getAutocompleteList();
    console.log('BeforLoop', objList);

    for (let obj of objList) {

      console.log('startLoop');
      // Filter By string event
      if (obj.autoName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.autocompleteList.push(obj);
        console.log('obj: ', this.autocompleteList);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClick() {
    this.autocompleteList = [];
    //mimic remote call
    setTimeout(() => {
      this.autocompleteList = this.getAutocompleteList();
    }, 100)
  }

}

// Example Model
export class AutoCompleteObjectModel {
  public autoRef: string;
  public autoName: string;
  public autoGG: string;

  setData(ref: string, name: string, gg: string) {
    this.autoRef = ref;
    this.autoName = name;
    this.autoGG = gg;
  }
}
