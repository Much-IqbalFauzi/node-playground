import { Router } from "express";
import itemControllers from "./item.controllers";

const router = Router();

// /api/item
router.route('/')
    .get(itemControllers.getMany)
    .post(itemControllers.createOne)

// /api/item/:id
router.route('/:id')
    .get(itemControllers.getOne)
    .put(itemControllers.updateOne)
    .delete(itemControllers.removeOne)


export default router;