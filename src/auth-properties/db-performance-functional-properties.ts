// بسم الله الرحمن الرحيم

import {DbPerformanceProperties} from "./generic-authentication-properties-template";


export class DbPerformanceFunctionalProperties
{

  public static readonly DB_PERFORMANCE_VIEW_ENDPOINT_PATH:string =  '/checkDBPerf';
  public static readonly DB_PERFORMANCE_CHECK_ENDPOINT_PATH:string = '/dbPerformance';
  public static readonly CPU_TIME_FACTOR_MIN:number = 10000;
  public static readonly CPU_TIME_FACTOR_MAX:number = 35000;

  public readonly dbPerformanceAuthSP_1: DbPerformanceProperties =
  {
    connectionString:'DBConnection',
    socketKey:'Sock-Key-PRIM-DERIVED-01',
    intervalTimeValue:500,
  }

  public readonly dbPerformanceAuthSP_2:DbPerformanceProperties =
  {
    connectionString:'DBConnection',
    socketKey:'Sock-Key-PRIM-DERIVED-02',
    intervalTimeValue:15000
  }

  public readonly dbPerformanceAuthSP_3:DbPerformanceProperties =
  {
    connectionString:'DBConnection',
    socketKey:'Sock-Key-PRIM-DERIVED-03',
    intervalTimeValue:15000
  }

  public readonly dbPerformanceAuthSP_4:DbPerformanceProperties =
  {
    connectionString:'DBConnection',
    socketKey:'Sock-Key-PRIM-DERIVED-04',
    intervalTimeValue:15000
  }
}
