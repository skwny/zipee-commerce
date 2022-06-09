import { Admin_Repo } from './repo'
import { Injectable } from '@nestjs/common'
import { I_Store } from '@schema'

@Injectable()
export class Admin_Http_Service {
  constructor(
    private readonly _repo: Admin_Repo,
  ) {}
  get_store(): I_Store {
    return this._repo.get_store()
  }
}
