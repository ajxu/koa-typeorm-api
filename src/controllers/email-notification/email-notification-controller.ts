import { Context } from 'koa';
import { isEmpty } from 'lodash';
import { getRepository, Repository } from 'typeorm';
import sendEmailSMTP from '../../common/email';
import { COMPANY_EMAIL } from '../../common/email/templates';
import { GenerateEmailNotificationRequestDto } from '../../dto/email-notification';
import { Company } from '../../entity/company-entity';
import { CompanyUser, UserRole } from '../../entity/company-user-entity';
import { EmailNotification } from '../../entity/email-notification-entity';
import CompanyController from '../company';

export default class EmailNotificationController {

  public sendCompanyInfoEmail = async (company_uen: string) => {
    try {
      const company = await CompanyController.getCompanyByUEN(company_uen);
      console.log(`[sendCompanyEmail] company: ${JSON.stringify(company)}`);

      if (company && !isEmpty(company)) {
        const { company_users } = company;
        console.log(`[sendCompanyEmail] company_users: ${JSON.stringify(company_users)}`);

        // Send email to company signers only
        const results = await Promise.all(company_users.map(async (user) => {

          const result = {
            email: user.email,
            sent: false
          };

          if (user.role === UserRole.SIGNER) {
            // Send email
            let bodyText = COMPANY_EMAIL.text;
            let bodyHtml = COMPANY_EMAIL.html;

            // Update email placeholders
            bodyText = bodyText.replace('{NAME}', `${user.first_name} ${user.last_name}`);
            bodyHtml = bodyHtml.replace('{NAME}', `${user.first_name} ${user.last_name}`);

            bodyText = bodyText.replace('{COMPANY_NAME}', company.name);
            bodyHtml = bodyHtml.replace('{COMPANY_NAME}', company.name);

            const responseMessage = await sendEmailSMTP(user.email, COMPANY_EMAIL.subject, bodyText, bodyHtml);

            console.log(`[sendCompanyEmail] Email service response: ${responseMessage}`);

            // Generate email notification record
            const data: GenerateEmailNotificationRequestDto = {
              company_user_guid: user.guid,
              email: user.email,
              sent_status: responseMessage,
              sent_at: new Date()
            }

            const savedNotification = await this.generateEmailNotification(data);
            result.sent = true;
            console.log(`[sendCompanyEmail] Saved notification: ${JSON.stringify(savedNotification)}`);
          }
          return result;
        }));

        return results;
      }
      else {
        throw new Error(`[sendCompanyEmail] Unable to find company with UEN (${company_uen})`);
      }
    }
    catch (err) {
      throw err;
    }
  }

  public generateEmailNotification = async (data: GenerateEmailNotificationRequestDto): Promise<EmailNotification> => {
    try {
      const emailNotificationRepo: Repository<EmailNotification> = getRepository(EmailNotification);
      const emailNotification = emailNotificationRepo.create(data);
      const savedNotification = await emailNotificationRepo.save(emailNotification);
      return savedNotification;
    }
    catch (err) {
      throw err;
    }
  }

}