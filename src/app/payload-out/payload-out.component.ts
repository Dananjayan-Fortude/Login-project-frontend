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

  id : string = "";
  payloads: any[] = [];
  error_msg: any[] = [];
  total: number[] = [];
  headerID: any;
  susStep: any;
  pickStat: any;
  allocStat: any;
  pickStatMean: string = "";

  getID() {
    this.payloads = [];
    try {
      this.service.payload(this.id.toString()).subscribe(
        (response: any) => {
          this.susStep = response.suspenededStep;
          this.pickStat = response.picklistStatus;
          this.allocStat = response.allocatedStatus;
          this.headerID = response.headerID;
          if (this.pickStat === 0){
            this.pickStatMean = "CREATED"
          } else if (this.pickStat === 1){
            this.pickStatMean = "PENDING"
          } else if (this.pickStat === 2){
            this.pickStatMean = "NOT_STARTED"
          } else if (this.pickStat === 3){
            this.pickStatMean = "READY_TO_ISSUE"
          } else if (this.pickStat === 4){
            this.pickStatMean = "ISSUED"
          } else if (this.pickStat === 5){
            this.pickStatMean = "SUSPENDED"
          } else if (this.pickStat === 6){
            this.pickStatMean = "FAILED"
          } else if (this.pickStat === 7){
            this.pickStatMean = "REVERSED"
          }
          console.log(response.headerID);
          if (response && response.payloads && response.payloads.length !== 0) {
            //console.log(JSON.parse(response.payloads[0]))
            for (let i = 0; i < response.payloads.length; i++) {
              for (let x = 0; x < JSON.parse(response.payloads[i]).to.mos.length; x++) {
                this.total.push(JSON.parse(response.payloads[i]).to.mos[x].quantity)
              }
            }
            for (let i = 0; i < response.payloads.length; i++) {
              try {
                const parsedPayload = JSON.parse(response.payloads[i]);
                this.payloads.push(parsedPayload);
                this.error_msg.push(response.errors[i]);
              } catch (parseError) {
                console.log('Error parsing payload:', parseError);
              }
            }
          } else {
            console.log('No payload found');
          }
        },
        (error: any) => {
          console.log('Error in HTTP request:');
          // Handle the error as needed
        }
      );
    } catch (e) {
      console.log('Error in getID:');
      // Handle the error as needed
    }
  }

  idInput(eventData: any) {
    this.id = eventData.target.value;
  }
}
