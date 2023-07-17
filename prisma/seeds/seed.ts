import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    await prisma.company.create({
        data: {
            name: 'Company A',
            Branch: {
                create: [
                    {
                        name: 'Branch A of company A',
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
                                            },
                                            {
                                                name: 'User 2',
                                                email: 'user2@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
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
                                            },
                                            {
                                                name: 'User 4',
                                                email: 'user4@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        name: 'Branch B of company A',
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
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 6',
                                                email: 'user6@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
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
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 8',
                                                email: 'user8@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
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
            Branch: {
                create: [
                    {
                        name: 'Branch A of company B',
                        address: 'Address AB',
                        Division: {
                            create: [
                                {
                                    name: 'Division 1',
                                    User: {
                                        create: [
                                            {
                                                name: 'User 9',
                                                email: 'user9@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 1,
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 10',
                                                email: 'user10@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: 'Division 2',
                                    User: {
                                        create: [
                                            {
                                                name: 'User 11',
                                                email: 'user11@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 1,
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 12',
                                                email: 'user12@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        name: 'Branch B of company B',
                        address: 'Address BB',
                        Division: {
                            create: [
                                {
                                    name: 'Division 1',
                                    User: {
                                        create: [
                                            {
                                                name: 'User 13',
                                                email: 'user13@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 1,
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 14',
                                                email: 'user14@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: 'Division 2',
                                    User: {
                                        create: [
                                            {
                                                name: 'User 15',
                                                email: 'user15@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 1,
                                                role: 'ADMIN',
                                            },
                                            {
                                                name: 'User 16',
                                                email: 'user16@example.com',
                                                password: bcrypt.hashSync('12345678', 8),
                                                gender: 2,
                                                role: 'USER',
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
