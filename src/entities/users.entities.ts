import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("users")
class Users{

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

    @CreateDateColumn({type:'timestamp'})
    createdAt:Date

    @UpdateDateColumn({type:'timestamp'})
    updatedAt:Date

    @DeleteDateColumn({type:'timestamp'})
    deletedAt:Date

}

export{
    Users
}