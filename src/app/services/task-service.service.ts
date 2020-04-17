import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(userId: number, taskDate: Date, taskStatus: string) {
    const data: any = {
      id: userId,
      date: taskDate,
      status: taskStatus
    };
    return this.http.get('​/api​/Tasks' + data, {} );
  }

  updateStatus(taskId: number, status: string) {
    return this.http.put('/api/Tasks' + taskId, status);
  }

  deleteTask(taskId: number) {
    return this.http.delete('/api/Tasks' + taskId, {});
  }
}
