import { crudControllers } from "../../utils/crud";
import { Item } from "./item.model";

export default crudControllers(Item)

/*
export default {
    ...crudControllers(Item), 
    getOne() {
        something
    }
}
*/