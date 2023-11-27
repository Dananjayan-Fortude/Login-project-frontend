import { Component } from '@angular/core';
import { PayloadOutService } from './payload-out.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payload-out',
  templateUrl: './payload-out.component.html',
  styleUrls: ['./payload-out.component.css']
})
export class PayloadOutComponent {
  constructor( private service: PayloadOutService,
               private toast: ToastrService) {
  }

  id : string = "";
  payloads: any[] = [];
  error_msg: any[] = [];
  total: number[] = [];
  error_codes: any[] = [];
  headerID: any;
  susStep: any;
  pickStat: any;
  allocStat: any;
  pickStatMean: string = "";
  updateQuery1: string = "";
  updateQuery2: string = "";
  queryDetails: string = "";
  alertType: string = "";
  alertMessage: string | undefined;
  hideAlert: boolean = true;

  getID() {
    this.payloads = [];
    try {
      this.service.payload(this.id.toString()).subscribe(
        (response: any) => {
          this.pickStatMean = "";
          this.error_codes = [];
          this.total = [];
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
          let totVal = 0;
          if (response && response.payloads && response.payloads.length !== 0 ) {
            // console.log(this.error_codes);
            for (let i = 0; i < response.payloads.length; i++) {
              for (let x = 0; x < JSON.parse(response.payloads[i]).to.mos.length; x++) {
                totVal = totVal + JSON.parse(response.payloads[i]).to.mos[x].quantity
              }
              this.total.push(totVal)
              totVal = 0;
            }
            for (let i = 0; i < response.payloads.length; i++) {
              try {
                const parsedPayload = JSON.parse(response.payloads[i]);
                this.payloads.push(parsedPayload);
                this.error_msg.push(response.errors[i]);
                this.error_codes.push(response.error_codes[i]);
              } catch (parseError) {
                console.log('Error parsing payload:', parseError);
              }
            }
          } else {
            console.log(response.errors);
          }
        },
        (error: any) => {
          console.log('Error in HTTP request');
          // Handle the error as needed
        }
      );
    } catch (e) {
      console.log('Error in getID');
      // Handle the error as needed
    }
  }

  idInput(eventData: any) {
    this.id = eventData.target.value;
  }

  getQuery() {
    try {
      this.service.query(this.id.toString()).subscribe(
        (response: any) => {
          this.queryDetails = response.details;
          this.updateQuery1 = response.picklistUpdate;
          this.updateQuery2 = response.suspenededUpdate;
        },
        (error: any) => {
          console.log('Error in HTTP request');
          // Handle the error as needed
        }
      );
    } catch (e) {
      console.log('Error in getQuery');
    }
  }

  excel() {
    try {
      this.service.excelGen(this.id.toString()).subscribe(
        (response: any) => {
          // console.log(response);
        },
        (error: any) => {
          if (error.status === 200) {
            this.alertType = "alert alert-success";
            this.alertMessage = "Downloaded successfully";
            this.toast.success('Excel file downloaded', 'Success', {
              timeOut: 3000,
              progressBar: true,
            });
          }
          else if (error.status === 500) {
            this.alertType = "alert alert-danger";
            this.alertMessage = "Error downloading file";
            this.toast.error('Error downloading file', 'Error', {
              timeOut: 3000,
              progressBar: true,
            });
          }
        }
      );
    } catch (e) {
      console.log('Error in excel');
    }
  }

  protected readonly alert = alert;
}
