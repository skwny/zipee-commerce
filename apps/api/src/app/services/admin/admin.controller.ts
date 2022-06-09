import { Admin_Http_Service } from './admin.service'
import { Controller, Get } from '@nestjs/common'
import { I_Store } from '@schema'

@Controller('admin')
export class Admin_Http_Controller {
  constructor(private readonly _https: Admin_Http_Service) {}

  @Get('store')
  get_store(): I_Store {
    return this._https.get_store()
  }
}
