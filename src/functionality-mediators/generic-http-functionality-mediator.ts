// بسم الله الرحمن الرحيم

import {HttpConnectionService} from "../connection-services/http-connection.service";
import {ElementRef, NgZone} from "@angular/core";
//import {IIS_FunctionalProperties} from "../auth-properties/i-i-s_-functional-properties";
import {
  DbPerformanceProperties,
  DbService_iterChkAuthReqBody,
  DbService_uniChkAuthReqBody,
  IIS_AuthenticationReqBody
} from "../auth-properties/generic-authentication-properties-template";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
//import {DbServicesFunctionalProperties} from "../auth-properties/db-services-functional-properties";
import {DbPerformanceFunctionalProperties} from "../auth-properties/db-performance-functional-properties";

export class GenericHttpFunctionalityMediator
{
  constructor(protected httpConnectionService:HttpConnectionService, protected ngZone:NgZone)
  {}

  private resetIIS_subscription!:Subscription;
  private startDb_serviceSubscription!:Subscription;
  private uniCheckDb_serviceSubscription!:Subscription;
  private iterativeCheckDb_serviceSubscription!:Subscription;
  private iterativeCheckDb_performanceSubscription!:Subscription;

  syncCheckDbPerformance(serverProperties:DbPerformanceProperties, affectedElements:ElementRef)
  {
    if(this.iterativeCheckDb_performanceSubscription)
      this.iterativeCheckDb_performanceSubscription.unsubscribe();

    let potentialObservedFactor:number;
    const innerIconElement:HTMLElement = affectedElements.nativeElement.querySelector('.highlight');
    const innerTxtElement:any = affectedElements.nativeElement.querySelector('.bac-l-stack-xs');

    this.ngZone.runOutsideAngular(()=>
    {
      this.iterativeCheckDb_performanceSubscription =
        this.httpConnectionService
        .initiateConnection_iterativeDbPerfCheck(serverProperties)
        .subscribe(
        {
          next:(extricatedData:any)=>
          {
            potentialObservedFactor = extricatedData[0]['cpu_time'];

            // relatively noticeable value [Relatively]
            if(potentialObservedFactor >= DbPerformanceFunctionalProperties.CPU_TIME_FACTOR_MIN
              && potentialObservedFactor < DbPerformanceFunctionalProperties.CPU_TIME_FACTOR_MAX)
            {
              affectedElements.nativeElement.classList.remove('positive-medium');
              affectedElements.nativeElement.classList.add('attention-low');

              innerIconElement.classList.remove('positive-medium');
              innerIconElement.classList.add('attention-low');

              innerTxtElement.innerHTML = 'غير مستقرة نسبياً';
            }

            // imperatively noticeable value [Imperative]
            else if (extricatedData[0]['cpu_time'] > DbPerformanceFunctionalProperties.CPU_TIME_FACTOR_MAX)
            {
              affectedElements.nativeElement.classList.remove('positive-medium');
              affectedElements.nativeElement.classList.add('critical-low');

              innerIconElement.classList.remove('positive-medium');
              innerIconElement.classList.add('critical-low');

              innerTxtElement.innerHTML = 'عمليات عالية الإستهلاك';
            }
            else
            {
              if(!affectedElements.nativeElement.classList.contains('positive-medium'))
              {

                affectedElements.nativeElement.classList.remove('attention-low');
                affectedElements.nativeElement.classList.remove('critical-low');
                affectedElements.nativeElement.classList.add('positive-medium');

                innerIconElement.classList.remove('critical-low');
                innerIconElement.classList.remove('attention-low');
                innerIconElement.classList.add('positive-medium');

                innerTxtElement.innerHTML = 'مستقــرة';
              }
            }
          },error: (_err:Error)=>
          {
            console.log("Error Occurred in implementation phase");


            affectedElements.nativeElement.querySelector('.bac-l-stack-xs').innerHTML = 'غير متصل';

          }



        })
    })
  }


