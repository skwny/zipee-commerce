import { Injectable, NotFoundException } from '@nestjs/common'
import { I_Customer } from '@schema'
import { v4 as uuidv4 } from 'uuid'

type Customers = Record<string, I_Customer>

@Injectable()
export class Customer_Repo {
  private readonly _customer_db: Customers = {}

  // * Normally we'd lean on database capabilities to throw on missing data.
  private _check_customer(customer_id: string) {
    if (!this._customer_db[customer_id]) {
      throw new NotFoundException('customer not found')
    }
  }

  create_customer() {
    let id = uuidv4()

    // Ensure id is unique.
    while (this._customer_db[id]) {
      console.log('uuid collision - creating new uuid')
      id = uuidv4()
    }

    this._customer_db[id] = { id, count_purchase: 0 }

    return this._customer_db[id]
  }

  get_customer_by_id(
    customer_id: string,
  ): I_Customer | undefined {
    return this._customer_db[customer_id]
  }

  use_discount(customer_id: string) {
    this._check_customer(customer_id)
    // When a customer uses a discount, the discount should no longer be available to the customer.
    if (this._customer_db[customer_id].discount_id) {
      delete this._customer_db[customer_id].discount_id
    }
  }

  increment_purchase_count(customer_id: string) {
    this._check_customer(customer_id)
    this._customer_db[customer_id].count_purchase += 1
    return this._customer_db[customer_id].count_purchase
  }

  add_discount(p: {
    customer_id: string,
    discount_id: string,
  }) {
    this._check_customer(p.customer_id)
    this._customer_db[p.customer_id].discount_id = p.discount_id
    // * Resetting count_purchase here using the assumption that nth transaction tracking should reset with each new discount. E.g. if a new discount is created from the admin, then the customer can have access to the new discount next time they reach nth transaction. Perhaps the proper way to do this would be to allow customers to accumulate multiple discounts rather than only one at a time.
    this._customer_db[p.customer_id].count_purchase = 0
  }




}
