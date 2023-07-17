import { db } from '../utils/db.config';

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
}

export default new UserSerivce();