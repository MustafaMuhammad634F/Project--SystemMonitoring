// بسم الله الواحد الأحد العليم الصمد

import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataProcessesComponent} from "../sub-components/data-processes/data-processes.component";
import {DiskSpacesComponent} from "../sub-components/disk-spaces/disk-spaces.component";
import {GenericHttpFunctionalityMediator} from "../functionality-mediators/generic-http-functionality-mediator";
import {HttpConnectionService} from "../connection-services/http-connection.service";
import {ICMP_CP} from "../auth-properties/i-c-m-p_-c-p";
import {ICMP_wsFunctionalityMediator} from "../functionality-mediators/i-c-m-p_ws-functionality-mediator";
import {WsConnectionService} from "../connection-services/ws-connection.service";
import {DbServicesFunctionalProperties} from "../auth-properties/db-services-functional-properties";
import {DbPerformanceFunctionalProperties} from "../auth-properties/db-performance-functional-properties";
import {IIS_FunctionalProperties} from "../auth-properties/i-i-s_-functional-properties";
import {DskSpcFunctionalProperties} from "../auth-properties/dsk-spc-functional-properties";


type ClusterVisualElements =
{
  [dict_key:string] :ElementRef<HTMLElement>[]
}

type ButtonVisualElements =
  {
    [dict_key:string] :ElementRef<HTMLButtonElement>[]
  }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataProcessesComponent, DiskSpacesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, AfterViewInit{

  constructor(private wsConnectionService:WsConnectionService , private httpConnectionService:HttpConnectionService, private ngZone:NgZone)
  {}



  // ─────────────────────────────────────Integration Servers─────────────────────────────────────

  // Integration Server #1
  @ViewChild('int_srv_icmp_1') intSrv_icmp_1!:ElementRef;
  @ViewChild('int_srv_iis_btn_1') intSrv_iis_btn_1!:ElementRef<HTMLButtonElement>;
  @ViewChild('int_srv_iis_spinner_1') intSrv_iis_spinner_1!:ElementRef;
  @ViewChild('int_srv_imply_iis_sts_1') intSrv_imply_iis_sts_1!:ElementRef;
  @ViewChild('int_srv_iis_err_div_1') intSrv_iis_err_div_1!:ElementRef;
  @ViewChild('int_srv_iis_err_txt_1') intSrv_iis_err_txt_1!:ElementRef;
  @ViewChild('int_srv_iis_btn_rst_1') intSrv_iis_btn_rst_1!:ElementRef;
  @ViewChild('int_srv_dsk_spc_btn_1') intSrv_dsk_spc_btn_1!:ElementRef;

  // Integration Server #2
  @ViewChild('int_srv_icmp_2') intSrv_icmp_2!:ElementRef;
  @ViewChild('int_srv_iis_btn_2') intSrv_iis_btn_2!:ElementRef<HTMLButtonElement>;
  @ViewChild('int_srv_iis_spinner_2') intSrv_iis_spinner_2!:ElementRef;
  @ViewChild('int_srv_imply_iis_sts_2') intSrv_imply_iis_sts_2!:ElementRef;
  @ViewChild('int_srv_iis_err_div_2') intSrv_iis_err_div_2!:ElementRef;
  @ViewChild('int_srv_iis_err_txt_2') intSrv_iis_err_txt_2!:ElementRef;
  @ViewChild('int_srv_iis_btn_rst_2') intSrv_iis_btn_rst_2!:ElementRef;
  @ViewChild('int_srv_dsk_spc_btn_2') intSrv_dsk_spc_btn_2!:ElementRef;


  // Integration Server #3
  @ViewChild('int_srv_icmp_3') intSrv_icmp_3!:ElementRef;
  @ViewChild('int_srv_iis_btn_3') intSrv_iis_btn_3!:ElementRef<HTMLButtonElement>;
  @ViewChild('int_srv_iis_spinner_3') intSrv_iis_spinner_3!:ElementRef;
  @ViewChild('int_srv_imply_iis_sts_3') intSrv_iis_imply_iis_sts_3!:ElementRef;
  @ViewChild('int_srv_iis_err_div_3') intSrv_iis_err_div_3!:ElementRef;
  @ViewChild('int_srv_iis_err_txt_3') intSrv_iis_err_txt_3!:ElementRef;
  @ViewChild('int_srv_iis_btn_rst_3') intSrv_iis_btn_rst_3!:ElementRef;
  @ViewChild('int_srv_dsk_spc_btn_3') intSrv_dsk_spc_btn_3!:ElementRef;


  // Integration Server #4
  @ViewChild('int_srv_icmp_4') intSrv_icmp_4!:ElementRef;
  @ViewChild('int_srv_iis_btn_4') intSrv_iis_btn_4!:ElementRef<HTMLButtonElement>;
  @ViewChild('int_srv_iis_spinner_4') intSrv_iis_spinner_4!:ElementRef;
  @ViewChild('int_srv_imply_iis_sts_4') intSrv_iis_imply_iis_sts_4!:ElementRef;
  @ViewChild('int_srv_iis_err_div_4') intSrv_iis_err_div_4!:ElementRef;
  @ViewChild('int_srv_iis_err_txt_4') intSrv_iis_err_txt_4!:ElementRef;
  @ViewChild('int_srv_iis_btn_rst_4') intSrv_iis_btn_rst_4!:ElementRef;
  @ViewChild('int_srv_dsk_spc_btn_4') intSrv_dsk_spc_btn_4!:ElementRef;


  // ─────────────────────────────────────Database Servers─────────────────────────────────────

  // Database Server #1
  @ViewChild('db_srv_icmp_1') dbSrv_icmp_1!:ElementRef;
  @ViewChild('db_chk_imply_1') dbChk_imply_1!:ElementRef;
  @ViewChild('db_chk_perf_btn_1') dbChk_perf_btn_1!:ElementRef;
  @ViewChild('db_service_sts_div_1') dbService_sts_div_1!:ElementRef;
  @ViewChild('db_service_sts_dot_1') dbService_sts_dot_1!:ElementRef;
  @ViewChild('db_service_sts_txt_1') dbService_sts_txt_1!:ElementRef;
  @ViewChild('db_service_rst_btn_1') dbService_rst_btn_1!:ElementRef;
  @ViewChild('db_service_sts_proc_txt_1') dbService_sts_proc_txt_1!:ElementRef;
  @ViewChild('db_agent_service_sts_div_1') dbService_agent_sts_div_1!:ElementRef;
  @ViewChild('db_agent_service_sts_dot_1') dbService_agent_sts_dot_1!:ElementRef;
  @ViewChild('db_agent_service_sts_txt_1') dbService_agent_sts_txt_1!:ElementRef;
  @ViewChild('db_agent_service_rst_btn_1') dbService_agent_rst_btn_1!:ElementRef;
  @ViewChild('db_agent_service_sts_proc_txt_1') dbService_agent_sts_proc_txt_1!:ElementRef;
  @ViewChild('db_srv_iis_btn_1') dbSrv_iis_btn_1!:ElementRef;
  @ViewChild('db_srv_iis_spinner_1') dbSrv_iis_spinner_1!:ElementRef;
  @ViewChild('db_srv_imply_iis_sts_1') dbSrv_imply_iis_sts_1!:ElementRef;
  @ViewChild('db_srv_iis_err_div_1') dbSrv_iis_err_div_1!:ElementRef;
  @ViewChild('db_srv_iis_err_txt_1') dbSrv_iis_err_txt_1!:ElementRef;
  @ViewChild('db_srv_iis_btn_rst_1') dbSrv_iis_btn_rst_1!:ElementRef;
  @ViewChild('db_srv_dsk_spc_btn_1') dbSrv_dsk_spc_btn_1!:ElementRef;


  // Database Server #2
  @ViewChild('db_srv_icmp_2') dbSrv_icmp_2!:ElementRef;
  @ViewChild('db_chk_imply_2') dbChk_imply_2!:ElementRef;
  @ViewChild('db_chk_perf_btn_2') dbChk_perf_btn_2!:ElementRef;
  @ViewChild('db_service_sts_div_2') dbService_sts_div_2!:ElementRef;
  @ViewChild('db_service_sts_dot_2') dbService_sts_dot_2!:ElementRef;
  @ViewChild('db_service_sts_txt_2') dbService_sts_txt_2!:ElementRef;
  @ViewChild('db_service_rst_btn_2') dbService_rst_btn_2!:ElementRef;
  @ViewChild('db_service_sts_proc_txt_2') dbService_sts_proc_txt_2!:ElementRef;
  @ViewChild('db_agent_service_sts_div_2') dbService_agent_sts_div_2!:ElementRef;
  @ViewChild('db_agent_service_sts_dot_2') dbService_agent_sts_dot_2!:ElementRef;
  @ViewChild('db_agent_service_sts_txt_2') dbService_agent_sts_txt_2!:ElementRef;
  @ViewChild('db_agent_service_rst_btn_2') dbService_agent_rst_btn_2!:ElementRef;
  @ViewChild('db_agent_service_sts_proc_txt_2') dbService_agent_sts_proc_txt_2!:ElementRef;
  @ViewChild('db_srv_iis_btn_2') dbSrv_iis_btn_2!:ElementRef;
  @ViewChild('db_srv_iis_spinner_2') dbSrv_iis_spinner_2!:ElementRef;
  @ViewChild('db_srv_imply_iis_sts_2') dbSrv_imply_iis_sts_2!:ElementRef;
  @ViewChild('db_srv_iis_err_div_2') dbSrv_iis_err_div_2!:ElementRef;
  @ViewChild('db_srv_iis_err_txt_2') dbSrv_iis_err_txt_2!:ElementRef;
  @ViewChild('db_srv_iis_btn_rst_2') dbSrv_iis_btn_rst_2!:ElementRef;
  @ViewChild('db_srv_dsk_spc_btn_2') dbSrv_dsk_spc_btn_2!:ElementRef;


  // Database Server #3
  @ViewChild('db_srv_icmp_3') dbSrv_icmp_3!:ElementRef;
  @ViewChild('db_chk_imply_3') dbChk_imply_3!:ElementRef;
  @ViewChild('db_chk_perf_btn_3') dbChk_perf_btn_3!:ElementRef;
  @ViewChild('db_service_sts_div_3') dbService_sts_div_3!:ElementRef;
  @ViewChild('db_service_sts_dot_3') dbService_sts_dot_3!:ElementRef;
  @ViewChild('db_service_sts_txt_3') dbService_sts_txt_3!:ElementRef;
  @ViewChild('db_service_rst_btn_3') dbService_rst_btn_3!:ElementRef;
  @ViewChild('db_service_sts_proc_txt_3') dbService_sts_proc_txt_3!:ElementRef;
  @ViewChild('db_agent_service_sts_div_3') dbService_agent_sts_div_3!:ElementRef;
  @ViewChild('db_agent_service_sts_dot_3') dbService_agent_sts_dot_3!:ElementRef;
  @ViewChild('db_agent_service_sts_txt_3') dbService_agent_sts_txt_3!:ElementRef;
  @ViewChild('db_agent_service_rst_btn_3') dbService_agent_rst_btn_3!:ElementRef;
  @ViewChild('db_agent_service_sts_proc_txt_3') dbService_agent_sts_proc_txt_3!:ElementRef;
  @ViewChild('db_srv_iis_btn_3') dbSrv_iis_btn_3!:ElementRef;
  @ViewChild('db_srv_iis_spinner_3') dbSrv_iis_spinner_3!:ElementRef;
  @ViewChild('db_srv_imply_iis_sts_3') dbSrv_imply_iis_sts_3!:ElementRef;
  @ViewChild('db_srv_iis_err_div_3') dbSrv_iis_err_div_3!:ElementRef;
  @ViewChild('db_srv_iis_err_txt_3') dbSrv_iis_err_txt_3!:ElementRef;
  @ViewChild('db_srv_iis_btn_rst_3') dbSrv_iis_btn_rst_3!:ElementRef;
  @ViewChild('db_srv_dsk_spc_btn_3') dbSrv_dsk_spc_btn_3!:ElementRef;


  // Database Server #4
  @ViewChild('db_srv_icmp_4') dbSrv_icmp_4!:ElementRef;
  @ViewChild('db_chk_imply_4') dbChk_imply_4!:ElementRef;
  @ViewChild('db_chk_perf_btn_4') dbChk_perf_btn_4!:ElementRef;
  @ViewChild('db_service_sts_div_4') dbService_sts_div_4!:ElementRef;
  @ViewChild('db_service_sts_dot_4') dbService_sts_dot_4!:ElementRef;
  @ViewChild('db_service_sts_txt_4') dbService_sts_txt_4!:ElementRef;
  @ViewChild('db_service_rst_btn_4') dbService_rst_btn_4!:ElementRef;
  @ViewChild('db_service_sts_proc_txt_4') dbService_sts_proc_txt_4!:ElementRef;
  @ViewChild('db_agent_service_sts_div_4') dbService_agent_sts_div_4!:ElementRef;
  @ViewChild('db_agent_service_sts_dot_4') dbService_agent_sts_dot_4!:ElementRef;
  @ViewChild('db_agent_service_sts_txt_4') dbService_agent_sts_txt_4!:ElementRef;
  @ViewChild('db_agent_service_rst_btn_4') dbService_agent_rst_btn_4!:ElementRef;
  @ViewChild('db_agent_service_sts_proc_txt_4') dbService_agent_sts_proc_txt_4!:ElementRef;
  @ViewChild('db_srv_iis_btn_4') dbSrv_iis_btn_4!:ElementRef;
  @ViewChild('db_srv_iis_spinner_4') dbSrv_iis_spinner_4!:ElementRef;
  @ViewChild('db_srv_imply_iis_sts_4') dbSrv_imply_iis_sts_4!:ElementRef;
  @ViewChild('db_srv_iis_err_div_4') dbSrv_iis_err_div_4!:ElementRef;
  @ViewChild('db_srv_iis_err_txt_4') dbSrv_iis_err_txt_4!:ElementRef;
  @ViewChild('db_srv_iis_btn_rst_4') dbSrv_iis_btn_rst_4!:ElementRef;
  @ViewChild('db_srv_dsk_spc_btn_4') dbSrv_dsk_spc_btn_4!:ElementRef;


  // ─────────────────────────────────────Application Servers─────────────────────────────────────

  // Application Server #1
  @ViewChild('app_srv_icmp_1') appSrv_icmp_1!:ElementRef;
  @ViewChild('app_srv_iis_btn_1') appSrv_iis_btn_1!:ElementRef;
  @ViewChild('app_srv_iis_spinner_1') appSrv_iis_spinner_1!:ElementRef;
  @ViewChild('app_srv_imply_iis_sts_1') appSrv_iis_imply_iis_sts_1!:ElementRef;
  @ViewChild('app_srv_iis_err_div_1') appSrv_iis_err_div_1!:ElementRef;
  @ViewChild('app_srv_iis_err_txt_1') appSrv_iis_err_txt_1!:ElementRef;
  @ViewChild('app_srv_iis_btn_rst_1') appSrv_iis_btn_rst_1!:ElementRef;
  @ViewChild('app_srv_dsk_spc_btn_1') appSrv_dsk_spc_btn_1!:ElementRef;


  // Application Server #2
  @ViewChild('app_srv_icmp_2') appSrv_icmp_2!:ElementRef;
  @ViewChild('app_srv_iis_btn_2') appSrv_iis_btn_2!:ElementRef;
  @ViewChild('app_srv_iis_spinner_2') appSrv_iis_spinner_2!:ElementRef;
  @ViewChild('app_srv_imply_iis_sts_2') appSrv_iis_imply_iis_sts_2!:ElementRef;
  @ViewChild('app_srv_iis_err_div_2') appSrv_iis_err_div_2!:ElementRef;
  @ViewChild('app_srv_iis_err_txt_2') appSrv_iis_err_txt_2!:ElementRef;
  @ViewChild('app_srv_iis_btn_rst_2') appSrv_iis_btn_rst_2!:ElementRef;
  @ViewChild('app_srv_dsk_spc_btn_2') appSrv_dsk_spc_btn_2!:ElementRef;


  // Application Server #3
  @ViewChild('app_srv_icmp_3') appSrv_icmp_3!:ElementRef;
  @ViewChild('app_srv_iis_btn_3') appSrv_iis_btn_3!:ElementRef;
  @ViewChild('app_srv_iis_spinner_3') appSrv_iis_spinner_3!:ElementRef;
  @ViewChild('app_srv_imply_iis_sts_3') appSrv_iis_imply_iis_sts_3!:ElementRef;
  @ViewChild('app_srv_iis_err_div_3') appSrv_iis_err_div_3!:ElementRef;
  @ViewChild('app_srv_iis_err_txt_3') appSrv_iis_err_txt_3!:ElementRef;
  @ViewChild('app_srv_iis_btn_rst_3') appSrv_iis_btn_rst_3!:ElementRef;
  @ViewChild('app_srv_dsk_spc_btn_3') appSrv_dsk_spc_btn_3!:ElementRef;


  // Application Server #4
  @ViewChild('app_srv_icmp_4') appSrv_icmp_4!:ElementRef;
  @ViewChild('app_srv_iis_btn_4') appSrv_iis_btn_4!:ElementRef;
  @ViewChild('app_srv_iis_spinner_4') appSrv_iis_spinner_4!:ElementRef;
  @ViewChild('app_srv_imply_iis_sts_4') appSrv_iis_imply_iis_sts_4!:ElementRef;
  @ViewChild('app_srv_iis_err_div_4') appSrv_iis_err_div_4!:ElementRef;
  @ViewChild('app_srv_iis_err_txt_4') appSrv_iis_err_txt_4!:ElementRef;
  @ViewChild('app_srv_iis_btn_rst_4') appSrv_iis_btn_rst_4!:ElementRef;
  @ViewChild('app_srv_dsk_spc_btn_4') appSrv_dsk_spc_btn_4!:ElementRef;


  @ViewChild(DataProcessesComponent) databaseProcessesComponent!:DataProcessesComponent;
  @ViewChild(DiskSpacesComponent) diskSpaceInfoComponent!:DiskSpacesComponent;

  protected httpMediator:GenericHttpFunctionalityMediator = new GenericHttpFunctionalityMediator(this.httpConnectionService, this.ngZone);
  private icmpWsMediator:ICMP_wsFunctionalityMediator = new ICMP_wsFunctionalityMediator(this.wsConnectionService, this.ngZone);

  private icmpClusterProperties = new ICMP_CP();
  protected dbServiceCheckServerProperties = new DbServicesFunctionalProperties();
  protected dbPerformanceCheckServerProperties = new DbPerformanceFunctionalProperties();
  protected iisResetServerProperties = new IIS_FunctionalProperties();
  protected dskSpcCheckServerProperties = new DskSpcFunctionalProperties();

  ngAfterViewInit(): void {
    //this.establish_ICMP_iterativeCheck();
  }




  establish_ICMP_iterativeCheck() {

    let integrationClusterProperties = this.icmpClusterProperties.icmpCP_integration;

    const intServersICMP_visualElements:ClusterVisualElements = {};
    const intServersIIS_visualElements:ButtonVisualElements = {};
    const intServersDskSpc_visualElements:ButtonVisualElements = {};

    intServersICMP_visualElements[integrationClusterProperties.serverClusterName]
                          = [this.intSrv_icmp_1, this.intSrv_icmp_2, this.intSrv_icmp_3, this.intSrv_icmp_4];

    intServersIIS_visualElements[integrationClusterProperties.serverClusterName]
                          = [this.intSrv_iis_btn_1, this.intSrv_iis_btn_2, this.intSrv_iis_btn_3, this.intSrv_iis_btn_4];

    intServersDskSpc_visualElements[integrationClusterProperties.serverClusterName]
                          = [this.intSrv_dsk_spc_btn_1, this.intSrv_dsk_spc_btn_2, this.intSrv_dsk_spc_btn_3, this.intSrv_dsk_spc_btn_4];

    this.icmpWsMediator.propagateConnectionStatus(integrationClusterProperties, intServersICMP_visualElements,
                                                                                                                          intServersIIS_visualElements, intServersDskSpc_visualElements);
  }

  establishDbServiceIterativeCheck() {
    this.httpMediator.syncCheckDbServices(this.dbServiceCheckServerProperties.dbService_iterChkAuthSP_1,
                                                                                    [this.dbService_sts_div_1, this.dbService_sts_dot_1, this.dbService_sts_txt_1,
                                                                                      this.dbService_rst_btn_1, this.dbService_sts_proc_txt_1],
                                                                                    [this.dbService_agent_sts_div_1, this.dbService_agent_sts_dot_1,
                                                                                      this.dbService_agent_sts_txt_1, this.dbService_agent_rst_btn_1,
                                                                                      this.dbService_agent_sts_proc_txt_1],
                                                                                    DbServicesFunctionalProperties.INTERVAL_TIME_DB1);
  }

  establishDbPerformanceCheck() {
    this.httpMediator.syncCheckDbPerformance(this.dbPerformanceCheckServerProperties.dbPerformanceAuthSP_1,
                                                                                                  this.dbChk_imply_1);
  }

  detachAppComponentWsConnections() {
    this.wsConnectionService.closeWsConnection(this.icmpClusterProperties.icmpCP_integration.endPointPath);
    this.wsConnectionService.closeWsConnection(this.icmpClusterProperties.icmpCP_database.endPointPath);
    this.wsConnectionService.closeWsConnection(this.icmpClusterProperties.icmpCP_application.endPointPath);

    this.icmpWsMediator.detachICMP_subscriptions();
  }

  setupMainApplicationServices() {
    this.establish_ICMP_iterativeCheck();
    this.establishDbPerformanceCheck();
    this.establishDbServiceIterativeCheck();
  }




  ngOnDestroy(): void {
    this.httpMediator.detachHttpSubscriptions();
    this.icmpWsMediator.detachICMP_subscriptions();
  }





}
