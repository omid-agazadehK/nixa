import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // پاک کردن دیتای قبلی، تا هر بار seed زدن دوباره با خطای unique مواجه نشی
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // کاربرها (پسورد هش می‌شه چون بعداً NextAuth باید بتونه چکش کنه)
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.create({
    data: {
      fullName: "Admin User",
      email: "admin@test.com",
      password: hashedPassword,
      phone: "09120000000",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      fullName: "Ali Rezaei",
      email: "ali@test.com",
      password: hashedPassword,
      phone: "09121234567",
      address: "تهران، خیابان ولیعصر",
      role: "USER",
    },
  });

  // دسته‌بندی‌ها (اول اینا رو می‌سازیم چون محصولات بهشون نیاز دارن)
  const chairCategory = await prisma.category.create({
    data: { name: "صندلی", slug: "chairs" },
  });

  const sofaCategory = await prisma.category.create({
    data: { name: "مبل", slug: "sofas" },
  });

  const tableCategory = await prisma.category.create({
    data: { name: "میز", slug: "tables" },
  });

  // محصولات
  await prisma.product.createMany({
    data: [
      {
        name: "صندلی چوبی کلاسیک",
        slug: "classic-wooden-chair",
        description: "صندلی چوبی با طراحی کلاسیک و راحت، مناسب برای فضای نشیمن.",
        price: 1250000,
        stock: 15,
        images: ["https://picsum.photos/seed/chair1/600/600"],
        categoryId: chairCategory.id,
      },
      {
        name: "صندلی اداری ارگونومیک",
        slug: "ergonomic-office-chair",
        description: "صندلی اداری با پشتی قابل تنظیم برای ساعت‌های طولانی کار.",
        price: 3400000,
        stock: 8,
        images: ["https://picsum.photos/seed/chair2/600/600"],
        categoryId: chairCategory.id,
      },
      {
        name: "مبل ال شکل مدرن",
        slug: "modern-l-shaped-sofa",
        description: "مبل ال شکل با پارچه مرغوب و طراحی مینیمال.",
        price: 18500000,
        stock: 4,
        images: ["https://picsum.photos/seed/sofa1/600/600"],
        categoryId: sofaCategory.id,
      },
      {
        name: "مبل دو نفره چستر",
        slug: "chesterfield-loveseat",
        description: "مبل دو نفره چستر با چرم مصنوعی درجه یک.",
        price: 12900000,
        stock: 6,
        images: ["https://picsum.photos/seed/sofa2/600/600"],
        categoryId: sofaCategory.id,
      },
      {
        name: "میز ناهارخوری چوبی",
        slug: "wooden-dining-table",
        description: "میز ناهارخوری ۶ نفره از چوب طبیعی گردو.",
        price: 9800000,
        stock: 5,
        images: ["https://picsum.photos/seed/table1/600/600"],
        categoryId: tableCategory.id,
      },
      {
        name: "میز جلو مبلی شیشه‌ای",
        slug: "glass-coffee-table",
        description: "میز جلو مبلی با رویه شیشه‌ای و پایه فلزی.",
        price: 4200000,
        stock: 10,
        images: ["https://picsum.photos/seed/table2/600/600"],
        categoryId: tableCategory.id,
      },
    ],
  });

  // برای ساخت سبد خرید و سفارش، id محصولات واقعی رو می‌گیریم
  const allProducts = await prisma.product.findMany();

  // سبد خرید کاربر عادی
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

  // یک سفارش نمونه برای همون کاربر
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice: allProducts[4].price + allProducts[1].price,
      status: "PAID",
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

  console.log("✅ Seed با موفقیت تکمیل شد");
  console.log({
    admin: admin.email,
    user: user.email,
    productsCount: allProducts.length,
    sampleOrderId: order.id,
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