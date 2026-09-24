import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { emailService } from "./emailService";

export class ExportService {

  private db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  public async runScheduledTask() {
    console.log("Export data :", new Date());
    console.log("Génération du dump SQL…");

    // 1. Lire le fichier schema.sql
    const schemaPath = path.join(__dirname, "../sql/schema.sql");
    const schemaContent = fs.readFileSync(schemaPath, "utf8");

    // 2. Récupérer toutes les tables
    const [tables] = await this.db.execute("SHOW TABLES");
    const tableNames = (tables as any[]).map(t => Object.values(t)[0]);


    let dump = schemaContent + "\n\n-- INSERTS --\n\n";

    // 3. Pour chaque table → générer les INSERT
    for (const table of tableNames) {
      const [rows] = await this.db.execute(`SELECT * FROM ${table}`);
      for (const row of rows as any[]) {
        const columns = Object.keys(row).join(", ");
        const values = Object.values(row)
          .map((v) => (v === null ? "NULL" : `'${v}'`))
          .join(", ");

        dump += `INSERT INTO ${table} (${columns}) VALUES (${values});\n`;
      }

      dump += "\n";
    }
    emailService.sendSQLScript(dump);
    console.log("Dump SQL généré :", dump);
  }
}

export const exportService = new ExportService();
