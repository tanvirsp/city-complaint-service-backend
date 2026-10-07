import bcrypt from "bcryptjs";
import httpStatus from "http-status";

import config from "../config";
import { prisma } from "../lib/prisma";

import { Role } from "../../generated/prisma/enums";
import { AppError } from "./AppErrors";

//create tester admin
export const seedTesterAdmin = async () => {
  try {
    const isAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });

    if (isAdminExist) {
      console.log("Admin Already Exists!");
      return;
    }

    const name = config.tester_admin_name;
    const email = config.tester_admin_email;
    const password = config.tester_admin_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Admin Name , Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        emailVerified: true,
      },
    });

    console.log("Admin Admin Created");
  } catch (error) {
    console.log("Error Seeding Admin : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_admin_email,
      },
    });
  }
};

// create tester Staff
export const seedTesterStaff = async () => {
  try {
    const isTesterDoctorExist = await prisma.user.findUnique({
      where: {
        email: config.tester_staff_email,
      },
    });

    if (isTesterDoctorExist) {
      console.log("Tester Staff Already Exists!");
      return;
    }

    const name = config.tester_staff_name;
    const email = config.tester_staff_email;
    const password = config.tester_staff_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Staff Name , Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const categoryCreate = await prisma.category.create({
      data: {
        name: "Default",
        type: "COMPLAINT",
      },
    });

    const staff = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: true,
        role: Role.STAFF,
      },
    });

    await prisma.staff.create({
      data: {
        name,
        email,
        categoryId: categoryCreate.id,
        experienceYears: 2,
        userId: staff.id,
      },
    });

    console.log("Tester Staff Created");
  } catch (error) {
    console.log("Error Seeding Tester Staff : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_staff_email,
      },
    });
  }
};

// create tester Citizen
export const seedTesterCitizen = async () => {
  try {
    const isTesterCitizenExist = await prisma.user.findUnique({
      where: {
        email: config.tester_citizen_email,
      },
    });

    if (isTesterCitizenExist) {
      console.log("Tester Citizen Already Exists!");
      return;
    }

    const name = config.tester_citizen_name;
    const email = config.tester_citizen_email;
    const password = config.tester_citizen_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Citizen Name , Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerCitizen = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: true,
        role: Role.CITIZEN,
      },
    });

    await prisma.citizen.create({
      data: {
        name,
        email,
        userId: testerCitizen.id,
      },
    });

    console.log("Tester Citizen Created");
  } catch (error) {
    console.log("Error Seeding Tester Citizen : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_citizen_email,
      },
    });
  }
};
