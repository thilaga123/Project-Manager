import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
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

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,
        RouterTestingModule, GridfilterPipeModule, OrderModule,
        NgSelectModule,
        HttpClientTestingModule],
        providers: [{ provide: AppService, useClass: MockAppService },GridfilterPipe,FilterPipe],
        declarations: [ AddProjectComponent ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AppService);

    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setOrder', () => {
    spyOn(component,'setOrder').and.callThrough();
    var val = '';
    component.order = '';
    component.reverse = false;
    component.setOrder(val);
    expect(component.setOrder).toHaveBeenCalled();
  });
  it('should call setOrder else', () => {
    spyOn(component,'setOrder').and.callThrough();
    var val = '';
    component.order = 'sdsd';
    component.reverse = false;
    component.setOrder(val);
    expect(component.setOrder).toHaveBeenCalled();
  });
   it('should call editProject', () => {
    spyOn(component,'editProject').and.callThrough();
     var task = {};
   
     component.editProject(task);
     expect(component.editProject).toHaveBeenCalledWith({});
   });
   it('should call checked', () => {
    spyOn(component,'checked').and.callThrough();
     var task = {};
   
     component.checked();
     expect(component.checked).toHaveBeenCalled();
   });
   it('should call setUserID', () => {
    spyOn(component,'setUserID').and.callThrough();
     var task = {};
   
     component.setUserID(task);
     expect(component.setUserID).toHaveBeenCalledWith({});
   });
   
  
   it('should call getTaskCount', () => {
    spyOn(component,'getTaskCount').and.callThrough();
     var id = 'jdghfsgfsd';
   
     component.getTaskCount(id);
     expect(component.getTaskCount).toHaveBeenCalledWith('jdghfsgfsd');
   });
   it('should call suspendProject', () => {
    spyOn(component,'suspendProject').and.callThrough();
     var task = {};
   
     component.suspendProject(task);
     expect(component.suspendProject).toHaveBeenCalledWith({ Status: 'Completed' });
   });
   it('should call onSubmit', () => {
    spyOn(component, 'onSubmit').and.callThrough();// or spyOn(component, 'yourMethod');   
        component.form.patchValue( {"Project_Name":"project1","isChecked":true,"Start_Date":undefined,"End_Date":undefined,"Priority":11,"User_ID":"5d63cab7506fe953a860081a","Status":"InProgress"}  ) 

        
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should call onSubmit', () => {
    spyOn(component, 'onSubmit').and.callThrough();// or spyOn(component, 'yourMethod');   
        component.form.patchValue( {"Project_Name":"project1","isChecked":true,"Start_Date":"2019-08-30","End_Date":"2019-08-29","Priority":11,"User_ID":"5d63cab7506fe953a860081a","Status":"InProgress"}  ) 

        
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should call onSubmit new project', () => {
    spyOn(service,'createProject').and.callThrough();

    component.form.patchValue( {"Project_Name":"project1","isChecked":true,"Start_Date":"2019-08-29","End_Date":"2019-08-30","Priority":11,"User_ID":"5d63cab7506fe953a860081a","Status":"InProgress"}  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.createProject).toHaveBeenCalled();
  });
  it('should call onSubmit update project', () => {
    spyOn(service,'updateProject').and.callThrough();
component.exisitingProjectObject = {"Project_Name":"project1","isChecked":true,"Start_Date":"2019-08-29","End_Date":"2019-08-30","Priority":11,"User_ID":"5d63cab7506fe953a860081a","Status":"InProgress"};
component.exisitingProject = true;
    component.form.patchValue( component.exisitingProjectObject  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.updateProject).toHaveBeenCalled();
  });
 
});
