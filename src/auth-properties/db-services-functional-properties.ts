

import {
  DbService_iterChkAuthReqBody,
  DbService_uniChkAuthReqBody
} from "./generic-authentication-properties-template";


export class DbServicesFunctionalProperties
{
  // ──────────────────────────────────────────────────────────────────
  //                                            ──────────── UNI-CHECK ────────────
  // ──────────────────────────────────────────────────────────────────
  public static readonly DB_SERVICE_CHECK_ENDPOINT_PATH:string = '/dbServiceStatus';
  public static readonly DB_SERVICE_START_ENDPOINT_PATH:string = '/startDbService';
  public static readonly INTERVAL_TIME_DB1 = 9000;
  public static readonly INTERVAL_TIME_DB2 = 9000;
  public static readonly INTERVAL_TIME_DB3 = 9000;
  public static readonly INTERVAL_TIME_DB4 = 9000;

  public readonly dbServiceAuthSP_1:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.77.51',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER'
  };

  public readonly dbAgentServiceAuthSP_1:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.77.51',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'SQLSERVERAGENT'
  };


  public readonly dbServiceAuthSP_2:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER'
  };


  public readonly dbAgentServiceAuthSP_2:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'SQLSERVERAGENT'
  };


  public readonly dbServiceAuthSP_3:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER'
  };


  public readonly dbAgentServiceAuthSP_3:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'SQLSERVERAGENT'
  };



  public readonly dbServiceAuthSP_4:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER'
  };


  public readonly dbAgentServiceAuthSP_4:DbService_uniChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'SQLSERVERAGENT'
  };



  // ──────────────────────────────────────────────────────────────────
  //                                            ──────────── MULTI-CHECK ────────────
  //  ──────────────────────────────────────────────────────────────────

  public readonly dbService_iterChkAuthSP_1:DbService_iterChkAuthReqBody =
  {
    ip:'172.20.77.51',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER',
    ServiceName_:'SQLSERVERAGENT'
  };

  public readonly dbService_iterChkAuthSP_2:DbService_iterChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER',
    ServiceName_: 'SQLSERVERAGENT'
  };

  public readonly dbService_iterChkAuthSP_3:DbService_iterChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'SQLSERVERAGENT',
    ServiceName_:'SQLSERVERAGENT'
  };

  public readonly dbService_iterChkAuthSP_4:DbService_iterChkAuthReqBody =
  {
    ip:'172.20.82.47',
    username: 'Mustafa',
    password:'123456',
    serviceName: 'MSSQLSERVER',
    ServiceName_:'SQLSERVERAGENT'
  };

}
