import { Component } from '@angular/core';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bunker Carbon Offset';
  currentUser: any;
  constructor(private userService: UserService) {
    this.userService.setCurrentUser(1);
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }
  setUser(id: any) {
    this.userService.setCurrentUser(id);
  }
}
