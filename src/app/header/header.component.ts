import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;
    error: string = null;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe(); 
    }

    onLogout(){
        this.isAuthenticated = false;
        this.authService.logout();
    }

    onHandleError(){
        this.error = null;
    }

    getUserEmail(){
        return this.authService.getUserEmail();
    }
}