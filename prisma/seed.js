const { faker } = require('@faker-js/faker');
const prisma = require('./index.js');

const seed = async () => {
  try {
    const employees = [];
    for (let i = 0; i < 10; i++) {
      employees.push({
        name: faker.person.name(),
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
