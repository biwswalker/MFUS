import { AcUser } from '../models/ac-user';
import { AcOfficer } from '../models/ac-officer';
import { RftProvince } from'../models/rft-province';
import { RftDistrict } from'../models/rft-district';
import { RftSubDistrict } from'../models/rft-sub-district';

export class OfficerForm {

public acOfficer: AcOfficer;
public acUser: AcUser;
public rftProvince: RftProvince;
public rftDistrict: RftDistrict;
public rftSubDistrict: RftSubDistrict;

constructor(){
	this.acUser = new AcUser();
	this.acOfficer = new AcOfficer();
	this.rftProvince = new RftProvince();
	this.rftDistrict = new RftDistrict();
	this.rftSubDistrict = new RftSubDistrict();

	}
}
