import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-UserAvatar',
  templateUrl: './UserAvatar.component.html',
  styleUrls: ['./UserAvatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() imgRoute! : string;

  constructor() { }

  ngOnInit() {
  }

}
