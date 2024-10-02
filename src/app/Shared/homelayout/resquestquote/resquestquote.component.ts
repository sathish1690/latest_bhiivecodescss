import {ChangeDetectionStrategy, Component,signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Validation from './validtion';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { OnlynumberDirective } from './onlynumber.directive';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-resquestquote',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OnlynumberDirective, MatFormFieldModule,],
  templateUrl: './resquestquote.component.html',
  styleUrl: './resquestquote.component.scss'
})
export class ResquestquoteComponent {
  form: FormGroup = this.formBuilder.group({
    firstname:'',
    lastname: '',
    email:'',
    subject:'',
    message: '',
    mobile:'',
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20),],],
        lastname: ['', [ Validators.required,Validators.minLength(3),Validators.maxLength(20),],],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
        subject: ['', Validators.required],
        message:['']
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

 async onSubmit() {
  this.submitted = true;
    if (this.form.valid) {
      emailjs.init('oA0mAeIjoLjI3_UmP')
      let response = await emailjs.send("service_mtej26l","template_wksyftp",{
        subject: this.form.value.subject,
        message: this.form.value.message,
        mobile: this.form.value.mobile,
        email: this.form.value.email,
        firstname:this.form.value.firstname,
        lastname: this.form.value.lastname,
        });
       
        alert('message sent');
        this.submitted = false;
        this.form.reset();
        //return;
    }
  }

 
}
