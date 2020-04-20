import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetTasks } from '../models/getTasks';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(taskModel: GetTasks) {
    return this.http.post(this.api + '/api/Tasks/Dashboard', taskModel);
  }

  updateStatus(taskId: number, status: string) {
    return this.http.put(this.api + '/api/Tasks/update/' + taskId, status);
  }

  deleteTask(taskId: number) {
    return this.http.put(this.api + '/api/Tasks/delete/' + taskId, {});
  }
}