  /**
   *  @Params: data → retrieved data from #check_dbServiceStatus_iterative [Http Request]
   *              @serviceName&serviceName_ → Database services name dedicated for both *SQL Server Service* OR  *SQL Server Agent* Service.
   *              @affectedElements: • __db service/agent status div__ [0]
   *                                                      • __db service/agent status dot__ [1]
   *                                                      • __db service/agent status text__ [2]
   *                                                      • __db service/agent reset button__ [3]
   *                                                      • __db service/agent processing status__ [4]
   * */
  syncCheckDbServices(serverProperties:DbService_iterChkAuthReqBody, dbServiceAffectedElements:any[], dbAgentServiceAffectedElements:ElementRef[], intervalTimeValue:number)
  {
    if(this.iterativeCheckDb_serviceSubscription)
      this.iterativeCheckDb_serviceSubscription.unsubscribe();

    this.ngZone.runOutsideAngular(()=>
    {
      this.iterativeCheckDb_serviceSubscription = this.httpConnectionService.initiateConnection_iterativeDbServicesCheck( serverProperties, intervalTimeValue).subscribe((data)=>
      {
        this.updateDbServiceStatus(data, serverProperties.serviceName, dbServiceAffectedElements);
        this.updateDbServiceStatus(data, serverProperties.ServiceName_, dbAgentServiceAffectedElements);
      })
    })
  }


  /**
   * this.dbService_sts_div_1, this.dbService_sts_dot_1, this.dbService_sts_txt_1, this.dbService_rst_btn_1, this.dbService_sts_proc_txt_1
   * @Data: Extracted data from [*Check DB Service Status Iterative* __HTTP REQUEST__].
   * @ServiceName: Database service name.
   * @AffectedElements:  • db Service Status Div [0];
   *                                          • db service/agent Status Dot [1];
   *                                          • db service/agent Status Text [2];
   *                                          • db service/agent Reset Button [3];
   *                                          • db service/agent Processing Text [4].
   * */
  private updateDbServiceStatus(data: any, serviceName:string, affectedElements:ElementRef[])
  {
    if(data["Response"][serviceName] === 'Running')
    {
      affectedElements[4].nativeElement.style.display = 'none';

      if  (!affectedElements[0].nativeElement.classList.contains('sql-srvc-sts'))
      {
        affectedElements[0].nativeElement.classList.add('sql-srvc-sts');
        affectedElements[1].nativeElement.classList.add('dot');
        affectedElements[0].nativeElement.classList.remove('sql-srvc-sts-nt-wrk');
        affectedElements[1].nativeElement.classList.remove('red-dot');
        affectedElements[2].nativeElement.innerHTML = 'تعمــل';
        affectedElements[3].nativeElement.style.display = 'none';
      }
    }
    else if(data["Response"][serviceName] !== 'Running')
    {
      if  (affectedElements[0].nativeElement.classList.contains('sql-srvc-sts'))
      {
        affectedElements[0].nativeElement.classList.add('sql-srvc-sts-nt-wrk');
        affectedElements[1].nativeElement.classList.add('red-dot');
        affectedElements[0].nativeElement.classList.remove('sql-srvc-sts');
        affectedElements[1].nativeElement.classList.remove('dot');
        affectedElements[2].nativeElement.innerHTML = 'لا تعمل';
        affectedElements[3].nativeElement.style.display = 'block';
      }
    }
  }

