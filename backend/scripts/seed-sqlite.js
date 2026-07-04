import {
  initialSellerEntries,
  listingProducts,
  mockProducts,
  popularGames,
} from "../data.js";
import {
  databasePath,
  getDatabaseStats,
  resetDatabase,
  seedDatabase,
} from "../database.js";

resetDatabase();
seedDatabase({
  products: mockProducts,
  listingProducts,
  popularGames,
  sellerEntries: initialSellerEntries,
});

console.log(`Seeded SQLite database: ${databasePath}`);
console.table(getDatabaseStats());
