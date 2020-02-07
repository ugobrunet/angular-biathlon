import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Competition } from '../classes/competition';
import { DataService } from '../data.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions : Competition[];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let eventId : string = this.route.snapshot.paramMap.get('eventId');
    this.dataService.getCompetitions(eventId)
    .subscribe(competitions => this.competitions = competitions);
  }

}