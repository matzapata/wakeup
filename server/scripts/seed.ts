import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const numberOfRestaurants = 30;
const numberOfProducts = 30;

async function main() {
  for (let i = 0; i < numberOfRestaurants; i++) {
    const products = Array.from({ length: numberOfProducts }, () => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    }));

    await prisma.restaurant.create({
      data: {
        name: faker.company.name(),
        products: { create: products },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
