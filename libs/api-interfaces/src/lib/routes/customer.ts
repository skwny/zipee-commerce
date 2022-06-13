export const CUSTOMER_CONTROLLER = 'customer'

export const customer_discount = (customer_id: string) => {
  return `${customer_id}/discount`
}

export const customer_discount_purchase = (customer_id: string) => {
  return `${customer_id}/discount-purchase`
}

export const customer_purchase = (customer_id: string) => {
  return `${customer_id}/purchase`
}
