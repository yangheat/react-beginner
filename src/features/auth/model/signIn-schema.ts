import { email, password } from "@/shared/config/zod.config";
import z from "zod";

export const SignInData = z.object({ email, password })