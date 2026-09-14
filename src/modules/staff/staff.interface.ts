export interface IApplyAsStaffPayload {
  user: {
    name: string;
    email: string;
  };
  staff: {
    address?: string;
    specialization: string;
    experienceYears: number;
    bio?: string;
    serviceFee?: number;
    contactNumber?: string;
  };
}
