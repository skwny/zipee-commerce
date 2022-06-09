import { Admin_Repo } from './admin.repo'
import { Module } from '@nestjs/common'

@Module({
  providers: [Admin_Repo],
  exports: [Admin_Repo],
})
export class Admin_Repo_Module {}

export * from './admin.repo'
