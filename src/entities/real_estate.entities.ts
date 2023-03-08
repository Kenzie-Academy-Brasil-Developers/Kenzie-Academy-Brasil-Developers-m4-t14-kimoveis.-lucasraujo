import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Adresses } from "./addresses.entities";
import { Categories } from "./categories.entities";

@Entity("real_estate")
class RealEstate{


    @PrimaryGeneratedColumn()
    id: number;


    @Column({default:false})
    sold:boolean

    @Column({type:"decimal", precision:12, scale:2})
    value:number

    @Column({type:"integer"})
    size:number

    @CreateDateColumn({type:'timestamp'})
    createdAt:Date

    @UpdateDateColumn({type:'timestamp'})
    updatedAt:Date
    
    @ManyToOne(()=> Categories)
    category: Categories

    @OneToOne(() => Adresses)
    @JoinColumn()
    adresses: Adresses

}

export{
    RealEstate
}