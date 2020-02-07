import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Result } from '../classes/result';
import { DataService } from '../data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results : Result[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let raceId : string = this.route.snapshot.paramMap.get('raceId');
    this.dataService.getResults(raceId)
    .subscribe(results => this.results 
    = this.orderResults(results.Results));
  }

  orderResults(response : Result[]) : Result[] {
    let orderedResponse : Result[] = [];
    let rslt1;
    for(let res in response) {
      let rslt2 : Result = response[res];
      if((rslt2.Leg > 0)) {
        if(!rslt1.Results)
          rslt1.Results = [];
        rslt1.Results.push(rslt2);
      }
      else {
        // orderedResponse.push(rslt2);
        if(rslt1) {
          orderedResponse.push(rslt1);
        }
        rslt1 = rslt2;
      }
    }
    if(rslt1) {
      orderedResponse.push(rslt1);
    }
    return orderedResponse;
  }

  getTime(res : Result) : string {
    if(res.Rank == "1")
      return res.TotalTime;
    else
      return res.Result;
  }

}