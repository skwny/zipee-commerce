import { Admin_Http_Controller } from './admin.controller'
import { Admin_Http_Service } from './admin.service'
import { Admin_Repo_Module } from './repo/admin.repo.module'
import { Module } from '@nestjs/common'


@Module({
  imports: [Admin_Repo_Module],
  controllers: [Admin_Http_Controller],
  providers: [Admin_Http_Service],
})
export class Admin_Service_Module {}
