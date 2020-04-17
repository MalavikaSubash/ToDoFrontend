import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef, TabDirective } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datepickerModel: any;
  modalRef: BsModalRef;
  value: string;
  myFormGroup: FormGroup;

  selectedDate: any;

  constructor(public OAuth: AuthService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskDescription: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      taskDate: new FormControl('', Validators.required),
      taskEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern('/gmail/')])
    });
  }

  getDate(date) {
    console.log(date);
  }

  onSubmit() {
    console.log(this.myFormGroup.value);
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }

  newTaskModal(newTaskTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(newTaskTemplate);
  }

  deleteTaskModal(deleteTaskTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteTaskTemplate);
  }
}