  /**
   *  @Parameters: service name → database service name
   *   @affectedElements: • service status div [0];
   *                                           • service status processing text [1];
   *                                           • service status dot [2];
   *                                           • service status text [3];
   *                                           • service status reset button [4]
   *
   * */
  syncStartDbService(affectedElements:HTMLElement[], dbServiceAuthProperties:DbService_uniChkAuthReqBody)
  {
    if(this.uniCheckDb_serviceSubscription && this.startDb_serviceSubscription)
    {
      this.uniCheckDb_serviceSubscription.unsubscribe();
      this.startDb_serviceSubscription.unsubscribe();
    }

    this.startDb_serviceSubscription = this.httpConnectionService.initiateConnection_startDbService(dbServiceAuthProperties).subscribe(()=>
    {
      affectedElements[1].style.display = 'block';
      affectedElements[2].style.display = 'none';
      affectedElements[3].style.display = 'none';
      affectedElements[4].style.display = 'none';

      this.delay(3000).then(()=>
      {
        this.uniCheckDb_serviceSubscription =
          this.httpConnectionService.initiateConnection_uniDbServicesCheck(dbServiceAuthProperties).subscribe((response:any)=>
          {
            if(response["Response"] === 'Running')
            {
              console.info('Working Properly');
              affectedElements[0].style.display = 'flex';
              affectedElements[1].style.display = 'none';
              affectedElements[0].classList.remove('sql-srvc-sts-nt-wrk');
              affectedElements[2].classList.remove('red-dot');
              affectedElements[2].classList.add('dot');
              affectedElements[2].style.display = 'block';
              affectedElements[3].style.display = 'block';
              affectedElements[3].innerHTML = 'تعمــل';
            }
          })
      })
    })
  }



  /**
   *  @Params: button → Initiate Reset IIS
   *                      affectedElements → affected HTML elements as an array.
   *                          • Loading Spinner [0]
   *                          • IIS ERROR DIV [1]
   *                          • IIS ERROR TEXT [2]
   *                          • IMPLY STATUS [3]
   */
  syncResetIIS(button:HTMLButtonElement, affectedElements:HTMLElement[], iisAuthInfo:IIS_AuthenticationReqBody)
  {
    if(this.resetIIS_subscription)
      this.resetIIS_subscription.unsubscribe();

    button.style.display = 'none';

    affectedElements[0].style.display = 'block';

    affectedElements[1].style.display = 'none';

    this.delay(2000).then(()=>
    {
      this.resetIIS_subscription = this.httpConnectionService.initiateConnection_resetIIS(iisAuthInfo).subscribe(
        {
          next: (result:any) =>
          {
            if(result)
            {
              if(result['Response'] === 'Success!')
              {
                affectedElements[0].style.display = 'none';
                affectedElements[3].style.display = 'block';

                this.delay(5000).then(()=>
                {
                  affectedElements[3].style.display = 'none';
                  button.style.display = 'block';
                  this.resetIIS_subscription.unsubscribe();
                })
              }
              else
              {
                affectedElements[0].style.display = 'none';
                affectedElements[1].style.display = 'flex';
                affectedElements[2].innerHTML = result['Response'];
                this.resetIIS_subscription.unsubscribe();
              }
            }
          },
          error: (err:HttpErrorResponse) =>
          {

            if(err.status === undefined)
            {
              affectedElements[0].style.display = 'none';
              affectedElements[1].style.display = 'flex';
              affectedElements[2].innerHTML = 'Network Error!';
            }
            else
            {
              console.info('Network Connected but something else occurred!');
              affectedElements[0].style.display = 'none';
              button.style.display = 'block';
            }

            this.resetIIS_subscription.unsubscribe();
          }
        })
    });
  }


  private delay(milliSeconds:number)
  {
    return new Promise(resolve => setTimeout(resolve, milliSeconds));
  }


  detachHttpSubscriptions():void
  {
    if(this.uniCheckDb_serviceSubscription)
      this.uniCheckDb_serviceSubscription.unsubscribe();

    if(this.startDb_serviceSubscription)
      this.startDb_serviceSubscription.unsubscribe();

    if(this.iterativeCheckDb_serviceSubscription)
      this.iterativeCheckDb_serviceSubscription.unsubscribe();

    if(this.iterativeCheckDb_performanceSubscription)
      this.iterativeCheckDb_performanceSubscription.unsubscribe();
  }

}
