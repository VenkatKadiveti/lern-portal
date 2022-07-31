import { Injectable } from '@angular/core';
import { CsModule } from '@project-sunbird/client-services';

@Injectable({
  providedIn: 'root'
})
export class CsLibInitializerService {


  constructor() { }

  private _initializeCs() {
    if (!CsModule.instance.isInitialised) {
      // Singleton initialised or not.
      CsModule.instance.init({
        core: {
          httpAdapter: 'HttpClientBrowserAdapter',
          global: {
            // channelId: this.userService.hashTagId, // required
            // producerId: this.userService.appId, // required
            // deviceId: this.fingerprintInfo // required
          },
          api: {
            host: document.location.origin, // default host
            authentication: {}
          }
        },
        services: {
          groupServiceConfig: {
            apiPath: '/learner/group/v1',
            dataApiPath: '/learner/data/v1/group',
            updateGroupGuidelinesApiPath: '/learner/group/membership/v1'
          },
          userServiceConfig: {
            apiPath: '/learner/user/v2',
          },
          formServiceConfig: {
            apiPath: '/learner/data/v1/form',
          },
          courseServiceConfig: {
            apiPath: '/learner/course/v1',
            certRegistrationApiPath: '/learner/certreg/v2/certs'
          },
          discussionServiceConfig: {
            apiPath: '/discussion',
          },
          contentServiceConfig: {
            hierarchyApiPath: '/learner/questionset/v1',
            questionListApiPath: '/api/question/v1'
          },
          notificationServiceConfig: {
            apiPath: '/learner/notification/v1/feed'
          },
          certificateServiceConfig: {
            apiPath: 'v1/certs/search',
            rcApiPath: 'api/rc/certificate/v1'
          }
        }
      });
    }
  }
  initializeCs() {
    this._initializeCs();
  }
}
