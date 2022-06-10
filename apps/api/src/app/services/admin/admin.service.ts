import { Admin_Repo } from './repo'
import { Injectable } from '@nestjs/common'
import { T_Discount_Lite } from './dtos/discount.dto'

@Injectable()
export class Admin_Http_Service {
  constructor(
    private readonly _repo: Admin_Repo,
  ) {}
  get_store() {
    return this._repo.get_store()
  }

  add_discount(discount: T_Discount_Lite) {
    return this._repo.add_discount(discount)
  }

  update_nth(nth: number) {
    return this._repo.set_nth(nth)
  }
}
