export interface IServiceCreate {
  name: string;
  serviceFee: number;
}
export interface IServiceUpdate {
  name: string;
  serviceId: string;
  serviceFee?: number;
}
