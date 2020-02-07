import { Component, OnInit } from '@angular/core';

import { Event } from '../classes/event';
import { DataService } from '../data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private events : Event[];

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.dataService.getEvents()
    .subscribe(events => this.events = events);
  }

}