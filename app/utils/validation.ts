import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
  rememberMe: z.boolean().optional(),
});

// Signup form validation schema
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Nome é obrigatório' })
      .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    email: z
      .string()
      .min(1, { message: 'E-mail é obrigatório' })
      .email({ message: 'E-mail inválido' }),
    password: z
      .string()
      .min(1, { message: 'Senha é obrigatória' })
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
      .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
      .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
      .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter pelo menos um caractere especial' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha' }),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, { message: 'Você deve concordar com os termos e condições' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

// Helper function to validate form data
export const validateForm = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path[0]] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false };
  }
};
