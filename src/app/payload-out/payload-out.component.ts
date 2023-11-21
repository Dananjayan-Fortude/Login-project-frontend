import { Component } from '@angular/core';
import { PayloadOutService } from './payload-out.service';
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-payload-out',
  templateUrl: './payload-out.component.html',
  styleUrls: ['./payload-out.component.css']
})
export class PayloadOutComponent {
  constructor( private service: PayloadOutService) {
  }

  id : string | undefined;
  pay: any;
  payloads: any[] = [];

  getID() {
    // @ts-ignore
    this.service.payload(this.id).subscribe(
      (response: any) => {
        // console.log(response.length);
        // this.pay = response[0];
        // console.log(JSON.parse(this.pay));
        for (const res in response) {
          this.payloads.push(JSON.parse(response[res]));
        }

      }
    )
  }

  idInput(eventData: any) {
    this.id = eventData.target.value;
  }
}
