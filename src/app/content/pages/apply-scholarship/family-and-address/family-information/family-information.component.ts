import { FamilyAndAddressInfoComponent } from './../family-and-address.component';
import { ApplyScholarshipComponent } from './../../apply-scholarship.component';
import { RftSubDistrict } from './../../../../models/rft-sub-district';
import { RftDistrict } from './../../../../models/rft-district';
import { RftProvince } from './../../../../models/rft-province';

import { UtilsService } from '../../../../../services/utils.service';
import { FamilyAndAddressForm } from '../../../../form/family-and-address-form';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FamilyInformationService } from '../../../../../services/family-information.service';

@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.css', '../../../pages.component.css']
})
export class FamilyInformationComponent implements OnInit {


  constructor(public familyAndAddress: FamilyAndAddressInfoComponent,
              public applyScholarship: ApplyScholarshipComponent) { }

  ngOnInit() {
  }


}
