import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getRealEstateController } from "../controllers/realEstate.controllers";
import { Schedule } from "./schedule.entities";


@Entity("user")
class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:45})
    name:string;

    @Column({length:45})
    email:string;

    @Column({default:false})
    admin:boolean;

    @Column({length:120})
    password:string;

    @CreateDateColumn({type:'date'})
    createdAt:Date

    @UpdateDateColumn({type:'date'})
    updatedAt:Date

    @DeleteDateColumn({type:'date'})
    deletedAt:Date

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isIncrypted = getRounds(this.password)
        if(!isIncrypted){
            this.password = hashSync(this.password, 10)
        }
    }

    @OneToMany (() => Schedule , (Schedule) => Schedule.user)
    schedule:Schedule[];

}

export{
    User
}