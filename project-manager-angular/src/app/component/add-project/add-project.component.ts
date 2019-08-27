import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { FilterPipe } from '../../filters/filter.pipe';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  exisitingProject: boolean = false;
  order: string = 'First_Name';
  reverse: boolean = false;
  form: FormGroup;
  submitted: boolean = false;
  users: any;
  projects: any;
  exisitingProjectObject: any;
  isChecked: boolean;
  tasks: any;
  constructor(private fb: FormBuilder, private service: AppService,private filter: FilterPipe) { }

  ngOnInit() {
    this.exisitingProject = false;
    this.setForm();
    this.service.getAllProjects().subscribe(res => this.projects = res);
    this.service.getAllUsers().subscribe(result => this.users = result);
    this.service.getAllTasks().subscribe(res=>this.tasks = res);
  }


  setForm(): void {
    this.form = this.fb.group({
      Project_Name: [null, Validators.required],
      isChecked: this.isChecked,
      Start_Date: [{
        value: null,
        disabled: this.isChecked
      }],
      End_Date: [{
        value: null,
        disabled: this.isChecked
      }],
      Priority: [null, [Validators.required]],
      User_ID: [null, Validators.required]
    }, { validator: this.dateRangeValidator });
  }
  hasError(controlName, validationName) {
    return this.form.get(controlName).hasError(validationName) && (this.form.get(controlName).touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    let obj = { ...this.form.value };
    if (this.form.valid) {
      if (this.exisitingProject) {
        obj._id = this.exisitingProjectObject._id;
        this.service.updateProject(obj).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched;
          this.form.markAsPristine;
          alert("successfully Updated!!!")
          this.service.getAllProjects().subscribe(result => this.projects = result);
        });
      }
      else {
        obj.Status = "InProgress";
        this.service.createProject(obj).subscribe((res) => {
          this.form.reset();
          this.form.markAsUntouched;
          this.form.markAsPristine;
          alert("Project Created!!!");
          this.service.getAllProjects().subscribe(result => this.projects = result);
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

  editProject(project) {
    this.exisitingProject = true;
    this.form.patchValue(project);
    this.exisitingProjectObject = project;
  }
  suspendProject(project) {
    project.Status = "Completed";
    console.log(project);
    this.service.updateProject(project).subscribe(result => {
      alert("Project Suspended!!!");
    })
  }
  checked() {
    var today = new Date();
    var tomorrow = new Date();
    console.log(tomorrow.setDate(today.getDate() + 1));
    this.form.patchValue({ Start_Date: today.toISOString().substr(0, 10), End_Date: tomorrow.toISOString().substr(0, 10) })
  }
  setUserID(user) {
    this.form.patchValue({ User_ID: user._id });
  }


  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {

    if (group.controls.End_Date.value !== undefined && group.controls.Start_Date.value !== undefined) {
      if (group.controls.Start_Date.value > group.controls.End_Date.value) {
        return { 'dateRange': true };
      }
      return null;
    }

    return null;
  }
  getTaskCount(id){
    if(id){
      var val= this.filter.transform(this.tasks,{'Project_ID' : id },undefined);
      return val.length + 1;
     
    }
 else
 return "This project Has No task";
  
  }
  
}





