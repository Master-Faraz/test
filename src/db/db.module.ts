import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

@Global()  // Make it available everywhere without importing
@Module({
   providers: [DbService],
  exports: [DbService],  // Export so other modules can use it
})
export class DatabaseModule { }
