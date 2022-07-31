import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsModule } from '@project-sunbird/client-services';
import { CsLibInitializerService } from './CsLibInitializer/cs-lib-initializer.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  private discussionCsService: any;

  constructor(private http: HttpClient,
    private csLibInitializerService: CsLibInitializerService) {
    if (!CsModule.instance.isInitialised) {
      this.csLibInitializerService.initializeCs();
    }
    this.discussionCsService = CsModule.instance.discussionService;
  }

  health() {
    return this.http.get('/discussion/health');
  }

  createUser(data) {
    return this.discussionCsService.createUser(data);
  }

}
