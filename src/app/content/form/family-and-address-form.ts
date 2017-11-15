import { AcAddress } from './../models/ac-address';
import { AcSibling } from './../models/ac-sibling';
import { AcParent } from './../models/ac-parent';
export class FamilyAndAddressForm {

  public acParent: AcParent;
  public acSibling: AcSibling;
  public acAddress: AcAddress;


  public siblingList: AcSibling[];
  constructor() {
    this.acParent = new AcParent();
    this.acSibling = new AcSibling();
    this.acAddress = new AcAddress();



    this.siblingList = [];
  }
}
