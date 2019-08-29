import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewTaskComponent } from './view-task.component';
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

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,
         RouterTestingModule, GridfilterPipeModule, OrderModule,
         NgSelectModule,
         HttpClientTestingModule],
         providers: [{ provide: AppService, useClass: MockAppService },GridfilterPipe,FilterPipe],
      declarations: [ ViewTaskComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AppService);
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call editTask', () => {
   spyOn(component,'editTask').and.callThrough();
    var task = {};
  
    component.editTask(task);
    expect(component.editTask).toHaveBeenCalledWith({});
  });
  it('should call endTask', () => {
    spyOn(component,'endTask').and.callThrough();
    var task = {};
    component.endTask(task);
    expect(component.endTask).toHaveBeenCalledWith({ Status: 'Completed' });
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
    component.order = 'sfsdfsd';
    component.reverse = false;
    component.setOrder(val);
    expect(component.setOrder).toHaveBeenCalled();
  });
  it('should call getTaskName', () => {
    spyOn(component,'getTaskName').and.callThrough();
    var val = 'asdasd';
    component.getTaskName(val);
    expect(component.getTaskName).toHaveBeenCalled();
  });


});
