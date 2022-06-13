import { Customer_Repo } from './repo/customer.repo'
import { Admin_Repo } from './../admin/repo/admin.repo'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

  // * Note - below we are making direct calls to the Admin_Repo due to limited scope and time. Under normal circumstances, we'd make a call to a separate Admin service via remote procedure calls or notification pushes.
@Injectable()
export class Customer_Http_Service {
  constructor(
    private readonly _customer_repo: Customer_Repo,
    private readonly _admin_repo: Admin_Repo,
  ) {}

  private _get_customer(customer_id: string) {
    const customer = this._customer_repo
      .get_customer_by_id(customer_id)

    if (!customer) {
      throw new NotFoundException('customer not found')
    }

    return customer
  }

  private _get_discount(discount_id: string) {
    const discount = this._admin_repo.get_discount_by_id(
      discount_id,
    )

    if (!discount) {
      throw new BadRequestException('discount does not exist')
    }

    return discount
  }

  create_customer() {
    return this._customer_repo.create_customer()
  }

  get_customer_discount(customer_id: string) {
    const customer = this._get_customer(customer_id)

    if (!customer.discount_id) return null

    // * Note we'd normally make an RPC call to a separate Admin service.
    const discount = this._get_discount(customer.discount_id)

    return discount
  }

  purchase(customer_id: string) {
    const purchase_count = this._customer_repo
      .increment_purchase_count(customer_id)

    const store = this._admin_repo.get_store()

    if (purchase_count >= store.nth) {
      const discount_id = store.current_discount_id

      if (store.current_discount_id) {
        this._customer_repo.add_discount({
          customer_id,
          discount_id,
        })
        // * Note this would normally be performed with cross-service communication such as a notification push.
        this._admin_repo.increment_discounts_given()
      }
    }

    // * Note this would normally be performed with cross-service communication such as a notification push.
    this._admin_repo.increment_store_purchases()

    return this._get_customer(customer_id)
  }

  purchase_with_discount(customer_id: string) {
    const customer = this._get_customer(customer_id)

    if (!customer.discount_id) {
      throw new BadRequestException('customer has no discount')
    }

    // * Note we'd normally make an RPC call to a separate Admin service.
    this._get_discount(customer.discount_id)

    this._customer_repo.use_discount(customer_id)
    // * Note this might normally be performed via a notification service to notify the Admin service.
    this._admin_repo.increment_discounts_used()

    return this._get_customer(customer_id)
  }
}
