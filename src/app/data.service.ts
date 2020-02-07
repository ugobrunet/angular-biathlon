import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Event } from './classes/event';
import { Competition } from './classes/competition';

@Injectable()
export class DataService {
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  private events : Event[];

  private competitions: { [id: string] : Competition[] } = {};

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`DataService: ${message}`);
  }

  getResults(raceId : string) {
      const url = 'https://biathlonresults.com/modules/sportapi/api/Results?RaceId='+raceId;

    return this.http.get(this.getProxyUrl(url));
  }

    /** GET competitions from the server */
  getCompetitions(eventId : string) : Observable<Competition[]> {
    if(this.competitions[eventId]) {
      return of(this.competitions[eventId]);
    }

    const url = 'https://biathlonresults.com/modules/sportapi/api/Competitions?EventId='+eventId;

    const observable = this.http.get<Competition[]>(this.getProxyUrl(url));

    observable.subscribe(competitions => this.competitions[eventId] = competitions);

    return observable;
  }

  getEvents() : Observable<Event[]> {
    if(this.events) {
      return of(this.events);
    }

    const url = 'https://biathlonresults.com/modules/sportapi/api/Events?SeasonId=1920&Level=0';

    const eventArray  = ["BTSWRLCP","BTSWRLCH"];

    const observable = this.http.get<Event[]>(this.getProxyUrl(url))
    .pipe(
      map(res => res.filter(<Event>(x) => eventArray.indexOf(x.EventClassificationId) > -1))
    );
    observable.subscribe(events => this.events = events);
    return observable;
  }

  getProxyUrl(url : string) : string {
    return this.proxyUrl + url;
  }
    
}