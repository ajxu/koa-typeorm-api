import { Context } from 'koa';
import { getRepository, Repository } from 'typeorm';
import { CreateCompanyRequestDto, UpdateCompanyRequestDto } from "../../dto/company";
import { Company } from '../../entity/company-entity';

export default class CompanyController {
  
  public create = async (ctx: Context): Promise<Company> => {
    try {
      const data = <CreateCompanyRequestDto><unknown>ctx.request.body;
      const companyRepo: Repository<Company> = getRepository(Company);
      const company = companyRepo.create(data);
      await companyRepo.save(company);
      return company;
    }
    catch(err) {
      throw err;
    }
  }

  public findAll = async (ctx: Context): Promise<Company[]> => {
    try {
      const companyRepo: Repository<Company> = getRepository(Company);
      const companies = await companyRepo.find();
      return companies
    }
    catch(err) {
      throw err;
    }
  }

  public findOne = async (ctx: Context): Promise<Company | undefined> => {
    try {
      const companyRepo: Repository<Company> = getRepository(Company);
      const uen = ctx.params.company_uen;
      if(uen) {
        const company = await companyRepo.findOne(uen);
        return company;
      }
      return undefined;
    }
    catch(err) {
      throw err;
    }
  }

  public update = async (ctx: Context): Promise<Company | undefined>=> {
    try {
      const data = <UpdateCompanyRequestDto><unknown>ctx.request.body;
      const uen = ctx.params.company_uen;
      if(uen) {
        const companyRepo: Repository<Company> = getRepository(Company);
        await companyRepo.update(uen, data);
        const updatedCompany = await companyRepo.findOne(uen);
        return updatedCompany;
      }
      return undefined;
    }
    catch(err) {
      throw err;
    }
  }

  public delete = async (ctx: Context): Promise<any> => {
    try {
      const uen = ctx.params.company_uen;
      if(uen) {
        const companyRepo: Repository<Company> = getRepository(Company);
        const deletedCompany = await companyRepo.softDelete(uen);
        return deletedCompany;
      }
    }
    catch(err) {
      throw err;
    }
  }

  public static getCompanyByUEN = async (uen: string): Promise<Company | undefined> => {
    try {
      const companyRepo: Repository<Company> = getRepository(Company);
      const company = await companyRepo.findOne(uen, { relations: ['company_users']});
      return company;
    }
    catch(err) {
      throw err;
    }
  }
}
