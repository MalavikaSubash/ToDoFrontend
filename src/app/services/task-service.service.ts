import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetTasks } from '../models/getTasks';
import { UpdateStatus } from '../models/UpdateStatus';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(taskModel: GetTasks) {
    return this.http.post(this.api + '/api/Tasks/Dashboard', taskModel);
  }

  updateStatus(statusModel: UpdateStatus) {
    return this.http.put(this.api + '/api/Tasks/update', statusModel);
  }

  addTask(newTask: any) {
    return this.http.post(this.api + '/api/Tasks', newTask);
  }

  editTask(taskId: number, newTask: any) {
    return this.http.put(this.api + '/api/Tasks/' + taskId, newTask);
  }

  deleteTask(taskId: number) {
    return this.http.put(this.api + '/api/Tasks/delete/' + taskId, {});
  }
}
