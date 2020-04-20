import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { BsModalService, BsModalRef, TabDirective } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { GetTasks } from '../models/getTasks';
import { UpdateStatus } from '../models/UpdateStatus';

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
  statusModel: UpdateStatus;

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

  updateAsCompleted(id: number) {
    this.statusModel = {
      taskId: id,
      status: 'Completed'
    };
    this.taskService.updateStatus(this.statusModel).subscribe(response => {
      this.getCompletedTasks();
      this.getPendingTasks();
    });
  }

  updateAsPending(id: number) {
    this.statusModel = {
      taskId: id,
      status: 'Pending'
    };
    this.taskService.updateStatus(this.statusModel).subscribe(response => {
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
