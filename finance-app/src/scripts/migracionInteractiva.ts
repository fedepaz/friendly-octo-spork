import * as XLSX from "xlsx";
import { PrismaClient, Category, Prisma } from "../generated/prisma";

// ... other imports ...

let categoriasCache: CategoriaCache[] = [];

async function cargarCategorias() {
  const cats: Category[] = await prisma.category.findMany();
  categoriasCache = cats.map((c: Category) => ({
    id: c.id,
    nombre: c.nombre,
    normalizado: normalizarTexto(c.nombre),
  }));
}

function buscarCategoriaSimilar(
  concepto: string
): CategoriaCache | null {
  const conceptoNorm = normalizarTexto(concepto);

  for (const cat of categoriasCache) {
    const sim = similaridad(conceptoNorm, cat.normalizado);
    if (sim > 0.85) {
      // 85% de similitud
      return cat;
    }
  }

  return null;
}

async function obtenerOCrearCategoria(concepto: string): Promise<number> {
  if (!concepto || concepto.trim() === "") {
    concepto = "Varios";
  }

  console.log(`\n🏷️  Procesando concepto: "${concepto}"`);

  // Buscar categoría similar
  const similar = buscarCategoriaSimilar(concepto);

  if (similar) {
    console.log(`   ⚠️  Encontré una categoría similar: "${similar.nombre}"`);
    const respuesta = await pregunta(
      `   ¿Usar "${similar.nombre}"? (s/n/otro): `
    );

    if (respuesta.toLowerCase() === "s") {
      console.log(`   ✅ Usando categoría existente: "${similar.nombre}"`);
      return similar.id;
    } else if (respuesta.toLowerCase() === "otro") {
      const nuevaCategoria = await pregunta(
        "   Escribe el nombre de la categoría: "
      );
      const catId = await crearOBuscarCategoria(nuevaCategoria);
      return catId;
    }
  }

  // Preguntar si crear nueva
  console.log(`   📝 No existe una categoría para "${concepto}"`);
  const crear = await pregunta(
    `   ¿Crear nueva categoría "${concepto}"? (s/n/otro): `
  );

  if (crear.toLowerCase() === "s") {
    return await crearOBuscarCategoria(concepto);
  } else if (crear.toLowerCase() === "otro") {
    const nombreCat = await pregunta("   Escribe el nombre de la categoría: ");
    return await crearOBuscarCategoria(nombreCat);
  } else {
    // Mostrar lista de categorías
    console.log("\n   📋 Categorías existentes:");
    categoriasCache.forEach((cat, idx) => {
      console.log(`      ${idx + 1}. ${cat.nombre}`);
    });

    const seleccion = await pregunta(
      "   Selecciona número (o 0 para crear nueva): "
    );
    const idx = parseInt(seleccion) - 1;

    if (idx >= 0 && idx < categoriasCache.length) {
      return categoriasCache[idx].id;
    } else {
      const nombreNueva = await pregunta("   Nombre de la nueva categoría: ");
      return await crearOBuscarCategoria(nombreNueva);
    }
  }
}

async function crearOBuscarCategoria(nombre: string): Promise<number> {
  const categoria: Category = await prisma.category.upsert({
    where: { nombre },
    create: { nombre },
    update: {},
  });

  // Actualizar caché
  if (!categoriasCache.find((c) => c.id === categoria.id)) {
    categoriasCache.push({
      id: categoria.id,
      nombre: categoria.nombre,
      normalizado: normalizarTexto(categoria.nombre),
    });
  }

  console.log(`   ✅ Categoría "${nombre}" lista (ID: ${categoria.id})`);
  return categoria.id;
}

// ============================================
// MAPEO DE COLUMNAS
// ============================================

