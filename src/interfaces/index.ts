export interface IQuery {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
  status?: string;

  //any other filter fields can be added here
  [key: string]: any;
}
