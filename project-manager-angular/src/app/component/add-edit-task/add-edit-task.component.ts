import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  task: any;
  slider: any;
  projects: any;
  parents: any;
  users: any;
  isChecked: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private service: AppService, private dataRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setForm();
    this.service.getAllProjects().subscribe(res => this.projects = res);
    this.service.getAllUsers().subscribe(result => this.users = result);
    this.service.getAllParents().subscribe(results => this.parents = results);

    console.log('this.router',this.router);
    if (this.router.url.split("/")[1] == "edit-task") {
      const key = JSON.parse(this.dataRoute.snapshot.params['task']);
      this.task = key;
      console.log(this.task);
      this.form.patchValue(this.task);
      this.slider = this.task.Priority;
    }

  }

  setForm(): void {
    this.form = this.fb.group({
      Project_ID:[null,Validators.required],
      Task: [null, Validators.required],
      isChecked: this.isChecked,
      Parent_Task: [{
        value: null,
        disabled: this.isChecked
      }, [Validators.required]],
      Priority: [{
        value: null,
        disabled: this.isChecked
      }, Validators.required],
      Start_Date: [{
        value: null,
        disabled: this.isChecked
      }, Validators.required],
      End_Date: [{
        value: null,
        disabled: this.isChecked
      }, Validators.required],
      User_ID:[{
        value: null,
        disabled: this.isChecked
      },Validators.required]
    });
  }

  hasError(controlName, validationName) {
    return this.form.get(controlName).hasError(validationName) && (this.form.get(controlName).touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    let obj = { ...this.form.value };
    if (this.form.valid) {
      if (this.task) {
        obj._id = this.task._id;
        obj.Status = this.task.Status;
        obj.Parent_ID = this.task.Parent_ID;
        this.service.updateTask(obj).subscribe(res => {
          alert("successfully Updated!!!")
          this.router.navigate(['/view-task']);
        });
      }
      else {
        if(this.isChecked){
          this.service.createParent(obj).subscribe((res) => {
            obj.Parent_ID = res._id;
            obj.Status = "InProgress";
            this.service.createTask(obj).subscribe((response) => {
              this.router.navigate(['/view-task']);
            });
          });
        }
        else{
          obj.Parent_ID = null;
          obj.Status = "InProgress";
          this.service.createTask(obj).subscribe((res) => {
            this.router.navigate(['/view-task']);
          });
        }
       
      }

    }
  }

  setUserID(user) {
    this.form.patchValue({ User_ID: user._id });
  }
  setProjectID(project) {
    this.form.patchValue({ Project_ID: project._id });
  }
  setParentID(parent){
    this.form.patchValue({ Parent_Task: parent._id });
  }
  checked(){
    if(this.isChecked){
      this.form.get('Parent_Task').setValidators(Validators.required);
      this.form.get('Parent_Task').updateValueAndValidity();
      this.form.get('Priority').setValidators(Validators.required);
      this.form.get('Priority').updateValueAndValidity();
      this.form.get('Start_Date').setValidators(Validators.required);
      this.form.get('Start_Date').updateValueAndValidity();
      this.form.get('End_Date').setValidators(Validators.required);
      this.form.get('End_Date').updateValueAndValidity();
      this.form.get('User_ID').setValidators(Validators.required);
      this.form.get('User_ID').updateValueAndValidity();
    }
    else{
      this.form.get('Parent_Task').clearValidators();
      this.form.get('Parent_Task').updateValueAndValidity();
      this.form.get('Priority').clearValidators();
      this.form.get('Priority').updateValueAndValidity();
      this.form.get('Start_Date').clearValidators();
      this.form.get('Start_Date').updateValueAndValidity();
      this.form.get('End_Date').clearValidators();
      this.form.get('End_Date').updateValueAndValidity();
      this.form.get('User_ID').clearValidators();
      this.form.get('User_ID').updateValueAndValidity();
    }
  }
}
