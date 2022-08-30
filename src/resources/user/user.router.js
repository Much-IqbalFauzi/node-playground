import { Router } from "express";
import { person, updatePerson } from "./user.controllers";

const router = Router()

router.route('/', person)
router.route('/:id', updatePerson)

export default router