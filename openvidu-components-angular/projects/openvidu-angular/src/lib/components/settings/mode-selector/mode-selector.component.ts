import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParticipantMode } from '../../../models/participant.model';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Subscription } from 'rxjs';
import { OpenViduAngularConfigService } from '../../../services/config/openvidu-angular.config.service';

/**
 * @internal
 */
@Component({
	selector: 'ov-user-mode-selector',
	templateUrl: './mode-selector.component.html',
	styleUrls: ['./mode-selector.component.css']
})
export class ModeSelectorComponent implements OnInit, OnDestroy {
  selectedMode: ParticipantMode = ParticipantMode.PARTICIPANT;

  modeSubscription: Subscription;

	constructor(
		protected participantService: ParticipantService,
    protected configService: OpenViduAngularConfigService
	) {}

  ngOnInit(): void {
    this.modeSubscription = this.configService.participantModeObs.subscribe((value) => {
      this.selectedMode = value;
    });
  }

  ngOnDestroy(): void {
    this.modeSubscription?.unsubscribe();
  }

  async onModeSelected(event: any) {
    const mode: ParticipantMode = event?.value;
    this.participantService.setMyMode(mode);
  }

}
