export interface IServiceRequestCreate {
  serviceId: string;
  title: string;
  address: string;
  contactNumber: string;
}

export interface IServiceRequestUpdate {
  serviceRequestId: string;
  title?: string;
  address?: string;
  contactNumber?: string;
  serviceId?: string;
}

export interface IServiceRequestDetails {
  serviceId: string;
}