async function confirmarMapeoColumnas(
  config: ConfigColumna,
  datos: unknown[][]
): Promise<ConfigColumna> {
  console.log(`\n📊 Mapeo detectado para "${config.nombre}":`);
  console.log(`   Fila inicio: ${config.inicio + 1}`);
  console.log(`   Columna Fecha: ${config.colFecha}`);
  console.log(`   Columna Monto: ${config.colMonto}`);
  console.log(`   Columna Concepto: ${config.colConcepto}`);

  // Mostrar ejemplos
  console.log("\n   📋 Vista previa de datos:");
  for (
    let i = config.inicio;
    i < Math.min(config.inicio + 3, datos.length);
    i++
  ) {
    const fila = datos[i];
    const fecha = fila[config.colFecha] as string | number;
    const monto = fila[config.colMonto] as string | number;
    const concepto = fila[config.colConcepto] as string;

    if (!fecha || String(fecha).toUpperCase().includes("TOTAL")) break;

    console.log(`      ${fecha || "?"} | ${monto || "?"} | ${concepto || "?"}`);
  }

  const respuesta = await pregunta("\n   ¿Es correcto el mapeo? (s/n): ");

  if (respuesta.toLowerCase() !== "s") {
    console.log("\n   🔧 Configura el mapeo manualmente:");

    const inicio = await pregunta("   Fila de inicio (número): ");
    const colFecha = await pregunta("   Columna de fecha (número): ");
    const colMonto = await pregunta("   Columna de monto (número): ");
    const colConcepto = await pregunta("   Columna de concepto (número): ");

    return {
      ...config,
      inicio: parseInt(inicio) - 1,
      colFecha: parseInt(colFecha),
      colMonto: parseInt(colMonto),
      colConcepto: parseInt(colConcepto),
    };
  }

  return config;
}

// ============================================
// PROCESAMIENTO DE DATOS
// ============================================

