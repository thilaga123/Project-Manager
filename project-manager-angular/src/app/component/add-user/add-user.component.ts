import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  exisitingUser: boolean = false;
  order: string = 'First_Name';
  reverse: boolean = false;
  form: FormGroup;
  submitted:boolean = false;
  users: any;
  exisitingUserObject: any;
  constructor(private fb:FormBuilder, private service: AppService) { }

  ngOnInit() {
    this.exisitingUser = false;
    this.setForm();
    this.service.getAllUsers().subscribe(result=>this.users = result);
  }


  setForm():void{
    this.form = this.fb.group({
      First_Name: [null, Validators.required],
      Last_Name: [null,[Validators.required]],
      Employee_ID: [null, Validators.required]
        });
  }
  hasError(controlName, validationName){
    return this.form.get(controlName).hasError(validationName) && (this.form.get(controlName).touched || this.submitted);
  }

  onSubmit():void{
    this.submitted = true;
   let  obj = {...this.form.value};
    if(this.form.valid){
      if(this.exisitingUser){
        obj._id = this.exisitingUserObject._id;
        this.service.updateUser(obj).subscribe(res=>{
          this.form.reset();
          alert("successfully Updated!!!")
          this.service.getAllUsers().subscribe(result=>this.users = result);
        });
      }
      else{
        this.service.createUser(obj).subscribe((res)=>{
          this.form.reset();
          alert("User Created!!!");
          this.service.getAllUsers().subscribe(result=>this.users = result);
     });
      }
      
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  editUser(user){
    this.exisitingUser = true;
    this.form.patchValue(user);
    this.exisitingUserObject = user;
  }
  deleteUser(user){
    this.service.deleteUser(user).subscribe(res=>{
      alert("deleted Successfully!!!");
      this.service.getAllUsers().subscribe(result=>this.users = result);
    });
  }
}
