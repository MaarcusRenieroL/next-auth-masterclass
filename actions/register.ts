"use server"

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!"
    }
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email: email
    }
  });

  if (existingUser) {
    return { error: "Email already in use" }
  }

  await db.user.create({
    data: {
      name, email, password: hashedPassword
    }
  });

  return { success: "New user created" }
}