function parsearFecha(valor: string | number): Date {
  if (typeof valor === "number") {
    // Formula para convertir fecha de Excel (número de días desde 1900) a JS Date
    const jsDate = new Date(Math.round((valor - 25569) * 86400 * 1000));
    return jsDate;
  }
  if (typeof valor === "string") {
    const date = new Date(valor);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  // Fallback
  return new Date();
}

async function procesarColumna(
  datos: unknown[][],
  config: ConfigColumna,
  mesId: number,
  tipo: "gasto" | "pago" | "ingreso"
): Promise<number> {
  const registros = [];

  for (let i = config.inicio; i < datos.length; i++) {
    const fila = datos[i];
    const fecha = fila[config.colFecha] as string | number;
    const monto = fila[config.colMonto] as string | number;
    const concepto = fila[config.colConcepto] as string;

    if (!fecha || String(fecha).toUpperCase().includes("TOTAL")) break;

    const montoNum = limpiarMonto(monto);
    if (montoNum === 0) continue;

    const fechaDate = parsearFecha(fecha);

    registros.push({
      fecha: fechaDate,
      monto: montoNum,
      concepto: String(concepto || "Sin concepto"),
    });
  }

  if (registros.length === 0) {
    console.log(`\n   ⚠️  No se encontraron registros válidos`);
    return 0;
  }

  // Mostrar preview
  console.log(`\n   📝 Se encontraron ${registros.length} registros`);
  console.log("   Vista previa:");
  registros.slice(0, 5).forEach((reg) => {
    console.log(
      `      ${reg.fecha.toLocaleDateString()} | $${reg.monto} | ${reg.concepto}`
    );
  });

  if (registros.length > 5) {
    console.log(`      ... y ${registros.length - 5} más`);
  }

  const confirmar = await pregunta(
    `\n   ¿Insertar estos ${registros.length} registros? (s/n): `
  );

  if (confirmar.toLowerCase() !== "s") {
    console.log("   ❌ Insertación cancelada");
    return 0;
  }

  // Insertar
  console.log(`\n   ⏳ Insertando registros...`);
  let insertados = 0;

  for (const reg of registros) {
    const categoryId = await obtenerOCrearCategoria(reg.concepto);

    try {
      if (tipo === "gasto") {
        await prisma.gasto.create({
          data: {
            mesId,
            fecha: reg.fecha,
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      } else if (tipo === "pago") {
        await prisma.pago.create({
          data: {
            mesId,
            fecha: reg.fecha,
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      } else if (tipo === "ingreso") {
        await prisma.ingreso.create({
          data: {
            mesId,
            fecha: reg.fecha,
            monto: reg.monto,
            concepto: reg.concepto,
            categoryId,
          },
        });
      }
      insertados++;
    } catch (error) {
      console.log(`   ⚠️  Error insertando: ${reg.concepto} - ${error as string}`);
    }
  }

  console.log(`   ✅ ${insertados} registros insertados`);
  return insertados;
}

// ============================================
// GENERACIÓN DE SCHEMA PRISMA
// ============================================

function generarModeloPrisma(
  nombreTabla: string,
  tieneCategoria: boolean,
  tieneOtrasRelaciones: string[] = []
): string {
  const relacionCategoria = tieneCategoria
    ? `  categoryId Int?
  category   Category? @relation(fields: [categoryId], references: [id])\n`
    : "";

  const otrasRelaciones = tieneOtrasRelaciones
    .map(
      (rel) =>
        `  ${rel.toLowerCase()}Id Int
  ${rel.toLowerCase()} ${rel} @relation(fields: [${rel.toLowerCase()}Id], references: [id])`
    )
    .join("\n");

  return `
model ${nombreTabla} {
  id         Int      @id @default(autoincrement())
  mesId      Int
  mes        Mes      @relation(fields: [mesId], references: [id])
  fecha      DateTime
  monto      Float
  concepto   String
${relacionCategoria}${
    otrasRelaciones ? otrasRelaciones + "\n" : ""
  }  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
`;
}

async function manejarColumnaNueva(nombreColumna: string): Promise<void> {
  console.log(`\n\n🆕 ═══════════════════════════════════════════════════════`);
  console.log(`   COLUMNA NUEVA DETECTADA: "${nombreColumna}"`);
  console.log(`   ═══════════════════════════════════════════════════════`);

  const crear = await pregunta(
    `\n   ¿Crear tabla para "${nombreColumna}"? (s/n): `
  );

  if (crear.toLowerCase() !== "s") {
    console.log("   ⏭️  Saltando esta columna...");
    return;
  }

  // Nombre de la tabla
  const sugerencia = nombreColumna
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("");

  const nombreTabla =
    (await pregunta(`   Nombre de la tabla (sugerencia: "${sugerencia}"): `)) ||
    sugerencia;

  // Relaciones
  console.log(`\n   🔗 Configurando relaciones para "${nombreTabla}":`);

  const tieneCategoria = await pregunta("      ¿Tiene categoría? (s/n): ");
  const usaCategoria = tieneCategoria.toLowerCase() === "s";

  const otrasRelaciones: string[] = [];
  let agregarMas = true;

  while (agregarMas) {
    const otra = await pregunta(
      "      ¿Otra relación? (nombre de tabla o Enter para terminar): "
    );
    if (otra && otra.trim() !== "") {
      otrasRelaciones.push(otra.trim());
    } else {
      agregarMas = false;
    }
  }

  // Generar modelo
  const modelo = generarModeloPrisma(
    nombreTabla,
    usaCategoria,
    otrasRelaciones
  );

  console.log(`\n   📄 Modelo Prisma generado:`);
  console.log("   " + "─".repeat(50));
  console.log(modelo);
  console.log("   " + "─".repeat(50));

  const guardar = await pregunta(`\n   ¿Guardar en schema.prisma? (s/n): `);

  if (guardar.toLowerCase() === "s") {
    const schemaPath = "./prisma/schema.prisma";
    fs.appendFileSync(schemaPath, modelo);
    console.log(`   ✅ Modelo agregado a ${schemaPath}`);
    console.log(`   ⚠️  Recuerda ejecutar: npx prisma migrate dev`);
  } else {
    console.log(`\n   📋 Copia este modelo manualmente:`);
    console.log(modelo);
  }

  await esperarEnter();
}

// ============================================
// ACTUALIZACIÓN DE TOTALES
// ============================================

async function actualizarTotales(mesId: number) {
  const [ingresos, gastos, pagos] = await Promise.all([
    prisma.ingreso.aggregate({ where: { mesId }, _sum: { monto: true } }),
    prisma.gasto.aggregate({ where: { mesId }, _sum: { monto: true } }),
    prisma.pago.aggregate({ where: { mesId }, _sum: { monto: true } }),
  ]);

  const totalIngresos = Number(ingresos._sum.monto || 0);
  const totalGastos = Number(gastos._sum.monto || 0);
  const totalPagos = Number(pagos._sum.monto || 0);
  const saldo = totalIngresos - totalGastos - totalPagos;

  await prisma.mes.update({
    where: { id: mesId },
    data: { totalIngresos, totalGastos, totalPagos, saldoFinal: saldo },
  });

  return { totalIngresos, totalGastos, totalPagos, saldo };
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

async function main() {
  const rutaArchivo = process.argv[2] || "./finanzas.ods";

  console.log("\n");
  console.log("╔═══════════════════════════════════════════════════════╗");
  console.log("║      🚀 MIGRACIÓN INTERACTIVA DE FINANZAS 🚀         ║");
  console.log("╚═══════════════════════════════════════════════════════╝");
  console.log(`\n📂 Archivo: ${rutaArchivo}\n`);

  // Cargar categorías existentes
  await cargarCategorias();
  console.log(`✅ Cargadas ${categoriasCache.length} categorías existentes\n`);

  const workbook = XLSX.readFile(rutaArchivo);
  const hojas = workbook.SheetNames;

  console.log(`📋 Hojas encontradas: ${hojas.length}`);
  hojas.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));

  await esperarEnter();

  // Ordenar hojas
  const hojasOrdenadas = hojas.sort((a, b) => {
    const { mes: mesA, año: añoA } = parsearNombreHoja(a);
    const { mes: mesB, año: añoB } = parsearNombreHoja(b);
    if (añoA !== añoB) return añoA - añoB;
    return mesA - mesB;
  });

  console.log("\n📅 Orden de procesamiento:");
  hojasOrdenadas.forEach((h, i) => {
    const { mes, año } = parsearNombreHoja(h);
    console.log(`   ${i + 1}. ${h} (${mes}/${año})`);
  });

  await esperarEnter();

  // Procesar cada hoja
  for (const nombreHoja of hojasOrdenadas) {
    const { mes, año } = parsearNombreHoja(nombreHoja);

    console.log("\n\n");
    console.log("═".repeat(60));
    console.log(`📅 PROCESANDO: ${nombreHoja.toUpperCase()} (${mes}/${año})`);
    console.log("═".repeat(60));

    const procesarHoja = await pregunta("\n¿Procesar esta hoja? (s/n): ");
    if (procesarHoja.toLowerCase() !== "s") {
      console.log("⏭️  Hoja saltada");
      continue;
    }

    // Crear/buscar mes
    const fechaInicio = new Date(año, mes - 1, 1);
    const fechaFin = new Date(año, mes, 0);

    const mesRecord: Mes = await prisma.mes.upsert({
      where: { año_mes: { año, mes } },
      create: { año, mes, fechaInicio, fechaFin },
      update: {},
    });

    console.log(`✅ Mes ID: ${mesRecord.id}`);

    // Leer hoja
    const hoja = workbook.Sheets[nombreHoja];
    const datos = XLSX.utils.sheet_to_json(hoja, {
      header: 1,
      defval: "",
    });

    // Detectar estructura
    const columnas = detectarEstructura(datos);

    console.log(`\n🔍 Columnas detectadas: ${columnas.size}`);
    for (const [nombre] of columnas) {
      console.log(`   ✓ ${nombre}`);
    }

    await esperarEnter("\n⏸️  Presiona Enter para revisar cada columna...");

    // Procesar columnas conocidas
    const columnasConocidas = ["GASTOS", "PAGOS", "INGRESOS"];
    const tiposMap: Record<string, "gasto" | "pago" | "ingreso"> = {
      GASTOS: "gasto",
      PAGOS: "pago",
      INGRESOS: "ingreso",
    };

    for (const [nombreCol, config] of columnas) {
      const esConocida = columnasConocidas.some((c) => nombreCol.includes(c));

      if (esConocida) {
        console.log(`\n\n📊 Procesando: ${nombreCol}`);
        const configFinal = await confirmarMapeoColumnas(config, datos);

        const tipo = Object.keys(tiposMap).find((k) => nombreCol.includes(k));
        if (tipo) {
          await procesarColumna(
            datos,
            configFinal,
            mesRecord.id,
            tiposMap[tipo]
          );
        }
      } else {
        // Columna nueva
        await manejarColumnaNueva(nombreCol);
      }
    }

    // Calcular totales
    console.log("\n💰 Calculando totales del mes...");
    const totales = await actualizarTotales(mesRecord.id);

    console.log(`\n   Ingresos: $${totales.totalIngresos.toFixed(2)}`);
    console.log(`   Gastos:   $${totales.totalGastos.toFixed(2)}`);
    console.log(`   Pagos:    $${totales.totalPagos.toFixed(2)}`);
    console.log(`   Saldo:    $${totales.saldo.toFixed(2)}`);

    await esperarEnter();
  }

  // Resumen final
  console.log("\n\n");
  console.log("═".repeat(60));
  console.log("✅ MIGRACIÓN COMPLETADA");
  console.log("═".repeat(60));

  const totalMeses: number = await prisma.mes.count();
  const totalGastos: number = await prisma.gasto.count();
  const totalPagos = await prisma.pago.count();
  const totalIngresos = await prisma.ingreso.count();

  console.log(`\n📊 RESUMEN:`);
  console.log(`   Meses:    ${totalMeses}`);
  console.log(`   Gastos:   ${totalGastos}`);
  console.log(`   Pagos:    ${totalPagos}`);
  console.log(`   Ingresos: ${totalIngresos}`);
  console.log();

  rl.close();
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => { prisma.$disconnect().catch(e => console.error("Error disconnecting Prisma:", e)); });
