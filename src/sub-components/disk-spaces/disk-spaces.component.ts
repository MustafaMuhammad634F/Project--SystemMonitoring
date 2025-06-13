// بسم الله الرحمن الرحيم

import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpConnectionService} from "../../connection-services/http-connection.service";
//import {DskSpcFunctionalProperties} from "../../auth-properties/dsk-spc-functional-properties";
import {
  DskSpcAuthReqBody
} from "../../auth-properties/generic-authentication-properties-template";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-disk-spaces',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './disk-spaces.component.html',
  styleUrl: './disk-spaces.component.scss'
})
export class DiskSpacesComponent
{
 constructor(private httpConnectionService:HttpConnectionService)
 {}

  @ViewChild('dskSpcView') diskSpcExternalView!:ElementRef;
  @ViewChild('closeDsk_spc_view_btn') dskSpcViewClsBtn!:ElementRef;
  @ViewChild('dskSpcTable') dskSpcTable!:ElementRef;
  @ViewChild('dskSpcData') dskSpcData!:ElementRef;
  @ViewChild('overlay') viewOverlay!:ElementRef;

  private retrieveDskSpcSubscription!:Subscription;
  protected api_exteriorExtricatedData:any[] = [{}];

  validateCloseDskSpcView(_event:Event)
  {
    if(!this.diskSpcExternalView.nativeElement.contains('hidden'))
    {
      this.closeDskSpcView();
    }
  }


  /**
   *  @Explicit-Invocation → Main Component.
   * */
  openDskSpcView(serverProperties:DskSpcAuthReqBody)
  {
    if(this.retrieveDskSpcSubscription)
      this.retrieveDskSpcSubscription.unsubscribe();

    this.retrieveDskSpcSubscription = this.httpConnectionService.initiateConnection_checkDskSpc(serverProperties)
      .subscribe((extricatedData:any)=>
      {
        if(extricatedData)
        {
          this.diskSpcExternalView.nativeElement.classList.remove('hidden');
          this.viewOverlay.nativeElement.classList.remove("hidden");
          this.api_exteriorExtricatedData = extricatedData;
        }
      });
  }


  /**
   * @Implicit-Invocation → Current Component
   * */
  closeDskSpcView()
  {
    this.diskSpcExternalView.nativeElement.classList.add("hidden");
    this.viewOverlay.nativeElement.classList.add("hidden");

    if(this.retrieveDskSpcSubscription)
    {
      this.retrieveDskSpcSubscription.unsubscribe();
    }
  }


  trackById(_index: number, item: any): number
  {
    return item.label; // or any unique identifier
  }

  implyDiskSpace(dskSpcPercentage: any)
  {
    if(dskSpcPercentage > 75) return '#F44336';
    else if(dskSpcPercentage > 60) return '#FFC107';
    else if (dskSpcPercentage <= 60) return '#1bbb4d';
    return '#F44336';
  }

}
