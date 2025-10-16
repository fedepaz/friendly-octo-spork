import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

const monthMap: { [key: string]: number } = {
  'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
  'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11,
};

function parseDate(dateString: string): Date | null {
  if (!dateString) {
    return null;
  }

  const lowerDateString = dateString.toLowerCase();

  // Format: "mié 01/oct 25"
  let match = lowerDateString.match(/(\d{2})\/(\w{3})\s(\d{2})/);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = monthMap[match[2]];
    const year = 2000 + parseInt(match[3], 10);
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }

  // Format: "mié 1 de abr de 20"
  match = lowerDateString.match(/(\d{1,2}) de (\w{3}) de (\d{2})/);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = monthMap[match[2]];
    const year = 2000 + parseInt(match[3], 10);
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }
  
    // Format: "dom 3 de ago de 25"
  match = dateString.match(/\w{3} (\d{1,2}) de (\w{3}) de (\d{2})/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2].substring(0, 3).toLowerCase();
    const year = 2000 + parseInt(match[3], 10);
    const month = monthMap[monthName];
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }


  return null;
}

async function getOrCreateCategory(name: string): Promise<number> {
  let category = await prisma.category.findUnique({
    where: { name },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name },
    });
  }

  return category.id;
}

async function main() {
  console.log('Starting migration...');

  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
      },
    });
    console.log(`Created user with id: ${user.id}`);
  } else {
    console.log(`User with email test@example.com already exists with id: ${user.id}`);
  }


  const metadataPath = path.join(__dirname, '../../json_structured_data/sheets_metadata.json');
  const metadataContent = await fs.readFile(metadataPath, 'utf-8');
  const metadata = JSON.parse(metadataContent);

  for (const sheet of metadata) {
    const jsonFileName = sheet.originalName.toLowerCase() + '.json';
    const jsonFilePath = path.join(__dirname, '../../json_structured_data', jsonFileName);

    try {
      const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
      const data = JSON.parse(fileContent);

      console.log(`Processing file: ${jsonFileName}`);

      if (data.gastos) {
        for (const item of data.gastos) {
          const date = parseDate(item.fecha);
          if (date) {
            const categoryName = item.concepto || item.tipo || 'Gasto';
            const categoryId = await getOrCreateCategory(categoryName);
            await prisma.transaction.create({
              data: {
                date: date,
                amount: item.monto,
                concept: categoryName,
                type: 'EXPENSE',
                userId: user.id,
                categoryId: categoryId,
              },
            });
          }
        }
      }

      if (data.pagos) {
        for (const item of data.pagos) {
          const date = parseDate(item.fecha);
          if (date) {
            const categoryName = item.concepto || item.tipo || 'Pago';
            const categoryId = await getOrCreateCategory(categoryName);
            await prisma.transaction.create({
              data: {
                date: date,
                amount: item.monto,
                concept: categoryName,
                type: 'PAYMENT',
                userId: user.id,
                categoryId: categoryId,
              },
            });
          }
        }
      }

      if (data.ingresos) {
        for (const item of data.ingresos) {
          const date = parseDate(item.fecha);
          if (date) {
            const categoryName = item.concepto || item.tipo || 'Ingreso';
            const categoryId = await getOrCreateCategory(categoryName);
            await prisma.transaction.create({
              data: {
                date: date,
                amount: item.monto,
                concept: categoryName,
                type: 'INCOME',
                userId: user.id,
                categoryId: categoryId,
              },
            });
          }
        }
      }

      if (data.gastosDiarios) {
        for (const item of data.gastosDiarios) {
          const date = parseDate(item.fecha);
          if (date) {
            await prisma.dailyExpense.create({
              data: {
                date: date,
                amount: item.monto,
                type: item.tipo,
                userId: user.id,
              },
            });
          }
        }
      }

      if (data.saldos) {
        for (const item of data.saldos) {
            const date = new Date(sheet.year, sheet.month - 1, 1);
            await prisma.balance.create({
                data: {
                    date: date,
                    mercadoPagoBalance: item.saldoMercadoPago,
                    bankBalance: item.saldoBanco,
                    userId: user.id,
                },
            });
        }
      }

      if (data.gastosTarjetaVisa) {
        for (const item of data.gastosTarjetaVisa) {
            const date = parseDate(item.fecha);
            if (date) {
                await prisma.cardExpense.create({
                    data: {
                        date: date,
                        amount: item.monto,
                        type: item.tipo,
                        cardType: 'visa',
                        installments: item.fecha.includes('/') ? item.fecha : null,
                        userId: user.id,
                    },
                });
            }
        }
      }

      if (data.rendimientos) {
        for (const item of data.rendimientos) {
            await prisma.investmentReturn.create({
                data: {
                    reserve: item.reserva,
                    amount: item.ganado,
                    userId: user.id,
                },
            });
        }
      }

      if (data.gastosExtras) {
        for (const item of data.gastosExtras) {
            const date = parseDate(item.fecha);
            if (date) {
                await prisma.extraExpense.create({
                    data: {
                        date: date,
                        amount: item.monto,
                        type: item.tipo,
                        userId: user.id,
                    },
                });
            }
        }
      }

    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`File not found, skipping: ${jsonFileName}`);
      } else {
        console.error(`Error processing file ${jsonFileName}:`, error);
      }
    }
  }

  console.log('Migration finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });