import { I_Discount, I_Store } from '@schema'
import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import * as cloneDeep from 'lodash.clonedeep'

@Injectable()
export class Admin_Repo {
  private readonly _store_db: I_Store = {
    count_discounts_given: 0,
    count_discounts_used: 0,
    count_store_purchases: 0,
    nth: 0,
  }

  private readonly _discounts_db: Record<string, I_Discount> = {}

  add_discount(partial_discount: Omit<I_Discount, 'id'>) {
    let id = uuidv4()

    // Ensure id is unique.
    while (this._discounts_db[id]) {
      console.log('uuid collision - creating new uuid')
      id = uuidv4()
    }

    const discount: I_Discount = {
      id,
      ...partial_discount,
    }

    this._discounts_db[id] = discount
    // Note we are making the assumption that any new discount should be the current discount given for "nth" transaction.
    this._store_db.current_discount_id = id
    return discount
  }

  // Helper method for tests.
  get_discounts() {
    return cloneDeep(this._discounts_db)
  }

  get_discount_by_id(id: string) {
    return this._discounts_db[id]
  }

  get_store() {
    // Working with all primitive object so no need for deep copy.
    return Object.assign({}, this._store_db)
  }

  increment_discounts_given() {
    this._store_db.count_discounts_given += 1
  }

  increment_discounts_used() {
    this._store_db.count_discounts_used += 1
    // A discount used indicates a store purchase took palce.
    this.increment_store_purchases()
  }

  increment_store_purchases() {
    this._store_db.count_store_purchases += 1
  }

  set_nth(nth: number) {
    this._store_db.nth = nth
  }


}
