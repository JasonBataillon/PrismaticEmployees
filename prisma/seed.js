const { faker } = require('@faker-js/faker');
const prisma = require('../prisma');

const seed = async () => {
  try {
    const employees = [];
    for (let i = 0; i < 10; i++) {
      employees.push({
        name: faker.person.firstName(),
      });
    }
    await prisma.employee.createMany({ data: employees });
  } catch (e) {
    console.error(e);
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
