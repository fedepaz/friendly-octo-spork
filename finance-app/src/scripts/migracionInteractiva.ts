import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utilidad para preguntar al usuario (en terminal)
async function pregunta(texto: string): Promise<string> {
  process.stdout.write(texto + " ");

  for await (const line of console) {
    return line.trim();
  }
  return "";
}

// Limpiar monto (quita puntos de miles, reemplaza coma por punto)
function limpiarMonto(valor: any): number {
  if (typeof valor === "number") return valor;
  if (!valor) return 0;

  const str = String(valor).replace(/\./g, "").replace(",", ".");
  return parseFloat(str) || 0;
}

// Parsear nombre de hoja → año/mes
function parsearNombreHoja(nombre: string): { mes: number; año: number } {
  const meses: Record<string, number> = {
    enero: 1,
    febrero: 2,
    marzo: 3,
    abril: 4,
    mayo: 5,
    junio: 6,
    julio: 7,
    agosto: 8,
    septiembre: 9,
    octubre: 10,
    noviembre: 11,
    diciembre: 12,
  };

  const partes = nombre.toLowerCase().split(" ");
  const nombreMes = partes[0] || "";
  const mes = meses[nombreMes] || 1;
  const año = parseInt(partes[1] || "2020") || 2020;

  return { mes, año };
}

// Detectar estructura de la hoja
function detectarEstructura(datos: any[][]): any {
  const estructura: any = {
    columnas: {},
  };

  // Buscar en las primeras 15 filas
  for (let i = 0; i < Math.min(15, datos.length); i++) {
    const fila = datos[i].map((cel) => String(cel).toUpperCase().trim());

    fila.forEach((celda, colIndex) => {
      // Buscar headers conocidos
      if (celda === "GASTOS" && !estructura.columnas.gastos) {
        estructura.columnas.gastos = {
          inicio: i + 1,
          colFecha: colIndex,
          colMonto: colIndex + 1,
          colConcepto: colIndex + 2,
        };
      }

      if (celda === "PAGOS" && !estructura.columnas.pagos) {
        estructura.columnas.pagos = {
          inicio: i + 1,
          colFecha: colIndex,
          colMonto: colIndex + 1,
          colConcepto: colIndex + 2,
        };
      }

      if (celda === "INGRESOS" && !estructura.columnas.ingresos) {
        estructura.columnas.ingresos = {
          inicio: i + 1,
          colFecha: colIndex,
          colMonto: colIndex + 1,
          colConcepto: colIndex + 2,
        };
      }

      if (
        celda.includes("GASTO DIARIO") &&
        !estructura.columnas.gastosDiarios
      ) {
        estructura.columnas.gastosDiarios = {
          inicio: i + 1,
          colFecha: colIndex,
          colMonto: colIndex + 1,
          colConcepto: colIndex + 2,
        };
      }

      if (celda.includes("TARJETA") && !estructura.columnas.tarjetas) {
        estructura.columnas.tarjetas = {
          inicio: i + 1,
          colFecha: colIndex,
          colMonto: colIndex + 1,
          colConcepto: colIndex + 2,
        };
      }
    });
  }

  return estructura;
}

// Obtener o crear una categoría
async function obtenerOCrearCategoria(nombre: string): Promise<number> {
  if (!nombre) {
    nombre = "Varios"; // Categoría por defecto
  }

  const categoria = await prisma.category.upsert({
    where: { nombre },
    create: { nombre },
    update: {},
  });
  return categoria.id;
}

