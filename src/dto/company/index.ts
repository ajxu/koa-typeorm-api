export interface CreateCompanyRequestDto {
  uen: string;
  name: string;
  is_employment_agency: boolean;
}

export interface UpdateCompanyRequestDto {
  name?: string;
  is_employment_agency?: boolean;
}

export enum CompanyTypeEnum {
  PROSPECTIVE_EMPLOYER = 'Prospective Employer',
  CURRENT_EMPLOYER = 'Current Employer',
  EMPLOYMENT_AGENCY = 'Employment Agency'
}