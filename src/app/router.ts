import createRouter, { Request, Response } from 'express';

const router = createRouter();

router.get("/teste", (req: Request, res: Response) => {
    res.send("Requisição (GET) de Teste ok!")
});

export default router;