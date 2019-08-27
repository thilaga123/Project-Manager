import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from './component/view-task/view-task.component';
import { AddEditTaskComponent } from './component/add-edit-task/add-edit-task.component';
import { AppService } from './app.service';
import { GridfilterPipeModule } from './filters/gridfilter.pipe.module';
import { FormsModule } from '@angular/forms';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { OrderModule } from 'ngx-order-pipe'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { GridfilterPipe } from './filters/gridfilter.pipe';
import { FilterPipe } from './filters/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddEditTaskComponent,
    AddProjectComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    GridfilterPipeModule,
    FormsModule,
    OrderModule,
    NgSelectModule
  ],
  providers: [AppService,GridfilterPipe,FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
