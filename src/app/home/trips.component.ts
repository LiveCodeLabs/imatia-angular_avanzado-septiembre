import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-trips",
  styles: [
    `
      .green {
        color: green;
      }
      .orange {
        color: orange;
      }
      .sold-out {
        color: red;
      }
      .few-places {
        color: orange;
      }
    `,
  ],
  template: `
    <article>
      <h3>Offering {{ trips.length }} trips</h3>
      <ul *ngIf="trips.length > 0">
        <li *ngFor="let trip of trips">
          <span [ngClass]="trip.status === 'Confirmed' ? 'green' : 'orange'">
            {{ trip.destination }}
          </span>
          <span>💸 {{ trip.flightPrice | currency }}</span>
          <span>⤴️ {{ trip.startDate | date: "yyyy-MMM-dd" }}</span>
          <span>⤵️ {{ trip.endDate | date: "yyyy-MMM-dd" }}</span>
          <span [ngClass]="getClassForPlaces(trip.places)">
            🧑🏼‍🚀 {{ trip.places }}
          </span>
          <span *ngIf="trip.kind === 'WithStay'">🧳</span>
          <span *ngIf="trip.kind === 'TripOnly'">🛰️</span>
        </li>
      </ul>
      <span *ngIf="trips.length <= 0">🕳️ No data yet</span>
    </article>
  `,
})
export class TripsComponent {
  trips = data.trips;
  getClassForPlaces(places: number): string {
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  }
}