import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Address } from "./addresses.entities";
import { Category } from "./categories.entities";
import { Schedule } from "./schedule.entities";

@Entity("realEstate")
class RealEstate{

    @PrimaryGeneratedColumn()
    id: number|string;

    @Column({default:false})
    sold:boolean

    @Column({type:"decimal", precision:12, scale:2})
    value:number|string

    @Column({type:"integer" })
    size:number|string

    @CreateDateColumn({type:'date'})
    createdAt:Date

    @UpdateDateColumn({type:'date'})
    updatedAt:Date
    
    @ManyToOne(()=> Category)
    category: Category

    @OneToOne(() => Address )
    @JoinColumn()
    address: Address 

    @OneToMany (() => Schedule , (Schedule) => Schedule.realEstate)
    @JoinColumn()
    schedules:Schedule[];

}

export{
    RealEstate
}