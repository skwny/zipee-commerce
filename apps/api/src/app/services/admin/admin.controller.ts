import { Nth_DTO } from './dtos/nth.dto'
import { Admin_Http_Service } from './admin.service'
import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common'
import { Discount_DTO, T_Discount_Lite } from './dtos/discount.dto'
import { instanceToPlain } from 'class-transformer'

@Controller('admin')
export class Admin_Http_Controller {
  constructor(private readonly _https: Admin_Http_Service) {}

  @Get('report')
  get_store_report() {
    return this._https.get_store()
  }

  @Post('discount')
  add_discount(@Body() body: Discount_DTO) {
    // TODO - find a better solution for class to object conversion.
    const d = instanceToPlain<Discount_DTO>(body) as T_Discount_Lite
    return this._https.add_discount(d)
  }

  @Patch('nth')
  update_nth(@Body() body: Nth_DTO) {
    // TODO - find a better solution for class to object conversion.
    const o = instanceToPlain<Nth_DTO>(body) as Nth_DTO
    return this._https.update_nth(o.nth)
  }
}
