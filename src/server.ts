import app from "./app";
import config from "./config";
import { transporter } from "./lib/nodemailer";
import { prisma } from "./lib/prisma";
import { redisClient } from "./lib/redis";
import {
  seedTesterAdmin,
  seedTesterCitizen,
  seedTesterStaff,
} from "./utils/seed";

const port = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully");

    await redisClient.connect();
    console.log("Redis Connected Successfully.");

    await transporter.verify();
    console.log("Nodemailer Connected Successfully.");

    await seedTesterAdmin();
    await seedTesterStaff();
    await seedTesterCitizen();

    app.listen(port, () => {
      console.log("Server is running on Port 5000");
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
