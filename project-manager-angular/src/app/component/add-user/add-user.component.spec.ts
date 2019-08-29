import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
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
describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     
      imports: [FormsModule,ReactiveFormsModule,
        RouterTestingModule, GridfilterPipeModule, OrderModule,
        NgSelectModule,
        HttpClientTestingModule],
        providers: [{ provide: AppService, useClass: MockAppService },GridfilterPipe,FilterPipe],
        declarations: [ AddUserComponent ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AppService);

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call editUser', () => {
    spyOn(component,'editUser').and.callThrough();
     var task = {};
   
     component.editUser(task);
     expect(component.editUser).toHaveBeenCalledWith({});
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
    component.order = 'sfsdfd';
    component.reverse = false;
    component.setOrder(val);
    expect(component.setOrder).toHaveBeenCalled();
  });
   it('should call deleteUser', () => {
    spyOn(component,'deleteUser').and.callThrough();
     var task = {};
   
     component.deleteUser(task);
     expect(component.deleteUser).toHaveBeenCalledWith({});
   });

   it('should call onSubmit', () => {
     spyOn(component, 'onSubmit').and.callThrough();// or spyOn(component, 'yourMethod');       
     const fakeEvent = { preventDefault: () => console.log('preventDefault') };
     fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
     expect(component.onSubmit).toHaveBeenCalled();
   });
   
  
  it('should call onSubmit new user', () => {
    spyOn(service,'createUser').and.callThrough();

    component.form.patchValue( {"First_Name":"thilagavathy","Last_Name":"sdfsdf","Employee_ID":"234234"}  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.createUser).toHaveBeenCalled();
  });
  it('should call onSubmit update user', () => {
    spyOn(service,'updateUser').and.callThrough();
component.exisitingUserObject = {"First_Name":"thilagavathy","Last_Name":"sdfsdf","Employee_ID":"234234"} ;
component.exisitingUser = true;
    component.form.patchValue( component.exisitingUserObject  ) 
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(service.updateUser).toHaveBeenCalled();
  });
});
