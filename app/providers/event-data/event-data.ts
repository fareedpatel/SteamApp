import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.eventList = firebase.database().ref('userProfile/Jo8hdagfbeZ1RsleLLnuFReEGRh1/eventList');
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): any {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice,
      cost: eventCost
    }).then( newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }

  deleteEventList(eventName: string, eventDate: string, eventPrice: number, eventCost: number): any {
    return this.eventList.delete();
  }

  getEventList(): any {
    return this.eventList;
  }
}