import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  myForm: FormGroup;
  number: Number;
  constructor(private fb: FormBuilder, private coreService: CoreService, private router: Router) { }

  ngOnInit(): void {
    console.log("here");
    this.myForm = this.fb.group({
      name: [""]
    });
  }
  login() {
    console.log(this.myForm.value);
    this.coreService.name = this.myForm.value.name;
    this.router.navigate(["/gamePage"]);
  }

}
