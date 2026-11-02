import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   loginForm=new FormGroup({
   email:new FormControl('', [Validators.required, Validators.email]),
   password:new FormControl('', [Validators.required]),
   companySlug:new FormControl('', [Validators.required]),
    })
    loading=signal(false);
    errorMessage=signal('');
    onSubmit(){
      if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        return ;
      }
       const{email,companySlug}=this.loginForm.value;
        console.log('Login attemot:',email,companySlug);
    }
    
}
