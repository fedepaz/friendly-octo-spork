// src/__tests__/i18n-hardcoded.spec.ts
import * as fs from "fs";
import * as path from "path";

const SRC = path.join(__dirname, "..");

// Every hardcoded user-facing string called out in issue #77. If any of
// these literals creep back into JSX/TS source (message JSON files are
// fine — they ARE the translations), this test fails.
const FORBIDDEN: Array<{ file: string; literal: string }> = [
  {
    file: "features/createTransaction/hooks/createMutationHooks.ts",
    literal: "Creada la transacción",
  },
  {
    file: "features/updateCardBalance/hooks/updateCardMutationHooks.ts",
    literal: "Actualizado el saldo de tarjeta",
  },
  {
    file: "features/updateCardBalance/providers/SmartFormProviderCard.tsx",
    literal: "Error de Operacion",
  },
  {
    file: "components/data-display/data-table/column-filters.tsx",
    literal: "No hay resultados",
  },
  {
    file: "app/[locale]/(auth)/layout.tsx",
    literal: "Terminal de Operaciones",
  },
  {
    file: "app/[locale]/(auth)/layout.tsx",
    literal: "Secure Financial Interface",
  },
  {
    file: "components/data-display/data-table/data-table.tsx",
    literal: "REGISTROS",
  },
  {
    file: "modules/auth/auth.controller.ts", // resolved below under apps/backend
    literal: "Contraseña actualizada",
  },
];

describe("i18n hardcoded strings (#77)", () => {
  it.each(FORBIDDEN)(
    "source of $file no longer contains the hardcoded literal '$literal'",
    ({ file, literal }) => {
      const fullPath = file.startsWith("modules/")
        ? path.join(SRC, "..", "..", "backend", "src", file)
        : path.join(SRC, file);
      const source = fs.readFileSync(fullPath, "utf8");
      expect(source).not.toContain(literal);
    },
  );

  it("provides the auth hero copy as messages in both locales", async () => {
    const en = JSON.parse(
      fs.readFileSync(
        path.join(SRC, "app/[locale]/(auth)/messages/en.json"),
        "utf8",
      ),
    );
    const es = JSON.parse(
      fs.readFileSync(
        path.join(SRC, "app/[locale]/(auth)/messages/es.json"),
        "utf8",
      ),
    );

    expect(en.AuthLayout.title).toBe("Operations Terminal");
    expect(en.AuthLayout.subtitle).toContain("Secure Financial Interface");
    expect(es.AuthLayout.title).toBe("Terminal de Operaciones");
    expect(es.AuthLayout.subtitle).toContain("Interfaz financiera segura");
  });

  it("provides toast messages for the transaction and card-close hooks", async () => {
    const createEn = JSON.parse(
      fs.readFileSync(
        path.join(
          SRC,
          "features/createTransaction/hooks/CreateTransactionHooks/messages/en.json",
        ),
        "utf8",
      ),
    );
    const createEs = JSON.parse(
      fs.readFileSync(
        path.join(
          SRC,
          "features/createTransaction/hooks/CreateTransactionHooks/messages/es.json",
        ),
        "utf8",
      ),
    );
    expect(createEn.CreateTransactionHooks.toastSuccess).toContain(
      "Transaction created",
    );
    expect(createEs.CreateTransactionHooks.toastSuccess).toContain(
      "Transacción creada",
    );

    const cardEn = JSON.parse(
      fs.readFileSync(
        path.join(
          SRC,
          "features/updateCardBalance/hooks/UpdateCardBalanceHooks/messages/en.json",
        ),
        "utf8",
      ),
    );
    expect(cardEn.UpdateCardBalanceHooks.toastSuccess).toContain(
      "Card balance",
    );
  });

  it("translates the REGISTROS badge through the DataTable messages", async () => {
    const en = JSON.parse(
      fs.readFileSync(
        path.join(
          SRC,
          "components/data-display/data-table/DataTable/messages/en.json",
        ),
        "utf8",
      ),
    );
    const es = JSON.parse(
      fs.readFileSync(
        path.join(
          SRC,
          "components/data-display/data-table/DataTable/messages/es.json",
        ),
        "utf8",
      ),
    );
    expect(en.DataTable.recordsLabel).toBe("RECORDS");
    expect(es.DataTable.recordsLabel).toBe("REGISTROS");
  });
});
