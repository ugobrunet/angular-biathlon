import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DataService } from './data.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { EventsComponent } from './events/events.component';

import { AppRoutingModule } from './app-routing.module';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule, 
    AppRoutingModule,
    ],
  declarations: [ AppComponent, HelloComponent, MessagesComponent, CompetitionsComponent, EventsComponent, ResultsComponent, ],
  bootstrap:    [ AppComponent ],
  providers: [DataService, MessageService]
})
export class AppModule { }
