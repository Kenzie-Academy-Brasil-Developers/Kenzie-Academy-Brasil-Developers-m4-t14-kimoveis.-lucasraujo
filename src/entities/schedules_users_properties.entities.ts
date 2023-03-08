import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entities";
import { Users } from "./users.entities";

@Entity("shedules_users_properties")
class ShedulesUsersProperties{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'timestamp'})
    date: Date| string

    @Column({type:'timestamp'})
    hour:Date|string

    @ManyToOne(()=> Users)
    users: Users

    @ManyToOne(()=> RealEstate)
    real_estate: RealEstate

}

export{
    ShedulesUsersProperties
}