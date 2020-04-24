import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { BsModalService, BsModalRef, TabDirective } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { GetTasks } from '../models/getTasks';
import { UpdateStatus } from '../models/UpdateStatus';
import { EmailModel } from '../models/EmailModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  userId: number;
  completedTasks: any;
  pendingTasks: any;

  taskModel: GetTasks;
  statusModel: UpdateStatus;
  emailModel: EmailModel;

  taskDate: any;
  today: any;

  datepickerModel: any;
  modalRef: BsModalRef;
  myFormGroup: FormGroup;

  value: string;

  selectedTaskId: number;
  selectedTask: any;
  selectedDate: any;

  constructor(public OAuth: AuthService,
              private taskService: TaskServiceService,
              private modalService: BsModalService) {
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

  onSubmit() {
    if (this.myFormGroup.valid) {
      if (this.selectedTask) {
        this.taskService.editTask(this.selectedTask.taskId, this.myFormGroup.value).subscribe(Reponse => {
          this.sendMail(this.myFormGroup.value);
          console.log('Task details edited !');
        });
        this.getCompletedTasks();
        this.getPendingTasks();
      } else {
        this.taskService.addTask(this.myFormGroup.value).subscribe(Response => {
          this.sendMail(this.myFormGroup.value);
          alert('New task added !');
          this.getCompletedTasks();
          this.getPendingTasks();
          this.modalRef.hide();
        });
      }
    } else {
      alert('Please enter all the details');
    }
    this.getCompletedTasks();
    this.getPendingTasks();
    this.modalRef.hide();
  }

  sendMail(data: any) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    this.userId = this.user.userId;

    this.emailModel = {
       ToMailId: data.Email,
       Message: data.Name,
       SenderId: this.userId
    };
    this.taskService.sendEmail(this.emailModel).subscribe(response => {
      console.log(response);
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedTaskId).subscribe(result => {
      console.log('Task deleted', this.selectedTaskId);
      this.modalRef.hide();
      this.getCompletedTasks();
      this.getPendingTasks();
    });
  }

  deleteTaskModal(deleteTaskTemplate: TemplateRef<any>, taskId: number) {
    this.modalRef = this.modalService.show(deleteTaskTemplate);
    this.selectedTaskId = taskId;
  }

  newTaskModal(newTaskTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(newTaskTemplate);
  }

  editTaskModal(newTaskTemplate: TemplateRef<any>, task: any) {
    this.modalRef = this.modalService.show(newTaskTemplate);
    this.selectedTask = task;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email;
    this.myFormGroup.patchValue({
      Name: this.selectedTask.taskName,
      Description: this.selectedTask.taskDescription,
      Date: new Date(this.selectedTask.taskDate),
      Email: email
    });
  }

  formDate(data) {
    this.selectedDate = new Date(data);
    this.myFormGroup.patchValue({
      Date: this.selectedDate
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

  ngOnInit() {
    this.today = new Date();
    this.taskDate = this.today;
    this.getPendingTasks();
    this.getCompletedTasks();

    this.myFormGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Date: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }
}
