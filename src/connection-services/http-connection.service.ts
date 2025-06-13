// بسم الله الرحمن الرحيم

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {
  DbPerformanceProperties,
  DbService_iterChkAuthReqBody,
  DbService_uniChkAuthReqBody, DskSpcAuthReqBody,
  IIS_AuthenticationReqBody
} from "../auth-properties/generic-authentication-properties-template";
import {catchError, interval, startWith, switchMap, throwError} from "rxjs";
import {DskSpcFunctionalProperties} from "../auth-properties/dsk-spc-functional-properties";
import {DbServicesFunctionalProperties} from "../auth-properties/db-services-functional-properties";
import {IIS_FunctionalProperties} from "../auth-properties/i-i-s_-functional-properties";
import {DbPerformanceFunctionalProperties} from "../auth-properties/db-performance-functional-properties";

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

  constructor(private http:HttpClient) { }

  private baseURL = 'http://99.7.40.14:5220';

  private DB_SERVICE_CHECK_ENDPOINT_PATH:string = DbServicesFunctionalProperties.DB_SERVICE_CHECK_ENDPOINT_PATH;
  private DB_SERVICE_START_ENDPOINT_PATH:string = DbServicesFunctionalProperties.DB_SERVICE_START_ENDPOINT_PATH;
  private RESET_IIS_SERVICE_ENDPOINT_PATH:string = IIS_FunctionalProperties.RESET_IIS_ENDPOINT_PATH;
  private DISK_SPACE_VIEW_ENDPOINT_PATH:string = DskSpcFunctionalProperties.DISK_SPACE_VIEW_ENDPOINT_PATH;
  private DB_PERFORMANCE_CHECK_ENDPOINT_PATH:string = DbPerformanceFunctionalProperties.DB_PERFORMANCE_CHECK_ENDPOINT_PATH;


  initiateConnection_iterativeDbPerfCheck(serverProperties: DbPerformanceProperties)
  {
    const parameters = new HttpParams()
      .set('connStrName', serverProperties.connectionString);

    return interval(serverProperties.intervalTimeValue)
      .pipe(startWith(0), switchMap(()=>
        this.http.get(`${this.baseURL}`+`${this.DB_PERFORMANCE_CHECK_ENDPOINT_PATH}`, {params: parameters})),
        catchError(_err=>
        {
          return throwError(()=> new Error('HTTP Error!'));
        }));
  }


  initiateConnection_endDbProcess(process: string)
  {
    const parameters = new HttpParams()
      .set('processId', process);

    return this.http.get(`${this.baseURL}/endDbProcess`, {params: parameters}).pipe(catchError(_err=>throwError(()=>
    {
      new Error("Couldn't establish a connection with server.")
    })))
  }


  initiateConnection_uniDbServicesCheck(serverProperties:DbService_uniChkAuthReqBody)
  {
    return this.http.post(`${this.baseURL}` + `${this.DB_SERVICE_CHECK_ENDPOINT_PATH}`, serverProperties);
  }

  initiateConnection_iterativeDbServicesCheck(serverProperties:DbService_iterChkAuthReqBody, intervalTimeValue:number)
  {
    const requestBody:any = serverProperties;

    return interval(intervalTimeValue)
      .pipe(startWith(0), switchMap(()=>
        this.http.post(`${this.baseURL}`+`${this.DB_SERVICE_CHECK_ENDPOINT_PATH}`, requestBody)
      ))
  }

  initiateConnection_startDbService(serverProperties:DbService_uniChkAuthReqBody)
  {
    return this.http.post(`${this.baseURL}`+`${this.DB_SERVICE_START_ENDPOINT_PATH}`, serverProperties);
  }


  initiateConnection_resetIIS(serverProperties:IIS_AuthenticationReqBody)
  {
    const requestHeader = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');

    return this.http.post(`${this.baseURL}`+`${this.RESET_IIS_SERVICE_ENDPOINT_PATH}`, serverProperties, {headers: requestHeader})
      .pipe(catchError(_err =>
      {
        return throwError(()=>
            new Error("Couldn't establish a connection with server."));
      }))
  }


  initiateConnection_checkDskSpc(serverProperties:DskSpcAuthReqBody)
  {
    const requestHeader = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');

    return this.http.post(`${this.baseURL}`+`${this.DISK_SPACE_VIEW_ENDPOINT_PATH}`, serverProperties, {headers: requestHeader})
      .pipe(catchError(_err=>
      {
        return throwError(()=>
        new Error("Couldn't establish a connection with server."));
      }));
  }


}