// Procesar una columna genérica (gastos, pagos, ingresos)
async function procesarColumna(
  datos: any[][],
  config: any,
  mesId: number,
  tipo: "gasto" | "pago" | "ingreso"
) {
  const registros = [];

  for (let i = config.inicio; i < datos.length; i++) {
    const fila = datos[i];
    const fecha = fila[config.colFecha];
    const monto = fila[config.colMonto];
    const concepto = fila[config.colConcepto];

    // Detener en fila vacía o "TOTAL"
    if (!fecha || String(fecha).toUpperCase().includes("TOTAL")) break;

    const montoNum = limpiarMonto(monto);
    if (montoNum === 0) continue;

    registros.push({
      fecha: String(fecha),
      monto: montoNum,
      concepto: String(concepto || "Sin concepto"),
    });
  }

  // Insertar en la base de datos
  if (registros.length > 0) {
    for (const reg of registros) {
      const categoryId = await obtenerOCrearCategoria(reg.concepto);

      if (tipo === "gasto") {
        await prisma.gasto.create({
          data: {
            mesId,
            fecha: new Date(), // Parsear fecha correctamente en producción
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      } else if (tipo === "pago") {
        await prisma.pago.create({
          data: {
            mesId,
            fecha: new Date(),
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      } else if (tipo === "ingreso") {
        await prisma.ingreso.create({
          data: {
            mesId,
            fecha: new Date(),
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      }
    }
  }

  return registros.length;
}

// Calcular y actualizar totales del mes
async function actualizarTotales(mesId: number) {
  const [ingresos, gastos, pagos] = await Promise.all([
    prisma.ingreso.aggregate({
      where: { mesId },
      _sum: { monto: true },
    }),
    prisma.gasto.aggregate({
      where: { mesId },
      _sum: { monto: true },
    }),
    prisma.pago.aggregate({
      where: { mesId },
      _sum: { monto: true },
    }),
  ]);

  const totalIngresos = Number(ingresos._sum.monto || 0);
  const totalGastos = Number(gastos._sum.monto || 0);
  const totalPagos = Number(pagos._sum.monto || 0);
  const saldo = totalIngresos - totalGastos - totalPagos;

  await prisma.mes.update({
    where: { id: mesId },
    data: {
      totalIngresos,
      totalGastos,
      totalPagos,
      saldoFinal: saldo,
    },
  });

  return { totalIngresos, totalGastos, totalPagos, saldo };
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function main() {
  const rutaArchivo = process.argv[2] || "./finanzas.ods";

  console.log("🚀 Iniciando migración interactiva\n");
  console.log(`📂 Leyendo: ${rutaArchivo}\n`);

  const workbook = XLSX.readFile(rutaArchivo);
  const hojas = workbook.SheetNames;

  console.log(`📋 Hojas encontradas: ${hojas.length}`);
  console.log(`   ${hojas.join(", ")}\n`);

  // Ordenar hojas cronológicamente
  const hojasOrdenadas = hojas.sort((a, b) => {
    const { mes: mesA, año: añoA } = parsearNombreHoja(a);
    const { mes: mesB, año: añoB } = parsearNombreHoja(b);

    if (añoA !== añoB) return añoA - añoB;
    return mesA - mesB;
  });

  console.log("📅 Orden de procesamiento:");
  hojasOrdenadas.forEach((h, i) => {
    const { mes, año } = parsearNombreHoja(h);
    console.log(`   ${i + 1}. ${h} (${mes}/${año})`);
  });

  console.log("\n" + "=".repeat(50) + "\n");

  // Procesar cada mes
  for (const nombreHoja of hojasOrdenadas) {
    const { mes, año } = parsearNombreHoja(nombreHoja);

    console.log(`\n📅 PROCESANDO: ${nombreHoja.toUpperCase()} (${mes}/${año})`);
    console.log("─".repeat(50));

    // Crear registro del mes
    const fechaInicio = new Date(año, mes - 1, 1);
    const fechaFin = new Date(año, mes, 0);

    const mesRecord = await prisma.mes.upsert({
      where: {
        año_mes: { año, mes },
      },
      create: {
        año,
        mes,
        fechaInicio,
        fechaFin,
      },
      update: {},
    });

    console.log(`✓ Mes creado/encontrado: ID ${mesRecord.id}`);

    // Leer la hoja
    const hoja = workbook.Sheets[nombreHoja];
    if (!hoja) {
      console.log("   ⚠️  Hoja no encontrada, saltando...");
      continue;
    }

    const datos = XLSX.utils.sheet_to_json(hoja, {
      header: 1,
      defval: "",
    }) as any[][];

    // Detectar estructura
    const estructura = detectarEstructura(datos);

    console.log("\n🔍 Estructura detectada:");
    const columnasEncontradas = Object.keys(estructura.columnas);

    if (columnasEncontradas.length === 0) {
      console.log("   ⚠️  No se detectaron columnas conocidas");
      console.log("   Saltando este mes...");
      continue;
    }

    columnasEncontradas.forEach((col) => {
      console.log(`   ✓ ${col.toUpperCase()}`);
    });

    // Procesar cada columna encontrada
    let totalRegistros = 0;

    if (estructura.columnas.gastos) {
      const count = await procesarColumna(
        datos,
        estructura.columnas.gastos,
        mesRecord.id,
        "gasto"
      );
      console.log(`\n   → Gastos: ${count} registros insertados`);
      totalRegistros += count;
    }

    if (estructura.columnas.pagos) {
      const count = await procesarColumna(
        datos,
        estructura.columnas.pagos,
        mesRecord.id,
        "pago"
      );
      console.log(`   → Pagos: ${count} registros insertados`);
      totalRegistros += count;
    }

    if (estructura.columnas.ingresos) {
      const count = await procesarColumna(
        datos,
        estructura.columnas.ingresos,
        mesRecord.id,
        "ingreso"
      );
      console.log(`   → Ingresos: ${count} registros insertados`);
      totalRegistros += count;
    }

    // Calcular totales
    const totales = await actualizarTotales(mesRecord.id);

    console.log("\n💰 Totales del mes:");
    console.log(`   Ingresos: $${totales.totalIngresos.toFixed(2)}`);
    console.log(`   Gastos:   $${totales.totalGastos.toFixed(2)}`);
    console.log(`   Pagos:    $${totales.totalPagos.toFixed(2)}`);
    console.log(`   Saldo:    $${totales.saldo.toFixed(2)}`);

    // Detectar columnas nuevas que no están en el schema
    const columnasNuevas = [];
    if (estructura.columnas.gastosDiarios)
      columnasNuevas.push("GASTOS DIARIOS");
    if (estructura.columnas.tarjetas) columnasNuevas.push("TARJETAS");

    if (columnasNuevas.length > 0) {
      console.log("\n⚠️  COLUMNAS NUEVAS DETECTADAS:");
      columnasNuevas.forEach((col) => console.log(`   - ${col}`));
      console.log("   Estas requieren agregar tablas al schema.");
      console.log("   Por ahora se omiten, pero deberías agregarlas.");
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("\n✅ MIGRACIÓN COMPLETADA\n");

  // Resumen final
  const totalMeses = await prisma.mes.count();
  const totalGastos = await prisma.gasto.count();
  const totalPagos = await prisma.pago.count();
  const totalIngresos = await prisma.ingreso.count();

  console.log("📊 RESUMEN GLOBAL:");
  console.log(`   Meses procesados: ${totalMeses}`);
  console.log(`   Total gastos:     ${totalGastos} registros`);
  console.log(`   Total pagos:      ${totalPagos} registros`);
  console.log(`   Total ingresos:   ${totalIngresos} registros`);
  console.log();
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
