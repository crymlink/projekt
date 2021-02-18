import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  session_id: string = '';

  login() {
    this.StateService.login(this.name, this.session_id);
  }

  constructor(private StateService: StateService) {}

  ngOnInit() {}
}
