// اللهم بسمك الأعظم لا إله إلا أنت سبحانك إني كنت  من الظالمين

export interface GenericAuthenticationPropertiesTemplate
{

}

export interface ICMP_clusterAuthProperties
{
  socketKey:string,
  readonly serverClusterName:string,
  readonly endPointPath:string,
  readonly intervalTimeValue:number
}

export interface IIS_AuthenticationReqBody
{
  readonly ip:string,
  readonly username:string,
  readonly password:string
}

export interface DbService_iterChkAuthReqBody
{
  readonly ip: string,
  readonly username:string,
  readonly password:string,
  readonly serviceName:string,
  readonly ServiceName_:string
}


export interface DbService_uniChkAuthReqBody
{
  readonly ip:string,
  readonly username:string,
  readonly password:string,
  readonly serviceName:string
}

export interface DbPerformanceProperties
{
  readonly connectionString:string,
  socketKey?:string,
  readonly intervalTimeValue:number
}


export interface DskSpcAuthReqBody
{
  readonly ip:string,
  readonly username:string,
  readonly password:string
}
