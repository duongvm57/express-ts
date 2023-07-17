import { db } from '../utils/db.config';

class CompanyService {
  selectedFields = {
    id: true,
    name: true,
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
          where: {
            id: Number(branchId)
          },
          include: {
            Division: {
              where: {
                id: Number(divisionId)
              },
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
}

export default new CompanyService();