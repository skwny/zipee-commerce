import { Admin_Repo_Module } from './../admin/repo/admin.repo.module'
import { Customer_Repo_Module } from './repo/customer.repo.module'
import { Module } from '@nestjs/common'
import { Customer_Http_Controller } from './customer.controller'
import { Customer_Http_Service } from './customer.service'


@Module({
  imports: [
    Customer_Repo_Module,
    // * Note the Admin repo is being exposed here due to the need for access to the admin "database" by the Customer Service module. Normally this would be done by other means such as a remote procedure call from Customer service to Admin service.
    Admin_Repo_Module,
  ],
  controllers: [Customer_Http_Controller],
  providers: [Customer_Http_Service],
})
export class Customer_Service_Module {}
