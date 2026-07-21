// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { RegisterSchema } from "../schemas/register.schema";
import { registerUser } from "../services/user.service";

export async function register(req: Request, res: Response) {
  try {
    const body = RegisterSchema.parse(req.body);

    const user = await registerUser(body);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        errors: err.errors,
      });
    }

    if (err.message === "Email already exists") {
      return res.status(409).json({
        message: err.message,
      });
    }

    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}