import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscussionsService } from 'src/app/services/discussions.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  ngOnInit() {
  }

  onLogin() {
     this.discussionsService.createUser(this.userForm.value).subscribe(res => {
       if (res) {
         this.router.navigate(['/discussion-forum'], {queryParams: {
          categories: JSON.stringify({ result: [this.forumId] }),
          userId: _.get(res, 'result.userId.uid')
        }});
       }
     })
  }

}
