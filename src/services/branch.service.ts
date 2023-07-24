import { createBranchInput, createBranchSchema, updateBranchSchema } from '../schema/branch.schema';
import { db } from '../utils/db.config';
import validate from '../utils/validate';
import userService from './user.service';

class BranchService {
  selectedFields = {
    id: true,
    name: true,
    branchCode: true,
    address: true,
    companyId: true,
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
    return await db.branch.findMany({
      select: this.selectedFields,
    });
  }

  async get(data: any) {
    const { branchId } = data.params;
    const { divisionId } = data.query;

    const branch = await db.branch.findFirst({
      where: {
        id: Number(branchId)
      },
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
    });

    if (!branch) {
      throw ({ status: 404, message: 'Branch not found.' });
    }
    return branch;
  }

  async create(data: createBranchInput, currentUser: any) {
    const dataInput = validate(createBranchSchema, data);
    const existedBranch = await db.branch.findFirst({
      where: {
        branchCode: dataInput.branchCode
      }
    });
    if (existedBranch) {
      throw ({ status: 409, message: 'Branch already exists.' });
    }
    const currentCompany = await userService.getCompanyByUserId(currentUser.id);
    await db.branch.create({
      data: { ...dataInput, companyId: currentCompany.id }
    });
    return {
      message: 'Create branch successfully.'
    };
  }

  async update(data: any) {
    const { branchId } = data.params;
    const dataInput = validate(updateBranchSchema, data.body);
    const existedBranch = await db.branch.findFirst({
      where: {
        id: Number(branchId)
      }
    });
    if (!existedBranch) {
      throw ({ status: 409, message: 'Branch not found.' });
    }
    await db.branch.update({
      where: {
        id: Number(branchId)
      },
      data: dataInput
    });
    return {
      message: 'Update branch successfully.'
    };
  }
}

export default new BranchService();