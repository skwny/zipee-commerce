import { Customer_Repo } from './customer.repo'
import { Module } from '@nestjs/common'

@Module({
  providers: [Customer_Repo],
  exports: [Customer_Repo],
})
export class Customer_Repo_Module {}

export * from './customer.repo'
