import { Injectable } from "@nestjs/common";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

@Injectable()
export class DbService {
  private db;

  constructor() {
    // Create connection to Neon
    const client = postgres(process.env.DATABASE_URL as string);
    
    // Create Drizzle instance (our "waiter")
    this.db = drizzle(client, { schema });
  }

  // Expose the database connection to use in other services
  getDb() {
    return this.db;
  }
}
