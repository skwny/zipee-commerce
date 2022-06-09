export function schema(): string {
  return 'schema';
}

export interface I_Store {
  count_discounts_given: number
  count_discounts_used: number
  count_store_purchases: number
  current_discount_id?: string
  nth: number
}

export interface I_Customer {
  id: string
  count_purchase: number
  // This is the foreign key for I_Discount collection id
  discount?: string
}

export interface I_Discount {
  id: string
  code: string
  // This is arbitrary due to project scope and can be a percent, dollar amount, etc.
  amount: number
}
