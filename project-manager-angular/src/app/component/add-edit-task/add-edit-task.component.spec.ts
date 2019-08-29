import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskComponent } from './add-edit-task.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule } from '@angular/forms'
import { GridfilterPipeModule } from '../../filters/gridfilter.pipe.module';
import { OrderModule } from 'ngx-order-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { FilterPipe } from '../../filters/filter.pipe';
import { GridfilterPipe } from '../../filters/gridfilter.pipe';
import { AppService } from '../../app.service';
import { MockAppService } from '../../mock.service';
import { By } from '@angular/platform-browser';

describe('AddEditTaskComponent', () => {
  let component: AddEditTaskComponent;
  let fixture: ComponentFixture<AddEditTaskComponent>;
  let service: AppService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,
        RouterTestingModule, GridfilterPipeModule, OrderModule,
        NgSelectModule,
        HttpClientTestingModule],
        providers: [{ provide: AppService, useClass: MockAppService },GridfilterPipe,FilterPipe],
        declarations: [ AddEditTaskComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AppService);
    fixture = TestBed.createComponent(AddEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
   it('should call setUserID', () => {
    spyOn(component,'setUserID').and.callThrough();
     var task = {};
   
     component.setUserID(task);
     expect(component.setUserID).toHaveBeenCalledWith({});
   });
   it('should call setParentID', () => {
    spyOn(component,'setParentID').and.callThrough();
     var task = {};
   
     component.setParentID(task);
     expect(component.setParentID).toHaveBeenCalledWith({});
   });
   it('should call setProjectID', () => {
    spyOn(component,'setProjectID').and.callThrough();
     var task = {};
   
     component.setProjectID(task);
     expect(component.setProjectID).toHaveBeenCalledWith({});
   });
   it('should call checked', () => {
    spyOn(component,'checked').and.callThrough();
    component.isChecked = true;
   
     component.checked();
     expect(component.checked).toHaveBeenCalled();
   });
   it('should call checked', () => {
    spyOn(component,'checked').and.callThrough();
    component.isChecked = false;
   
     component.checked();
     expect(component.checked).toHaveBeenCalled();
   });
   it('should call onSubmit not valid', () => {
    spyOn(component,'onSubmit').and.callThrough();
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.onSubmit).toHaveBeenCalled();
  });
   it('should call onSubmit checked', () => {
    spyOn(service,'createParent').and.callThrough();

    component.form.patchValue(  {Project_ID:'sdhfjshdf',
    Task: 'dfgjhsgdf',
    isChecked: true,Parent_Task: 'dsgdfg',
    Priority: 4,
    Start_Date: 'sdfsd',
    End_Date: 'sdf',
    User_ID:'sdf'}  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.createParent).toHaveBeenCalled();
  });
  it('should call onSubmit not checked', () => {
    spyOn(service,'createTask').and.callThrough();

    component.form.patchValue(  {Project_ID:'sdhfjshdf',
    Task: 'dfgjhsgdf',
    isChecked: false,Parent_Task: 'dsgdfg',
    Priority: 4,
    Start_Date: 'sdfsd',
    End_Date: 'sdf',
    User_ID:'sdf'}  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.createTask).toHaveBeenCalled();
  });

  it('should call onSubmit not checked', () => {
    spyOn(service,'updateTask').and.callThrough();
component.task = {_id :'sdfsdf',
  Status:'Inprogress',
  Parent_ID:'Parent_ID'};
    component.form.patchValue(  {Project_ID:'sdhfjshdf',
    Task: 'dfgjhsgdf',
    isChecked: false,Parent_Task: 'dsgdfg',
    Priority: 4,
    Start_Date: 'sdfsd',
    End_Date: 'sdf',
    User_ID:'sdf'}  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.updateTask).toHaveBeenCalled();
  });
});
