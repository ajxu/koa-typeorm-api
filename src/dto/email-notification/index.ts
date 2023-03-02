export interface GenerateEmailNotificationRequestDto {
  company_user_guid: string;
  email: string;
  sent_status: string;
  sent_at: Date;
}
