import { z } from "zod";
import { initTRPC } from '@trpc/server';

// Инициализация tRPC
const t = initTRPC.create();

// Экспорт основных методов
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const ptEdTechRouter = router({
    getContent: publicProcedure.query(() => ({
        title: "PTEDTECH — ПУТЬ К СОВРЕМЕННОМУ ОБРАЗОВАНИЮ",
        subtitle: "ИННОВАЦИОННАЯ ПЛАТФОРМА. ТРАНСФОРМИРУЕМ ОБУЧЕНИЕ В ЦИФРОВОЙ ФОРМАТ.",
        sections: [
            { id: 1, title: "РЕГИСТРАЦИЯ", content: "" }
        ]
    })),

    registerUser: publicProcedure
        .input(z.object({
            username: z.string().min(3),
            password: z.string().min(6)
        }))
        .mutation(async ({ input }) => {
            // Здесь обычно бывает логика регистрации через Prisma/DB
            return {
                success: true,
                username: input.username,
                message: "User registration mock success"
            };
        })
});

// Тип роутера для клиента
export type ptEdTechRouter = typeof ptEdTechRouter;