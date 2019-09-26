import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogado;
  autenticado;
  loginForm;

  constructor(
    private  authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      user: '',
      senha: '',
      susep: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    if( this.authService.login(customerData.user, customerData.senha)){
      this.router.navigate(['/'])
    }
  }

}
