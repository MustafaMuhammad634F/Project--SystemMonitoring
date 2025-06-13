// بسم الله الرحمن الرحيم


import {WsConnectionService} from "../connection-services/ws-connection.service";
import {startWith, Subscription, switchMap} from "rxjs";
import {ICMP_clusterAuthProperties} from "../auth-properties/generic-authentication-properties-template";
import {ElementRef, NgZone} from "@angular/core";
import {ICMP_CP} from "../auth-properties/i-c-m-p_-c-p";

export class ICMP_wsFunctionalityMediator {
  constructor(protected wsConnectionService: WsConnectionService, protected ngZone:NgZone) {
  }

  connectionSubscriptions: Subscription[] = [];

  private icmpClusterProperties = new ICMP_CP();

  public syncWsConnection(serverProperties: ICMP_clusterAuthProperties)
  {
    this.wsConnectionService.socketKey = serverProperties.socketKey;
    serverProperties.socketKey = this.wsConnectionService.socketKey;
    return this.wsConnectionService.initiateConnection_ICMP_echoRequests(serverProperties);
  }

  public extractSocketInitiatedConnectionData()
  {
    return this.wsConnectionService.getTransmittedMsgStreamObservable();
  }

  public propagateConnectionStatus(serverProperties: ICMP_clusterAuthProperties,
                                   ICMP_visualElements: {[dict_key: string]: ElementRef<HTMLElement>[] },
                                   IIS_visualElements: {[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                                   dskSpc_visualElements:{[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                                   dbPerformanceElements?: {[dict_key: string]: ElementRef<HTMLElement>[] },
                                   dbServicesElements?:{[dict_key:string]: ElementRef<HTMLElement>[]}): void
  {

    this.attemptConnectionEstablishment(serverProperties, ICMP_visualElements, IIS_visualElements, dskSpc_visualElements, dbPerformanceElements, dbServicesElements);

    this.handleConnectionDropDown(serverProperties, ICMP_visualElements, IIS_visualElements, dskSpc_visualElements, dbPerformanceElements, dbServicesElements);
  }


    private attemptConnectionEstablishment(serverProperties: ICMP_clusterAuthProperties,
                              ICMP_visualElements: {[dict_key: string]: ElementRef<HTMLElement>[] },
                              IIS_visualElements: {[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                              dskSpc_visualElements:{[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                              dbPerformanceElements?: {[dict_key: string]: ElementRef<HTMLElement>[] },
                              dbServicesElements?:{[dict_key:string]: ElementRef<HTMLElement>[]})
    {
      this.connectionSubscriptions
        .push
        (
          this.syncWsConnection(serverProperties)
            .pipe(
              startWith(0),
              switchMap(() =>
                this.extractSocketInitiatedConnectionData()))
            .subscribe
            (
              {
                next: (extricatedData_: any) => {

                  let icmpVisualElements = ICMP_visualElements[serverProperties.serverClusterName];
                  let iisVisualElements = IIS_visualElements[serverProperties.serverClusterName];
                  let dskSpcVisualElements = dskSpc_visualElements[serverProperties.serverClusterName];
                  let dbPerformanceVisualElements = dbPerformanceElements![serverProperties.serverClusterName];
                  let dbServicesVisualElements = dbServicesElements![serverProperties.serverClusterName];

                  let icmpInnerSpanText;

                  let apiResponse = extricatedData_['responds'][serverProperties.serverClusterName];


                  if (extricatedData_['responds'])
                  {
                    for (let index = 0; index < 4; index++)
                    {
                      if (apiResponse[index] === true
                        && icmpVisualElements[index].nativeElement.classList.contains('c-pill--danger')) {

                        this.activateProperConnectionVisualElements(serverProperties, icmpVisualElements, iisVisualElements, dskSpcVisualElements, dbPerformanceVisualElements, dbServicesVisualElements, index);

                      } else if (apiResponse[index] === false
                        && !icmpVisualElements[index].nativeElement.classList.contains('c-pill--danger')) {

                        this.activate_improperConnectionVisualElements(serverProperties, icmpVisualElements, iisVisualElements, dskSpcVisualElements, index);
                      }
                    }
                  }
                }
              }
            )
        );
    }


    private handleConnectionDropDown(serverProperties: ICMP_clusterAuthProperties,
                                  ICMP_visualElements: {[dict_key: string]: ElementRef<HTMLElement>[] },
                                  IIS_visualElements: {[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                                  dskSpc_visualElements:{[dict_key: string]: ElementRef<HTMLButtonElement>[] },
                                  dbPerformanceElements?: {[dict_key: string]: ElementRef<HTMLElement>[] },
                                  dbServicesElements?:{[dict_key:string]: ElementRef<HTMLElement>[]})
    {
      // Handling Errors...
      this.connectionSubscriptions
        .push
        (
          this.wsConnectionService
            .getErrorSubject()
            .subscribe((data: any) =>
            {

              console.info("No proper connection established");

              let iisVisualElements = IIS_visualElements[serverProperties.serverClusterName];
              let dskSpcVisualElements = dskSpc_visualElements[serverProperties.serverClusterName];

              for(let index = 0; index < 4; index++)
              {
                iisVisualElements[index].nativeElement.disabled  = true;
                dskSpcVisualElements[index].nativeElement.disabled = true;
              }

              // Handle reconnection method...
              this.ngZone.run(async()=>
              {
                // First reconnection attempt
                await this.delay(ICMP_CP.RECONNECTION_TIME_INTERVAL_MS).then(()=>
                {
                  this.attemptConnectionEstablishment(serverProperties, ICMP_visualElements, IIS_visualElements, dskSpc_visualElements, dbPerformanceElements, dbServicesElements);
                })

                // Second reconnection attempt
                await this.delay(ICMP_CP.RECONNECTION_TIME_INTERVAL_MS).then(()=>
                {
                  this.attemptConnectionEstablishment(serverProperties, ICMP_visualElements, IIS_visualElements, dskSpc_visualElements, dbPerformanceElements, dbServicesElements);
                })

              })

            })
        )
    }


    private activateProperConnectionVisualElements(serverProperties:any, icmpVisualElement: any, iisVisualElement:any,
                                                                                                    dskSpcVisualElement:any,  dbPerformanceVisualElements:any, dbServicesVisualElements:any,
                                                                                                    index: number,
                                                                                                    icmpInnerSpanText: any = icmpVisualElement[index].nativeElement.querySelector('.pill-text'))
    {
      icmpVisualElement[index]
        .nativeElement.classList.remove('c-pill--danger');

      icmpVisualElement[index]
        .nativeElement.classList.add('c-pill--success');

      /*spanText = dedicatedElement[index]
        .nativeElement.querySelector('.pill-text');*/

      icmpInnerSpanText!.innerHTML = 'متصل';

      iisVisualElement[index].nativeElement.disabled  = false;
      dskSpcVisualElement[index].nativeElement.disabled = false;

      if(serverProperties.serverClusterName === this.icmpClusterProperties.icmpCP_database.serverClusterName
          && dbPerformanceVisualElements.length !== 0)
      {
        dbPerformanceVisualElements[index].nativeElement.disabled = false;
      }
    }


    private activate_improperConnectionVisualElements(serverProperties:any, icmpVisualElement: any, iisVisualElement:any, dskSpcVisualElement:any,
                                                      index: number, icmpInnerSpanText: any = icmpVisualElement[index].nativeElement.querySelector('.pill-text'))
    {
      icmpVisualElement[index]
        .nativeElement.classList.add('c-pill--danger');

      icmpVisualElement[index]
        .nativeElement.classList.remove('c-pill--success');

      /*spanText = visualElement[index]
        .nativeElement.querySelector('.pill-text');*/

      icmpInnerSpanText!.innerHTML = 'غير متصل';

      iisVisualElement[index].nativeElement.disabled  = true;
      dskSpcVisualElement[index].nativeElement.disabled = true;

    }


    public detachICMP_subscriptions()
    {
      if(this.connectionSubscriptions)
        this.connectionSubscriptions.forEach(subscription => subscription.unsubscribe());
    }


    private delay(microSeconds:number)
    {
      return new Promise(resolve => setTimeout(resolve, microSeconds));
    }


}
