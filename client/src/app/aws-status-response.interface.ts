export interface AwsStatusResponse {
  pipeLines: PipeLines;
  targetGroups: TargetGroups;
}

export interface TargetGroups {
  'ECS-TG-BOPlanParis2': Backoffice[];
  'ECS-TG-Backoffice': Backoffice[];
  'ECS-TG-CORE': Backoffice[];
  'ECS-TG-CORE-V2': Backoffice[];
  'ECS-TG-ElastAlertBO': Backoffice[];
  'ECS-TG-F2M': Backoffice[];
  'ECS-TG-Grafana-V2': Backoffice[];
  'ECS-TG-LOGSTASH-V3': Backoffice[];
  'ECS-TG-RedisBO': Backoffice[];
  'ECS-TG-SHOP-ENERGY-V3': Backoffice[];
  'ECS-TG-SHOP-TRAVEL-V3': Backoffice[];
  'ECS-TG-SHOP-V3': Backoffice[];
}

export interface PipeLines {
  backoffice: Backoffice[];
  bridgehttp: Backoffice[];
  concessionnaire: Backoffice[];
  Core: Backoffice[];
  corev2: Backoffice[];
  ElastAlert: Backoffice[];
  Free2Move: Backoffice[];
  grafana: Backoffice[];
  infra: Backoffice[];
  logstash: Backoffice[];
  mqtttokafka: Backoffice[];
  NPMPackage: Backoffice[];
  qos1: Backoffice[];
  Resources: Backoffice[];
  smartenergy: Backoffice[];
  smartpark: Backoffice[];
  smarttravel: Backoffice[];
}

export interface Backoffice {
  status: boolean;
}
