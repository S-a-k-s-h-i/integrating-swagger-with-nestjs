import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
    
    @Column()
    userName:string;

    @Column({ type: 'int' })
    age: number;
  
    @Column({ default: true })
    isActive: boolean;


}
