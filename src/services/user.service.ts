// src/services/user.service.ts

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { RegisterInput } from "../schemas/register.schema";

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(
    data.password,
    SALT_ROUNDS
  );

  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
  };
}