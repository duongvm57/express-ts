import { createCompanyInput, createCompanySchema } from '../schema/company.schema';
import { db } from '../utils/db.config';
import validate from '../utils/validate';

class CompanyService {
  selectedFields = {
    id: true,
    name: true,
    businessCode: true,
    createdAt: true,
    updatedAt: true,
  };

  selectedFieldsUser = {
    id: true,
    name: true,
    email: true,
    gender: true,
    role: true,
    divisionId: true,
    createdAt: true,
    updatedAt: true,
  };

  async getAll() {
    return await db.company.findMany({
      select: this.selectedFields,
    });
  }

  async get(data: any) {
    const { companyId } = data.params;
    const { branchId, divisionId } = data.query;
    
    const company = await db.company.findFirst({
      where: {
        id: Number(companyId)
      },
      include: {
        Branch: {
          where: branchId !== undefined ? { id: Number(branchId) } : undefined,
          include: {
            Division: {
              where: divisionId !== undefined ? { id: Number(divisionId) } : undefined,
              include: {
                User: {
                  select: this.selectedFieldsUser
                },
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw ({ status: 404, message: 'Company not found.' });
    }
    return company;
  }

  async create(data: createCompanyInput) {
    const dataInput = validate(createCompanySchema, data);
    const existedCompany = await db.company.findFirst({
      where: {
        businessCode: dataInput.businessCode
      }
    });
    if (existedCompany) {
      throw ({ status: 409, message: 'Company already exists.' });
    }
    await db.company.create({
      data: dataInput
    });
    return {
      message: 'Create company successfully.'
    };
  }

  async update(data: any) {
    const { companyId } = data.params;
    const dataInput = validate(createCompanySchema, data.body);
    const existedCompany = await db.company.findFirst({
      where: {
        id: Number(companyId)
      }
    });
    if (!existedCompany) {
      throw ({ status: 409, message: 'Company not found.' });
    }
    await db.company.update({
      where: {
        id: Number(companyId)
      },
      data: dataInput
    });
    return {
      message: 'Update company successfully.'
    };
  }
}

export default new CompanyService();