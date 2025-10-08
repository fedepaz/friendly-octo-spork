/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/api/database/test-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔌 Probando conexión a PostgreSQL...");

  // Crear un mes de prueba
  const mes = await prisma.mes.create({
    data: {
      año: 2020,
      mes: 4,
      fechaInicio: new Date(2020, 3, 1),
      fechaFin: new Date(2020, 3, 30),
    },
  });

  console.log("✅ Conexión exitosa! Mes creado:", mes);

  // Limpiar
  await prisma.mes.delete({ where: { id: mes.id } });
  console.log("🧹 Limpiado");
}

main()
  .catch((e) => console.error("❌ Error:", e))
  .finally(() => prisma.$disconnect());
