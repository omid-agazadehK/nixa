import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("12345678", 10);
  await prisma.user.create({
    data: {
      fullName: "admin g",
      email: "admin@test.com",
      password: hashedPassword,
      phone: "+1 212 555 0100",
      role: UserRole.ADMIN,
    },
  });

  const user = await prisma.user.create({
    data: {
      fullName: "John Carter",
      email: "JohnCarter@test.com",
      password: hashedPassword,
      phone: "+1 212 555 0148",
      address: "123 Main St, New York, NY 10001",
      role: UserRole.USER,
    },
  });

  const chairCategory = await prisma.category.create({
    data: { name: "Chairs", slug: "chairs" },
  });

  const sofaCategory = await prisma.category.create({
    data: { name: "Sofas", slug: "sofas" },
  });

  const tableCategory = await prisma.category.create({
    data: { name: "Tables", slug: "tables" },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Classic Wooden Chair",
        slug: "classic-wooden-chair",
        description:
          "A classic wooden chair with a comfortable design, perfect for the living room.",
        price: 129.99,
        stock: 15,
        images: [
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
        ],
        categoryId: chairCategory.id,
      },
      {
        name: "Ergonomic Office Chair",
        slug: "ergonomic-office-chair",
        description:
          "An office chair with an adjustable backrest, built for long work hours.",
        price: 249.99,
        stock: 8,
        images: [
          "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=600&q=80",
        ],
        categoryId: chairCategory.id,
      },
      {
        name: "Modern L-Shaped Sofa",
        slug: "modern-l-shaped-sofa",
        description:
          "An L-shaped sofa with premium fabric and a minimal, modern design.",
        price: 899.99,
        stock: 4,
        images: [
          "https://plus.unsplash.com/premium_photo-1683141389818-77fd3485334b?w=600&q=80",
        ],
        categoryId: sofaCategory.id,
      },
      {
        name: "Chesterfield Loveseat",
        slug: "chesterfield-loveseat",
        description: "A two-seat Chesterfield sofa in premium faux leather.",
        price: 649.99,
        stock: 6,
        images: [
          "https://plus.unsplash.com/premium_photo-1673125286978-a540fa337c7d?w=600&q=80",
        ],
        categoryId: sofaCategory.id,
      },
      {
        name: "Wooden Dining Table",
        slug: "wooden-dining-table",
        description: "A 6-seater dining table made from solid walnut wood.",
        price: 499.99,
        stock: 5,
        images: [
          "https://images.unsplash.com/photo-1516650556972-e9904734f467?w=600&q=80",
        ],
        categoryId: tableCategory.id,
      },
      {
        name: "Glass Coffee Table",
        slug: "glass-coffee-table",
        description: "A coffee table with a glass top and a metal frame.",
        price: 199.99,
        stock: 10,
        images: [
          "https://images.unsplash.com/photo-1631951630025-4fe0430adf15?w=600&q=80",
        ],
        categoryId: tableCategory.id,
      },
      {
        name: "Velvet Accent Chair",
        slug: "velvet-accent-chair",
        description:
          "A luxurious velvet accent chair with gold-finished legs, perfect for adding elegance to any corner.",
        price: 189.99,
        stock: 10,
        images: [
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
        ],
        categoryId: chairCategory.id,
      },
      {
        name: "Rattan Lounge Chair",
        slug: "rattan-lounge-chair",
        description:
          "A lightweight rattan lounge chair with a soft cushion, ideal for indoor and outdoor use.",
        price: 159.99,
        stock: 12,
        images: [
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
        ],
        categoryId: chairCategory.id,
      },
      {
        name: "Sectional Fabric Sofa",
        slug: "sectional-fabric-sofa",
        description:
          "A spacious sectional sofa upholstered in soft fabric, designed for large living rooms.",
        price: 1199.99,
        stock: 3,
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        ],
        categoryId: sofaCategory.id,
      },
      {
        name: "Minimalist Two-Seater Sofa",
        slug: "minimalist-two-seater-sofa",
        description:
          "A clean-lined two-seater sofa in neutral linen fabric, built for modern interiors.",
        price: 549.99,
        stock: 7,
        images: [
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
        ],
        categoryId: sofaCategory.id,
      },
      {
        name: "Marble Top Side Table",
        slug: "marble-top-side-table",
        description:
          "A compact side table with a genuine marble top and brass legs, adding sophistication to any room.",
        price: 249.99,
        stock: 8,
        images: [
          "https://images.unsplash.com/photo-1643558544531-bff73bbffc28?w=600&q=80",
        ],
        categoryId: tableCategory.id,
      },
      {
        name: "Solid Oak Desk",
        slug: "solid-oak-desk",
        description:
          "A sturdy solid oak writing desk with two storage drawers, perfect for home offices.",
        price: 379.99,
        stock: 6,
        images: [
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
        ],
        categoryId: tableCategory.id,
      },
    ],
  });

  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
  });

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
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
