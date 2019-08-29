import { of } from 'rxjs';

var task = [{Status:'Completed'},{Status:'Completed',Parent_Task:'sdfsdfsd'},{Status:'Inprogress',Parent_Task:'5d653da7217afe618084dd51'}];
var parent = [{"_id":"5d653da7217afe618084dd51","Project_ID":"5d651007c935475d4c5a4af0","Parent_Task":"task2 parent","__v":0},{"_id":"5d653e3e217afe618084dd52","Project_ID":"5d651007c935475d4c5a4af0","Parent_Task":"parent task 3","__v":0},{"_id":"5d654dde217afe618084dd55","Project_ID":"5d650ca8c935475d4c5a4aef","Parent_Task":"Parent Task 5","__v":0},{"_id":"5d654e86217afe618084dd57","Project_ID":"5d65102bc935475d4c5a4af1","Parent_Task":"task 3 ","__v":0},{"_id":"5d654ffc40d01302b89c2920","Project_ID":"5d6528c2c935475d4c5a4af2","Parent_Task":"task last 1","__v":0},{"_id":"5d6618f840d01302b89c2923","Project_ID":"5d6528c2c935475d4c5a4af2","Parent_Task":"4th task","__v":0}];
export class MockAppService {
 createTask(task) {
    return of(task);
  }

  createParent(task) {
    return of(task);
  }

  getAllTasks() {
   return of(task);
  }
getAllParents()
{
 return of(parent);
}
  updateTask(task){
    return of(task);
  }
  createUser(user){
    return of(task);
  }
  getAllUsers(){
    return of(task);
  }
  updateUser(user){
    return of(task);
  }
  deleteUser(user){
    return of(task);
  }
  createProject(project){
    return of(task);
  }
  getAllProjects(){
    return of(task);
  }
  updateProject(project){
    return of(task);
  }
}
