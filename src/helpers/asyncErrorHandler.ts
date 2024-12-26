import { Router, Request, Response, NextFunction } from "express";

export const wrapAsyncRoutes = (router: Router): Router => {
    router.stack.forEach((layer) => {
        if (layer.route) {
            layer.route.stack.forEach((routeLayer) => {
                const originalHandler = routeLayer.handle;
                routeLayer.handle = async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        await originalHandler(req, res, next);
                    } catch (err) {
                        next(err);
                    }
                };
            });
        }
    });
    return router;
};
