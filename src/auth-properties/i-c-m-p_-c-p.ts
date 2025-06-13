import {ICMP_clusterAuthProperties} from "./generic-authentication-properties-template";


export class ICMP_CP
{
  public static readonly RECONNECTION_TIME_INTERVAL_MS:number = 10000;

  public readonly icmpCP_integration:ICMP_clusterAuthProperties =
  {
    socketKey: 'Sock-Key-PRIM-S-01',
    serverClusterName: 'Integration Servers',
    endPointPath: '/pingCluster?ip=99.7.40.1',
    intervalTimeValue: 5000
  }

  public readonly icmpCP_database:ICMP_clusterAuthProperties =
  {
    socketKey: 'Sock-Key-PRIM-S-02',
    serverClusterName: 'Database Servers',
    endPointPath: '/pingCluster?ip=99.7.40.1',
    intervalTimeValue: 25000
  }

  public readonly icmpCP_application:ICMP_clusterAuthProperties =
  {
    socketKey: 'Sock-Key-PRIM-S-03',
    serverClusterName: 'Application Servers',
    endPointPath:'/pingCluster?ip=99.7.40.1',
    intervalTimeValue: 25000,
  }

}
