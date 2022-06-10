import { I_Discount } from '@schema'
import { IsString, IsNumber } from 'class-validator'

export type T_Discount_Lite = Omit<I_Discount, 'id'>

export class Discount_DTO implements T_Discount_Lite {
  @IsString()
  code!: string
  @IsNumber()
  amount!: number
}
