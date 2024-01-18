import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParticipantMode } from '../../../models/participant.model';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Subscription } from 'rxjs';

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
	) {}

  ngOnInit(): void {
    this.modeSubscription = this.participantService.localParticipantObs.subscribe((value) => {
      this.selectedMode = value.mode;
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
