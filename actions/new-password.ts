"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { PasswordResetSchema } from "@/schemas"
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof PasswordResetSchema>, token?: string) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email doesn't exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    }, data: {
      password: hashedPassword,
    }
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    }
  });

  return { success: "Password updated!" };
}
