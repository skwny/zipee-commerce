import { IsNumber } from 'class-validator'


export class Nth_DTO {
  @IsNumber()
  nth!: number
}
