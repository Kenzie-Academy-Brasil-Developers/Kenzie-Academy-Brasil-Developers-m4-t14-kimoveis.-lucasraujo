import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Categories")
class Categories{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:45, unique:true})
    name:string

}

export{
    Categories
}