import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// initialize prisma
const prisma = new PrismaClient();

const admin = async () => {
  await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@petshopavemaria.me',
      password: await bcrypt.hash('admin', 16),
      roleName: 'admin',
    },
  });
};

admin()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log('x ', error);
    await prisma.$disconnect();
    process.exit(1);
  });
