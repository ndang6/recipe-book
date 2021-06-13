import { Component, ViewChild } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthResponseData, AuthService } from "./auth.service";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    faLinkedin = faLinkedin

    @ViewChild('authForm') form: NgForm
    @ViewChild('email') emailInput: NgModel
    @ViewChild('password') passwordInput: NgModel

    isLoginMode = true
    isLoading = false
    error: string = null

    constructor(private authService: AuthService, private router: Router, private dataStorageService: DataStorageService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
        this.emailInput.reset()
        this.passwordInput.reset()
    }

    onSubmit(){
        if(!this.form.valid) return

        const {email, password} = this.form.value

        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;

        if(this.isLoginMode)
            authObs = this.authService.login(email, password);
        else{
            this.isLoginMode = true
            authObs = this.authService.signup(email, password);
        }
        
        authObs.subscribe(res => {
            this.dataStorageService.fetchRecipes().subscribe(res => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            });       
        }, errMessage => {
            this.error = errMessage;
            this.isLoading = false;
        });
        
        this.form.reset();
    }

    loginAsGuest(){
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        authObs = this.authService.login('guest@gmail.com', 'password');

        authObs.subscribe(res => {
            this.isLoading = false;
            this.dataStorageService.fetchRecipes().subscribe();
            this.router.navigate(['/recipes']);
        }, errMessage => {
            this.error = errMessage;
            this.isLoading = false;
        });
    }

    goToLink(url: string){
        window.open(url, "_blank");
    }
}