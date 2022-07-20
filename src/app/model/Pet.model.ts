import { Categorie } from "./Categorie.model"
import { Tag } from "./Tag.model"

export interface Pet {
    id: number
    category:Categorie
    name:any,
    photoUrls:any
    tags:Tag
    status:any
}