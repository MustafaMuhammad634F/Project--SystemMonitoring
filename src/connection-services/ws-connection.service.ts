// بسم الله الرحمن الرحيم

import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {
  DbPerformanceProperties,
  ICMP_clusterAuthProperties
} from "../auth-properties/generic-authentication-properties-template";
import {DbPerformanceFunctionalProperties} from "../auth-properties/db-performance-functional-properties";


interface EndPointInterface
{
  wsSocket:any,
  connectionState:BehaviorSubject<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class WsConnectionService {

  constructor() { }

  private baseURL = 'ws://99.7.40.14:5220';
  private endPoints:{[path:string]:EndPointInterface} = {};
  private messageSubject:{[key:string]:Subject<any>} = {};
  private errorSubject = new Subject<Error>();
  private sockets:{[key:string]:WebSocket} = {};

  private DB_PERFORMANCE_VIEW_ENDPOINT:string = DbPerformanceFunctionalProperties.DB_PERFORMANCE_VIEW_ENDPOINT_PATH;

  public socketKey = `5E7BFD1`;
  public socketTransmittedMessage!:any;
  public msgSub!:any;
  public errSub!:any;

  connect(path:any, socketKey:any, intervalTimeValue:number, serverClusterName?:string):void
  {
    if(this.endPoints[path])
      return;

    const fullURL = serverClusterName !== undefined
          ? `${this.baseURL}` + `${path}` +  `&serversCluster=` + `${serverClusterName}`
          : `${this.baseURL}` + `${path}`;

    this.messageSubject[socketKey] = new Subject<any>();
    //this.errorSubject[socketKey] = new Subject<any>();

    this.setMessageSubject(this.messageSubject[socketKey]);
    //this.setErrorSubject(this.errorSubject[socketKey]);

    this.sockets[socketKey] = new WebSocket(fullURL);

    let wsSocket = this.sockets[socketKey];

    const connectionState = new BehaviorSubject<boolean>(false);

    wsSocket.onopen = async() =>
    {
      /*
      Connection Level [Clustered Connection]
      ── Not Socket Dependant Connection ──.
      ── No need for defining separated subject
      while each connection established in a group [4 Servers - 1 Connection].
      */
      connectionState.next(true);
      await this.induceMessageStream('pulse connection', path, intervalTimeValue);
    };

    wsSocket.onmessage = async(event:any) =>
    {
      const data = JSON.parse(event.data);
      await this.getMessageSubject().next(data);
    };

    wsSocket.onerror = (error:any) =>
    {
      this.errorSubject.next(new Error("Can't establish websocket connection."));
      connectionState.next(false);
    };

    wsSocket.onclose = () =>
    {
      connectionState.next(false);

      delete this.endPoints[path];
      delete this.sockets[socketKey];
    };

    this.endPoints[path] = {wsSocket, connectionState};
  }




  initiateConnection_ICMP_echoRequests(serverProperties:ICMP_clusterAuthProperties)
  {
    this.connect(serverProperties.endPointPath, serverProperties.socketKey, serverProperties.intervalTimeValue, serverProperties.serverClusterName);

    this.socketTransmittedMessage = this.getMessageSubject().asObservable();

    this.setTransmittedMsgStreamObservable(this.socketTransmittedMessage);

    return this.endPoints[serverProperties.endPointPath].connectionState.asObservable();
  }

  initiateConnection_dbProcessesExtraction(serverProperties:DbPerformanceProperties)
  {
    this.connect(this.DB_PERFORMANCE_VIEW_ENDPOINT, serverProperties.socketKey, serverProperties.intervalTimeValue);

    this.socketTransmittedMessage = this.getMessageSubject().asObservable();

    this.setTransmittedMsgStreamObservable(this.socketTransmittedMessage);

    return this.endPoints[this.DB_PERFORMANCE_VIEW_ENDPOINT].connectionState.asObservable();
  }


  sendData(data:any, path:any)
  {
    if(this.endPoints[path] && this.endPoints[path].wsSocket.readyState === WebSocket.OPEN)
    {
      this.endPoints[path].wsSocket.send(JSON.stringify(data));
    }
  }


  async induceMessageStream(data:any, path:any, intervalTimeValue:number)
  {
    this.delay(500).then(()=>
    {
      setInterval(()=>
      {
        this.sendData(data, path);
      }, intervalTimeValue);
    })
  }

  closeWsConnection(path:string)
  {
    if(this.endPoints[path])
      this.endPoints[path].wsSocket.close();
  }


  setTransmittedMsgStreamObservable(_messageStream:any)
  {
    this.socketTransmittedMessage =  _messageStream;
  }

  getTransmittedMsgStreamObservable()
  {
    return this.socketTransmittedMessage;
  }


  setMessageSubject(_messageSubject:any)
  {
    this.msgSub = _messageSubject;
  }


  getMessageSubject()
  {
    return this.msgSub;
  }


  /*setErrorSubject(_errorSubject:any)
  {
    this.errSub = _errorSubject;
  }*/

  getErrorSubject()
  {
    return this.errorSubject.asObservable();
  }



  private delay(microSeconds:number)
  {
    return new Promise(resolve => setTimeout(resolve, microSeconds));
  }


}
