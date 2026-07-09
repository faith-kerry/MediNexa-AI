const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding hospitals...");

  await prisma.hospital.createMany({
    data: [
      {
        name: "Kenyatta National Hospital",
        county: "Nairobi",
        address: "Hospital Road, Upper Hill",
        phone: "+254700000001",
      },
      {
        name: "Aga Khan University Hospital",
        county: "Nairobi",
        address: "3rd Parklands Avenue",
        phone: "+254700000002",
      },
      {
        name: "Nairobi Hospital",
        county: "Nairobi",
        address: "Argwings Kodhek Road",
        phone: "+254700000003",
      },
      {
        name: "MP Shah Hospital",
        county: "Nairobi",
        address: "Shivachi Road",
        phone: "+254700000004",
      },
      {
        name: "Karen Hospital",
        county: "Nairobi",
        address: "Karen Road",
        phone: "+254700000005",
      },
      {
        name: "Moi Teaching and Referral Hospital",
        county: "Uasin Gishu",
        address: "Nandi Road",
        phone: "+254700000006",
      },
      {
        name: "Coast General Teaching and Referral Hospital",
        county: "Mombasa",
        address: "Mombasa CBD",
        phone: "+254700000007",
      },
      {
        name: "Jaramogi Oginga Odinga Teaching and Referral Hospital",
        county: "Kisumu",
        address: "Kisumu City",
        phone: "+254700000008",
      }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Hospitals seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });