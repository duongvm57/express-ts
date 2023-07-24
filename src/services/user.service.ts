import { updateUserSchema } from '../schema/user.schema';
import { db } from '../utils/db.config';
import validate from '../utils/validate';

class UserSerivce {
  selectedFields = {
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
    return await db.user.findMany({
      select: this.selectedFields,
    });
  }

  async get(data: any) {
    const { userId } = data;
    
    const user = await db.user.findFirst({
      where: {
        id: Number(userId)
      },
      select: this.selectedFields,
    });

    if (!user) {
      throw ({ status: 404, message: 'User not found.' });
    }
    return user;
  }

  async getCompanyByUserId(userId: number) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        division: {
          select: {
            branch: {
              select: {
                company: true,
              },
            },
          },
        },
      },
    });
  
    if (!user) {
      throw ({ status: 404, message: 'User not found.' });
    }
    return user.division.branch.company;
  }

  async getBranchByUserId(userId: number) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        division: {
          select: {
            branch: true,
          },
        },
      },
    });
  
    if (!user) {
      throw ({ status: 404, message: 'User not found.' });
    }
    return user.division.branch;
  }

  async update(data: any) {
    const { userId } = data.params;
    const dataInput = validate(updateUserSchema, data.body);
    const existedUser = await db.company.findFirst({
      where: {
        id: Number(userId)
      }
    });
    if (!existedUser) {
      throw ({ status: 409, message: 'User not found.' });
    }
    await db.user.update({
      where: {
        id: Number(userId)
      },
      data: dataInput
    });
    return {
      message: 'Update user successfully.'
    };
  }

  async getRoleByUserId(userId: number) {
    const user = await db.user.findFirstOrThrow({
      where: {
        id: userId
      },
      select: {
        role: true
      }
    });
    return user.role;
  }
}

export default new UserSerivce();