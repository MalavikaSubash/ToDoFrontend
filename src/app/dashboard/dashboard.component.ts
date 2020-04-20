import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { BsModalService, BsModalRef, TabDirective } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { GetTasks } from '../models/getTasks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskModel: GetTasks;
  datepickerModel: any;
  modalRef: BsModalRef;
  value: string;
  myFormGroup: FormGroup;
  today: any;
  taskDate: any;
  user: any;
  userId: number;
  completedTasks: any;
  pendingTasks: any;
  deleteTaskId: number;

  constructor(public OAuth: AuthService,
              private taskService: TaskServiceService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.today = new Date();
    this.taskDate = this.today;
    this.getPendingTasks();
    this.getCompletedTasks();

    this.myFormGroup = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskDescription: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      taskDate: new FormControl('', Validators.required),
      taskEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern('/gmail/')])
    });
  }

  getDate(taskDate) {
    this.taskDate = new Date(taskDate);
    this.getPendingTasks();
    this.getCompletedTasks();
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }

  getPendingTasks() {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    this.userId = this.user.userId;

    this.taskModel = {
      userId: this.userId,
      taskDate: this.taskDate,
      Status: 'Pending'
    };

    this.taskService.getTasks(this.taskModel).subscribe(pendingTasks => {
      this.pendingTasks = pendingTasks;
    });
  }

  getCompletedTasks() {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    this.userId = this.user.userId;

    this.taskModel = {
      userId: this.userId,
      taskDate: this.taskDate,
      Status: 'Completed'
    };

    this.taskService.getTasks(this.taskModel).subscribe(completedTasks => {
      this.completedTasks = completedTasks;
    });
  }

  onSubmit() {
    console.log(this.myFormGroup.value);
  }

  newTaskModal(newTaskTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(newTaskTemplate);
  }

  updateAsCompleted(taskId: number) {
    this.taskService.updateStatus(taskId, 'Completed').subscribe(response => {
      console.log('Updated as completed !', response);
      this.getCompletedTasks();
      this.getPendingTasks();
    });
  }

  updatedAsPending(taskId: number) {
    this.taskService.updateStatus(taskId, 'Pending').subscribe(response => {
      console.log('Updated as Pending !', response);
      this.getCompletedTasks();
      this.getPendingTasks();
    });
  }

  deleteTaskModal(deleteTaskTemplate: TemplateRef<any>, taskId: number) {
    this.modalRef = this.modalService.show(deleteTaskTemplate);
    this.deleteTaskId = taskId;
  }

  deleteTask() {
    this.taskService.deleteTask(this.deleteTaskId).subscribe(result => {
      console.log('Task deleted', this.deleteTaskId);
      this.modalRef.hide();
      this.getCompletedTasks();
      this.getPendingTasks();
    });
  }
}
