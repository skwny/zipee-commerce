import { Controller, Get, Param, Post } from '@nestjs/common'
import { Customer_Http_Service } from './customer.service'

@Controller('customer')
export class Customer_Http_Controller {
  constructor(
    private readonly _https: Customer_Http_Service,
  ) {}

  @Get(':customer_id/discount')
  get_user_discount(
    @Param('customer_id') customer_id: string,
  ) {
    return this._https.get_customer_discount(customer_id)
  }

  @Post(':customer_id/discount-purchase')
  purchase_with_discount(
    @Param('customer_id') customer_id: string,
  ) {
    return this._https.purchase_with_discount(customer_id)
  }

  @Post(':customer_id/purchase')
  purchase(@Param('customer_id') customer_id: string) {
    return this._https.purchase(customer_id)
  }

  @Post('')
  create_user() {
    return this._https.create_customer()
  }
}
