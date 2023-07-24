import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNotEmpty } from "class-validator";
import { IsFuture } from "../validators/isFuture";

@Entity({
  name: "vehicles"
})
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNotEmpty()
  @Column({ unique: true })
  licensePlate: string;

  @Column()
  @IsNotEmpty()
  vin: string;

  @IsNotEmpty()
  @Column()
  model: string;

  @Column()
  active: boolean;

  @IsNotEmpty()
  @Column()
  color: string;

  @IsNotEmpty()
  @IsFuture()
  @Column()
  validTill: Date;
}
