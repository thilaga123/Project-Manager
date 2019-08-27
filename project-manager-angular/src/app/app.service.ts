import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private API_PATH:string = "http://localhost:3000/";

  constructor(private http: HttpClient, private router: Router){

  }


  createTask(task): Observable<any>{
    return this.http.post<any>(`${this.API_PATH}tasks`,task,{
      observe: "response"
    }).pipe(map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  }
  createParent(task): Observable<any>{
    return this.http.post<any>(`${this.API_PATH}parents`,task,{
      observe: "response"
    }).pipe(map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  }


  getAllTasks(): Observable<any>{
    return this.http.get<any>(`${this.API_PATH}tasks`,{
      observe: "response"
    }).pipe(map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  }

  getAllParents(): Observable<any>{
    return this.http.get<any>(`${this.API_PATH}parents`,{
      observe: "response"
    }).pipe(map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  } 
  updateTask(task):Observable<any>{
   return this.http.put<any>(this.API_PATH+"tasks/"+task._id,task,{
     observe: "response"
   }).pipe(map((httpResponse:HttpResponse<any>)=>{
     return httpResponse.body;
   }));
 }
  
 //User services 

 
 createUser(user): Observable<any>{
  return this.http.post<any>(`${this.API_PATH}users`,user,{
    observe: "response"
  }).pipe(map((httpResponse:HttpResponse<any>)=>{
    return httpResponse.body;
  }));
}


getAllUsers(): Observable<any>{
  return this.http.get<any>(`${this.API_PATH}users`,{
    observe: "response"
  }).pipe(map((httpResponse:HttpResponse<any>)=>{
    return httpResponse.body;
  }));
}
updateUser(user):Observable<any>{
 return this.http.put<any>(this.API_PATH+"users/"+user._id,user,{
   observe: "response"
 }).pipe(map((httpResponse:HttpResponse<any>)=>{
   return httpResponse.body;
 }));
}

deleteUser(user):Observable<any>{
  return this.http.delete<any>(this.API_PATH+"users/"+user._id,{
    observe: "response"
  }).pipe(map((httpResponse:HttpResponse<any>)=>{
    return httpResponse.body;
  }));
}
//project services 

 
createProject(project): Observable<any>{
  return this.http.post<any>(`${this.API_PATH}projects`,project,{
    observe: "response"
  }).pipe(map((httpResponse:HttpResponse<any>)=>{
    return httpResponse.body;
  }));
}


getAllProjects(): Observable<any>{
  return this.http.get<any>(`${this.API_PATH}projects`,{
    observe: "response"
  }).pipe(map((httpResponse:HttpResponse<any>)=>{
    return httpResponse.body;
  }));
}
updateProject(project):Observable<any>{
 return this.http.put<any>(this.API_PATH+"projects/"+project._id,project,{
   observe: "response"
 }).pipe(map((httpResponse:HttpResponse<any>)=>{
   return httpResponse.body;
 }));
}
}