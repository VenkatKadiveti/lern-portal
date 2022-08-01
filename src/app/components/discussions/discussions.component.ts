import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscussionsService } from 'src/app/services/discussions.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  userForm: FormGroup;
  forumId = 1265;
  constructor(
    public discussionsService: DiscussionsService,
    public router: Router) {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      identifier: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  onLogin(): void {
    const payload = {
      username: _.toLower(this.userForm.get('username').value),
      identifier: _.toLower(this.userForm.get('identifier').value)
    };
     this.discussionsService.createUser(payload).subscribe(res => {
       if (res) {
         this.router.navigate(['/discussion-forum'], {queryParams: {
          categories: JSON.stringify({ result: [this.forumId] }),
          userId: _.get(res, 'result.userId.uid')
        }});
       }
     })
  }
}
