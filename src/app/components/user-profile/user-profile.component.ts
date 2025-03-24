import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() user?:IUser;
}
