import { AcAddress } from './../models/ac-address';
import { AcSibling } from './../models/ac-sibling';
import { AcParent } from './../models/ac-parent';
import { RftSubDistrict } from './../models/rft-sub-district';
import { RftDistrict } from './../models/rft-district';
import { RftProvince } from './../models/rft-province';
export class FamilyAndAddressForm {

  public acParent: AcParent;
  public acSibling: AcSibling;
  public acAddress: AcAddress;
  public rftProvince: RftProvince;
  public rftDistrict: RftDistrict;
  public rftSubDistrict: RftSubDistrict;
  constructor() {
    this.acParent = new AcParent();
    this.acSibling = new AcSibling();
    this.acAddress = new AcAddress();
    this.rftProvince = new RftProvince();
    this.rftDistrict = new RftDistrict();
    this.rftSubDistrict = new RftSubDistrict();
  }
}
