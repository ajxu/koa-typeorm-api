import { Context } from 'koa';
import { getRepository, Repository } from 'typeorm';
import { MOM_OFFICERS } from '../../common/constants';
import { UserListResponseDto } from '../../dto/company-user';
import { CompanyUser } from '../../entity/company-user-entity';

export default class CompanyUserController {

    // api for auth landing page
    public findAll = async (ctx: Context): Promise<UserListResponseDto[]> => {
        try {

            const companyUserRepo: Repository<CompanyUser> = getRepository(CompanyUser);

            // fetching
            const companyUsers = await companyUserRepo.find({ relations: ['company'] });
            console.log('companyUsers: ', JSON.stringify(companyUsers));

            // processing
            const users: UserListResponseDto[] = companyUsers.map(user => ({
                company_name: user.company.name,
                user_name: user.first_name + ' ' + user.last_name,
                user_guid: user.guid
            }));

            // sort users
            users.sort((a,b): number  => {
                if(a.company_name > b.company_name) return 1;
                if(a.company_name < b.company_name) return -1;
                if(a.user_name > b.user_name) return 1;
                if(a.user_name < b.user_name) return -1;
                return 0;
            })

            // updating for mom officer
            MOM_OFFICERS.forEach(officer => {
                users.push({ company_name: officer, user_name: '', user_guid: officer });
            })

            console.log('users: ', JSON.stringify(users));

            // returning
            return users;
        }
        catch (err) {
            throw err;
        }
    }

    public static getUserDetailsByGUID = async (guid: string) => {
        try {
            const companyUserRepo: Repository<CompanyUser> = getRepository(CompanyUser);

            // fetching
            const companyUsers = await companyUserRepo.findOne({ guid }, { relations: ['company'] });
            console.log('companyUsers: ', JSON.stringify(companyUsers));

            return companyUsers;
        }
        catch (err) {
            throw err;
        }
    }

}