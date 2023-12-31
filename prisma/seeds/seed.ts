import { Gender } from './../../src/constants/constant';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  await prisma.user.create({
    data: {
      name: 'duongvm',
      email: 'duongvm@yopmail.com',
      password: bcrypt.hashSync('12345678', 8),
      gender: Gender.MALE,
      divisionId: 0,
      role: 'SUPERADMIN',
      status: 'ACTIVE'
    }
  });

  await prisma.company.create({
    data: {
      name: 'Company A',
      businessCode: 'companya',
      Branch: {
        create: [
          {
            name: 'Branch A of company A',
            branchCode: 'CPABA',
            address: 'Address AA',
            Division: {
              create: [
                {
                  name: 'Division 1',
                  User: {
                    create: [
                      {
                        name: 'User 1',
                        email: 'user1@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'ADMIN',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 2',
                        email: 'user2@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
                {
                  name: 'Division 2',
                  User: {
                    create: [
                      {
                        name: 'User 3',
                        email: 'user3@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'ADMIN',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 4',
                        email: 'user4@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Branch B of company A',
            branchCode: 'CPABB',
            address: 'Address BA',
            Division: {
              create: [
                {
                  name: 'Division 3',
                  User: {
                    create: [
                      {
                        name: 'User 5',
                        email: 'user5@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 6',
                        email: 'user6@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
                {
                  name: 'Division 4',
                  User: {
                    create: [
                      {
                        name: 'User 7',
                        email: 'user7@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 8',
                        email: 'user8@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.company.create({
    data: {
      name: 'Company B',
      businessCode: 'companyb',
      Branch: {
        create: [
          {
            name: 'Branch A of company B',
            branchCode: 'CPBBA',
            address: 'Address AB',
            Division: {
              create: [
                {
                  name: 'Division 5',
                  User: {
                    create: [
                      {
                        name: 'User 9',
                        email: 'user9@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 10',
                        email: 'user10@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
                {
                  name: 'Division 6',
                  User: {
                    create: [
                      {
                        name: 'User 11',
                        email: 'user11@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 12',
                        email: 'user12@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Branch B of company B',
            branchCode: 'CPBBB',
            address: 'Address BB',
            Division: {
              create: [
                {
                  name: 'Division 7',
                  User: {
                    create: [
                      {
                        name: 'User 13',
                        email: 'user13@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 14',
                        email: 'user14@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                    ],
                  },
                },
                {
                  name: 'Division 8',
                  User: {
                    create: [
                      {
                        name: 'User 15',
                        email: 'user15@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 1,
                        role: 'USER',
                        status: 'ACTIVE'
                      },
                      {
                        name: 'User 16',
                        email: 'user16@example.com',
                        password: bcrypt.hashSync('12345678', 8),
                        gender: 2,
                        role: 'USER',
                        status: 'INACTIVE'
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
