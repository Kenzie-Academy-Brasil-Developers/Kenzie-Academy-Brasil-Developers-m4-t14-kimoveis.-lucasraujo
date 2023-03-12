import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entities";
import { User } from "./users.entities";

@Entity("schedule")
class Schedule {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;
}

export { Schedule };
