import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data so re-running seed doesn't hit unique constraint errors
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Users (password is hashed since NextAuth will need to verify it later)
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@test.com',
      password: hashedPassword,
      phone: '+1 212 555 0100',
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      fullName: 'John Carter',
      email: 'john@test.com',
      password: hashedPassword,
      phone: '+1 212 555 0148',
      address: '123 Main St, New York, NY 10001',
      role: 'USER',
    },
  });

  // Categories (created first since products need their id)
  const chairCategory = await prisma.category.create({
    data: { name: 'Chairs', slug: 'chairs' },
  });

  const sofaCategory = await prisma.category.create({
    data: { name: 'Sofas', slug: 'sofas' },
  });

  const tableCategory = await prisma.category.create({
    data: { name: 'Tables', slug: 'tables' },
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Classic Wooden Chair',
        slug: 'classic-wooden-chair',
        description:
          'A classic wooden chair with a comfortable design, perfect for the living room.',
        price: 129.99,
        stock: 15,
        images: ['https://picsum.photos/seed/chair1/600/600'],
        categoryId: chairCategory.id,
      },
      {
        name: 'Ergonomic Office Chair',
        slug: 'ergonomic-office-chair',
        description:
          'An office chair with an adjustable backrest, built for long work hours.',
        price: 249.99,
        stock: 8,
        images: ['https://picsum.photos/seed/chair2/600/600'],
        categoryId: chairCategory.id,
      },
      {
        name: 'Modern L-Shaped Sofa',
        slug: 'modern-l-shaped-sofa',
        description:
          'An L-shaped sofa with premium fabric and a minimal, modern design.',
        price: 899.99,
        stock: 4,
        images: ['https://picsum.photos/seed/sofa1/600/600'],
        categoryId: sofaCategory.id,
      },
      {
        name: 'Chesterfield Loveseat',
        slug: 'chesterfield-loveseat',
        description: 'A two-seat Chesterfield sofa in premium faux leather.',
        price: 649.99,
        stock: 6,
        images: ['https://picsum.photos/seed/sofa2/600/600'],
        categoryId: sofaCategory.id,
      },
      {
        name: 'Wooden Dining Table',
        slug: 'wooden-dining-table',
        description: 'A 6-seater dining table made from solid walnut wood.',
        price: 499.99,
        stock: 5,
        images: ['https://picsum.photos/seed/table1/600/600'],
        categoryId: tableCategory.id,
      },
      {
        name: 'Glass Coffee Table',
        slug: 'glass-coffee-table',
        description: 'A coffee table with a glass top and a metal frame.',
        price: 199.99,
        stock: 10,
        images: ['https://picsum.photos/seed/table2/600/600'],
        categoryId: tableCategory.id,
      },
    ],
  });

  // Fetch real product ids for the cart and order below
  const allProducts = await prisma.product.findMany();

  // Sample cart items for the regular user
  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: allProducts[0].id,
      quantity: 1,
    },
  });

  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: allProducts[2].id,
      quantity: 2,
    },
  });

  // A sample order for the same user
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice: allProducts[4].price + allProducts[1].price,
      status: 'PAID',
      items: {
        create: [
          {
            productId: allProducts[4].id,
            quantity: 1,
            price: allProducts[4].price,
          },
          {
            productId: allProducts[1].id,
            quantity: 1,
            price: allProducts[1].price,
          },
        ],
      },
    },
  });

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
