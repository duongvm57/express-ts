import { createDivisionInput, createDivisionSchema, updateDivisionSchema } from '../schema/division.schema';
import { db } from '../utils/db.config';
import validate from '../utils/validate';

class DivisionService {
  selectedFields = {
    id: true,
    name: true,
    branchId: true,
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
    return await db.division.findMany({
      select: this.selectedFields,
    });
  }

  async get(data: any) {
    const { divisionId } = data.params;

    const division = await db.division.findFirst({
      where: {
        id: Number(divisionId)
      },
      include: {
        User: {
          select: this.selectedFieldsUser
        },
      },
    });

    if (!division) {
      throw ({ status: 404, message: 'Division not found.' });
    }
    return division;
  }

  async create(data: createDivisionInput) {
    const dataInput = validate(createDivisionSchema, data);
    const existedDivision = await db.division.findFirst({
      where: {
        name: dataInput.name
      }
    });
    if (existedDivision) {
      throw ({ status: 409, message: 'Division already exists.' });
    }
    await db.division.create({
      data: dataInput
    });
    return {
      message: 'Create division successfully.'
    };
  }

  async update(data: any) {
    const { divisionId } = data.params;
    const dataInput = validate(updateDivisionSchema, data.body);
    const existedDivision = await db.division.findFirst({
      where: {
        id: Number(divisionId)
      }
    });
    if (!existedDivision) {
      throw ({ status: 409, message: 'Division not found.' });
    }
    await db.division.update({
      where: {
        id: Number(divisionId)
      },
      data: dataInput
    });
    return {
      message: 'Update division successfully.'
    };
  }
}

export default new DivisionService();