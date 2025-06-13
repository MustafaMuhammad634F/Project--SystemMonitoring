// بسم الله الرحمن الرحيم

import {Component, ElementRef, NgZone, OnDestroy, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WsConnectionService} from "../../connection-services/ws-connection.service";
import {DbPerformanceProperties} from "../../auth-properties/generic-authentication-properties-template";
import {HttpConnectionService} from "../../connection-services/http-connection.service";
import {Observable, Subscription, switchMap} from "rxjs";
//import {SubscriptionLog} from "rxjs/internal/testing/SubscriptionLog";
import { EventEmitter } from '@angular/core';
import {DbPerformanceFunctionalProperties} from "../../auth-properties/db-performance-functional-properties";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-data-processes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './data-processes.component.html',
  styleUrl: './data-processes.component.scss'
})
export class DataProcessesComponent implements OnDestroy
{
  constructor(private wsConnectionService:WsConnectionService, private httpConnectionService:HttpConnectionService, private ngZone:NgZone)
  {}

  @ViewChild('dbProcessView')  databaseExternalView!:ElementRef;
  @ViewChild('connectionAwaiter') connectionAwaiterLoader!:ElementRef;
  @ViewChild('closeDB_view_btn') databaseViewClsBtn!:ElementRef;
  @ViewChild('dbProcessTableContainer') dbProcessTableContainer!:ElementRef;
  @ViewChild('dbProcessTable') databaseProcessTable!:ElementRef;
  @ViewChildren('cpyBtn') processCpyBtn!:QueryList<ElementRef>;
  @ViewChildren('processText') processText!:QueryList<ElementRef>;
  @ViewChildren('cpyValidationTxt') cpyValidationTxt!:QueryList<ElementRef>;
  @ViewChild('overlay') viewOverlay!:ElementRef;
  @Output() detach_outerWsConnection = new EventEmitter<any>();
  @Output() detach_innerWsConnection = new EventEmitter<any>();

  protected api_exteriorExtricatedData:any = [{}];
  private endProcessSubscription!:Subscription;
  private displayViewSubscription!:Subscription;
  public mainEndPoint = DbPerformanceFunctionalProperties.DB_PERFORMANCE_VIEW_ENDPOINT_PATH;

  public syncWsConnection(serverProperties:DbPerformanceProperties):Observable<boolean>
  {
    this.wsConnectionService.socketKey = 'Sock-Key-PRIM-DERIVED-01';
    serverProperties.socketKey = this.wsConnectionService.socketKey;
    return this.wsConnectionService.initiateConnection_dbProcessesExtraction(serverProperties);
  }

  public extractSocketInitiatedConnectionData()
  {
    return this.wsConnectionService.getTransmittedMsgStreamObservable();
  }

  /**
   *  @Explicit-Invocation → Main Component.
   * */
  openDbView(serverProperties:DbPerformanceProperties)
  {
    if(this.displayViewSubscription)
      this.displayViewSubscription.unsubscribe();

    this.detach_outerWsConnection.emit();

    this.databaseExternalView.nativeElement.classList.remove('hidden');
    this.viewOverlay.nativeElement.classList.remove("hidden");
    this.connectionAwaiterLoader.nativeElement.style.display = 'block';
    this.dbProcessTableContainer.nativeElement.style.display = 'none';

    this.delay(3000).then(()=>
    {
      this.connectionAwaiterLoader.nativeElement.style.display = 'none';
      this.dbProcessTableContainer.nativeElement.style.display = 'block';
    })

    this.displayViewSubscription = this.syncWsConnection(serverProperties)
      .pipe(switchMap(()=>
          this.extractSocketInitiatedConnectionData()))
          .subscribe(extricatedData_=>
          {
            if(extricatedData_)
            {
              this.connectionAwaiterLoader.nativeElement.style.display = 'none';
              this.api_exteriorExtricatedData = extricatedData_;
            }
          })
  }

  /**
   *  @HTTP Connection-based
   * */
  endDbProcess(process:string, index:number)
  {
    if(this.endProcessSubscription)
      this.endProcessSubscription.unsubscribe();

    this.endProcessSubscription = this.httpConnectionService.initiateConnection_endDbProcess(process).subscribe(() =>
    {
      if(this.api_exteriorExtricatedData)
        this.api_exteriorExtricatedData.splice(index, 1);
    })
  }


  /**
   * @Implicit-Invocation → Current Component
   * */
  closeDbView(endPointPath:string)
  {
    if(this.displayViewSubscription)
      this.displayViewSubscription.unsubscribe();

    this.detach_innerWsConnection.emit();

    this.databaseExternalView.nativeElement.classList.add("hidden");
    this.viewOverlay.nativeElement.classList.add("hidden");

    this.wsConnectionService.closeWsConnection(endPointPath);
  }


  validateCloseDbView(_event:any, endPointPath:string)
  {
    if(!this.databaseExternalView.nativeElement.contains('hidden'))
    {
      this.closeDbView(endPointPath);
    }
  }


  copyToClipboard(text: string)
  {
    return navigator.clipboard.writeText(text);
  }

  cpyQuery(index:number)
  {
    this.cpyValidationTxt.get(index)!.nativeElement.style.display = 'block';
    this.cpyValidationTxt.get(index)!.nativeElement.style.transition = 'all 0.5s ease';
    this.processCpyBtn.get(index)!.nativeElement.style.display = 'none';

    this.copyToClipboard(this.processText.get(index)!.nativeElement.textContent);

    this.processCpyBtn.get(index)!.nativeElement.style.margin = '2px auto';

    this.delay(2000).then(()=>
    {
      this.processCpyBtn.get(index)!.nativeElement.style.display = 'block';
      this.cpyValidationTxt.get(index)!.nativeElement.style.display = 'none';
    })
  }

  private delay(microseconds:number)
  {
    return new Promise(resolve => setTimeout(resolve, microseconds));
  }

  ngOnDestroy(): void
  {
    if(this.endProcessSubscription)
      this.endProcessSubscription.unsubscribe();

    if(this.displayViewSubscription)
      this.displayViewSubscription.unsubscribe();
  }

}
