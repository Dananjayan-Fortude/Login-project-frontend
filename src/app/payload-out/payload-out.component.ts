import {Component} from '@angular/core';
import {PayloadOutService} from './payload-out.service';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {reverseDto} from "./DTO/reverse.dto";
import {globalResponse} from "./classes/response-class";

@Component({
  selector: 'app-payload-out',
  templateUrl: './payload-out.component.html',
  styleUrls: ['./payload-out.component.css']
})
export class PayloadOutComponent {
  constructor(private service: PayloadOutService,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  id: string = "";
  payloads: any[] = [];
  error_msg: any[] = [];
  total: number[] = [];
  error_codes: any[] = [];
  cplUpdateQuery: any[] = [];
  headerID: any;
  susStep: any;
  pickStat: any;
  allocStat: any;
  printedStat: any;
  pickStatMean: string = "";
  updateQuery1: string = "";
  updateQuery2: string = "";
  queryDetails: string = "";
  alertType: string = "";
  alertMessage: string | undefined;
  hideAlert: boolean = true;
  selectedOption: string | null = null;
  headerIdAvailable: boolean = false;

  onRadioButtonChange(value: string) {
    this.payloads = [];
    this.error_msg = [];
    this.total = [];
    this.error_codes = [];
    this.selectedOption = value;
  }

  getID() {
    this.headerIdAvailable = true;
    this.spinner.show();
    this.updateQuery1 = "";
    this.updateQuery2 = "";
    this.queryDetails = "";
    this.payloads = [];
    if (this.selectedOption === 'failed') {
      try {
        this.service.payload(this.id.toString()).subscribe(
          (response: any) => {
            this.error_msg = [];
            this.pickStatMean = "";
            this.error_codes = [];
            this.total = [];
            this.susStep = response.suspenededStep;
            this.pickStat = response.picklistStatus;
            this.allocStat = response.allocatedStatus;
            this.printedStat = response.printedStatus;
            this.headerID = response.headerID;
            if (this.pickStat === 0) {
              this.pickStatMean = "CREATED"
            } else if (this.pickStat === 1) {
              this.pickStatMean = "PENDING"
            } else if (this.pickStat === 2) {
              this.pickStatMean = "NOT_STARTED"
            } else if (this.pickStat === 3) {
              this.pickStatMean = "READY_TO_ISSUE"
            } else if (this.pickStat === 4) {
              this.pickStatMean = "ISSUED"
            } else if (this.pickStat === 5) {
              this.pickStatMean = "SUSPENDED"
            } else if (this.pickStat === 6) {
              this.pickStatMean = "FAILED"
            } else if (this.pickStat === 7) {
              this.pickStatMean = "REVERSED"
            }
            let totVal = 0;
            if (response && response.payloads && response.payloads.length !== 0) {
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
              this.spinner.hide();
            } else {
              this.spinner.hide();
              this.alertType = "alert alert-danger";
              this.toast.error('No payloads found', 'Error', {
                timeOut: 3000,
                progressBar: true,
              });

            }
          },
          (error: any) => {
            this.spinner.hide();
            console.log('Error in HTTP request');
            // Handle the error as needed
          }
        );
      } catch (e) {
        this.spinner.hide();
        console.log('Error in getID');
        // Handle the error as needed
      }
    } else if (this.selectedOption === 'success') {
      try {
        this.service.successPayload(this.id.toString()).subscribe(
          (response: any) => {
            this.pickStatMean = "";
            this.error_codes = [];
            this.total = [];
            this.susStep = response.suspenededStep;
            this.pickStat = response.picklistStatus;
            this.allocStat = response.allocatedStatus;
            this.headerID = response.headerID;
            if (this.pickStat === 0) {
              this.pickStatMean = "CREATED"
            } else if (this.pickStat === 1) {
              this.pickStatMean = "PENDING"
            } else if (this.pickStat === 2) {
              this.pickStatMean = "NOT_STARTED"
            } else if (this.pickStat === 3) {
              this.pickStatMean = "READY_TO_ISSUE"
            } else if (this.pickStat === 4) {
              this.pickStatMean = "ISSUED"
            } else if (this.pickStat === 5) {
              this.pickStatMean = "SUSPENDED"
            } else if (this.pickStat === 6) {
              this.pickStatMean = "FAILED"
            } else if (this.pickStat === 7) {
              this.pickStatMean = "REVERSED"
            }
            let totVal = 0;
            if (response && response.payloads && response.payloads.length !== 0) {
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
                } catch (parseError) {
                  console.log('Error parsing payload:', parseError);
                }
              }
              this.spinner.hide();
            } else {
              this.spinner.hide();
              this.alertType = "alert alert-danger";
              this.toast.error('No payloads found', 'Error', {
                timeOut: 3000,
                progressBar: true,
              });

            }
          },
          (error: any) => {
            this.spinner.hide();
            console.log('Error in HTTP request');
            // Handle the error as needed
          }
        );
      } catch (e) {
        this.spinner.hide();
        console.log('Error in getID');
        // Handle the error as needed
      }
    } else {
      this.headerIdAvailable = false;
      this.spinner.hide();
      this.alertType = "alert alert-danger";
      this.toast.error('Please select an option', 'Error', {
        timeOut: 3000,
        progressBar: true,
      });
    }
  }

  idInput(eventData: any) {
    this.id = eventData.target.value;
  }

  getQuery() {
    this.cplUpdateQuery = [];
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
    this.spinner.show();
    try {
      this.service.excelGen(this.id.toString()).subscribe(
        (response: any) => {
          // console.log(response);
        },
        (error: any) => {
          if (error.status === 200) {
            this.spinner.hide();
            this.alertType = "alert alert-success";
            this.alertMessage = "Downloaded successfully";
            this.toast.success('Excel file downloaded', 'Success', {
              timeOut: 5000,
              progressBar: true,
            });
          } else if (error.status === 500) {
            this.spinner.hide();
            this.alertType = "alert alert-danger";
            this.alertMessage = "Error downloading file";
            this.toast.error('Error downloading file', 'Error', {
              timeOut: 5000,
              progressBar: true,
            });
          }
        }
      );
    } catch (e) {
      this.spinner.hide();
      console.log('Error in excel');
    }
  }

  cpUpdate() {
    this.cplUpdateQuery = [];
    this.spinner.show();
    try {
      this.service.cplUpdate().subscribe(
        (response: any) => {
          this.cplUpdateQuery = response;
          this.spinner.hide();
        },
        (error: any) => {
          this.spinner.hide();
          this.alertType = "alert alert-danger";
          this.alertMessage = "Error getting CPL";
          this.toast.error(error.error.text, 'Error', {
            timeOut: 5000,
            progressBar: true,
          });
        }
      );
    } catch (e) {
      this.spinner.hide();
      console.log('Error in excel');
    }
  }

  picklistReversal() {
    this.spinner.show();
    if (this.selectedOption == null) {
      this.spinner.hide();
      this.alertType = "alert alert-danger";
      this.alertMessage = "Please select an option";
      this.toast.error('Please select an option', 'Error', {
        timeOut: 3000,
        progressBar: true,
      });
      return;
    }
    if (!this.headerIdAvailable) {
      this.spinner.hide();
      this.alertType = "alert alert-danger";
      this.alertMessage = "Please get the picklist Info";
      this.toast.error('Please enter a header ID', 'Error', {
        timeOut: 3000,
        progressBar: true,
      });
      return;
    }
    const data: reverseDto = {
      picklistHeaderId: this.headerID,
      plantCode: this.id.startsWith('B03') ? 'L01' : 'S00S00',
      updatedBy: 'vijendranD'
    };

    try {
      this.service.reversalPicklist(data).subscribe(
        (res: globalResponse) => {
          if (!res.status) {
            this.spinner.hide();
            this.alertType = "alert alert-danger";
            this.alertMessage = res.message;
            this.toast.error(res.message, 'Error', {
              timeOut: 3000,
              progressBar: true,
            });
            return;
          } else {
            this.spinner.hide();
            this.alertType = "alert alert-success";
            this.alertMessage = res.message;
            this.toast.success(res.message, 'Success', {
              timeOut: 3000,
              progressBar: true,
            });
            return;
          }
        }
      )
    } catch (e) {
      this.spinner.hide();
    }
  }
}
