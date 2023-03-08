import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entities";
@Entity("adresses")
class Adresses{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:45})
    street:string

    @Column({length:8})
    zipCode:string

    @Column({length:7, nullable:true})
    number:string

    @Column({length:20}) 
    city:string

    @Column({length:2})
    state:string

    @OneToOne(()=> RealEstate)
    real_estate: RealEstate
}
export {
    Adresses
}