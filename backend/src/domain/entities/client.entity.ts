import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    phone: number

    @Column()
    coordinates: any
}    