import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../../filters/filter.pipe';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  tasks: any;
  order: string = 'Task';
  reverse: boolean = false;
  parents: any;
  constructor(private service:AppService, private route: Router , private filter: FilterPipe) { }

  ngOnInit() {
    this.service.getAllParents().subscribe(results => this.parents = results);
    this.service.getAllTasks().subscribe(result=>this.tasks = result);
      }
      endTask(task){
        console.log("tyesting");
        task.Status = "Completed";
        console.log(task);
        this.service.updateTask(task).subscribe(result=>{
        alert("Task completed!!!");
        })
      }
      editTask(task){
          this.route.navigate(['edit-task', JSON.stringify(task)]);
        
      }

      setOrder(value: string) {
        if (this.order === value) {
          this.reverse = !this.reverse;
        }
    
        this.order = value;
      }
      getTaskName(id){
        if(id){
          var val= this.filter.transform(this.parents,{'_id' : id },undefined);
          if(val.length >= 0){
           if(val[0]){
            return val[0].Parent_Task;
           }
          }
         
        }
     else
     return "This Task Has No Parent";
      
      }
}
