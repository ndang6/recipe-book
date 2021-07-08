import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  backgroundImgList = [
    'url(\'../assets/images/background0.jpg\')', 
    'url(\'../assets/images/background1.jpg\')', 
    'url(\'../assets/images/background2.jpg\')', 
  ]

  index = 0

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.index = Math.floor(Math.random() * this.backgroundImgList.length)
    this.authService.autoLogin(); 
  } 
}
 