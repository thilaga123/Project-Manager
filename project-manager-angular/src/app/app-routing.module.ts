import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './component/view-task/view-task.component';
import { AddEditTaskComponent } from './component/add-edit-task/add-edit-task.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { AddProjectComponent } from './component/add-project/add-project.component';

const routes: Routes = [
  { path: 'view-task',component:ViewTaskComponent },
  { path: 'add-task',component: AddEditTaskComponent},
  { path: 'add-project',component: AddProjectComponent},
  { path: 'add-user',component: AddUserComponent},
  { path: 'edit-task/:task',component: AddEditTaskComponent},
  { path: '',   redirectTo: '/view-task', pathMatch: 'full' },
  { path: '**',redirectTo:'view-task',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

