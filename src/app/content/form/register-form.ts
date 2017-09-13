import { AcUser } from '../models/ac-user';
import { AcStudent } from '../models/ac-student';


export class RegisterForm {

public acStudent: AcStudent;
public acUser: AcUser;


constructor(){
	this.acUser = new AcUser();
    this.acStudent = new AcStudent();
}
}
