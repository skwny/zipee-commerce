import { Admin_Service_Module } from './services/admin/admin.module'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [Admin_Service_Module],
  controllers: [AppController],
  providers: [AppService],
})
export class App_Module {}
