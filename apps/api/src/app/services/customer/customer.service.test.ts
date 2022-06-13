import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Customer_Http_Service } from './customer.service'
import { I_Customer, I_Discount, I_Store } from '@schema'
import { Admin_Repo } from './../admin/repo/admin.repo'
import { Customer_Repo } from './repo/customer.repo'
import { Customer_Service_Module } from './customer.module'
import { Test, TestingModule } from '@nestjs/testing'

describe('Customer HTTP service tests', () => {
  let mock_admin_repo: Admin_Repo
  let mock_customer_repo: Customer_Repo
  let http_service: Customer_Http_Service
  let module: TestingModule
  const customer_id = 'customer_id'
  const discount_id = 'discount_id'
  const customer_data: I_Customer = {
    id: customer_id,
    count_purchase: 1,
    discount_id,
  }
  const discount_data: I_Discount = {
    id: 'discount_id',
    code: 'code',
    amount: 100,
  }

  const mock1 = jest.fn()
  const mock2 = jest.fn()

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [Customer_Service_Module]
    })
      .overrideProvider(Admin_Repo)
      .useValue(mock_admin_repo)
      .overrideProvider(Customer_Repo)
      .useValue(mock_customer_repo)
      .compile()

    mock_admin_repo = module.get<Admin_Repo>(Admin_Repo)
    mock_customer_repo = module.get<Customer_Repo>(Customer_Repo)

    http_service = module.get<Customer_Http_Service>(Customer_Http_Service)
  })

  beforeEach(() => {
    mock_customer_repo.get_customer_by_id = mock1
    mock1.mockImplementation(() => customer_data)
    mock_admin_repo.get_discount_by_id = mock2
    mock2.mockImplementation(() => discount_data)
  })

  it('should create a customer', () => {
    const data: I_Customer = {
      id: 'id',
      count_purchase: 0,
    }

    mock_customer_repo.create_customer = jest.fn().mockReturnValue(data)

    const result = http_service.create_customer()
    expect(result).toEqual(data)
  })

  describe('Customer discount', () => {
    const fn = () => http_service.get_customer_discount(customer_id)

    it('should throw if customer not found', () => {
      mock1.mockImplementationOnce(() => undefined)
      expect(fn).toThrow(NotFoundException)
    })

    it('should throw if discount not found', () => {
      mock2.mockImplementationOnce(() => undefined)
      expect(fn).toThrow(BadRequestException)
    })

    it ('should get customer discount', () => {
      const res = http_service.get_customer_discount(customer_id)
      expect(res).toEqual(discount_data)
    })

    it ('should return null if customer has no discount', () => {
      const customer_data: I_Customer = {
        id: customer_id,
        count_purchase: 1,
      }
      mock1.mockImplementationOnce(() => customer_data)
      // mock_customer_repo.get_customer_by_id = jest.fn()
      //   .mockReturnValueOnce(customer_data)
      const res = http_service.get_customer_discount(customer_id)
      expect(res).toBe(null)
    })
  })

  describe('Customer purchase', () => {
    let purchase_count = 0
    const get_store_mock = jest.fn()

    const create_store = (p_store: Partial<I_Store>) => {
      return Object.assign<
        I_Store,
        Partial<I_Store>
      >(
        {
          count_discounts_given: 0,
          count_discounts_used: 0,
          count_store_purchases: 0,
          current_discount_id: discount_id,
          nth: 0,
        },
        p_store,
      )
    }

    beforeAll(() => {
      mock_customer_repo.increment_purchase_count = jest.fn()
        .mockReturnValue(purchase_count + 1)
      mock_admin_repo.get_store = get_store_mock
      get_store_mock.mockReturnValue(create_store({nth: 1}))
      mock_customer_repo.add_discount = jest.fn()
        .mockImplementation(() => null)
      mock_admin_repo.increment_discounts_given = jest.fn()
        .mockImplementation(() => null)
      mock_admin_repo.increment_store_purchases = jest.fn()
        .mockImplementation(() =>  null)
    })

    beforeEach(() => {
      purchase_count = 0
      jest.clearAllMocks()
    })

    it('gives customer a discount', () => {
      const res = http_service.purchase(customer_id)

      expect(mock_customer_repo.add_discount)
        .toHaveBeenCalledWith({customer_id, discount_id})

      expect(mock_admin_repo.increment_discounts_given)
        .toHaveBeenCalledTimes(1)

      expect(res).toEqual(customer_data)
    })

    it('does not give the customer a discount if not nth transaction', () => {
      get_store_mock.mockReturnValueOnce(create_store({nth: 10}))
      http_service.purchase(customer_id)
      expect(mock_customer_repo.add_discount).not.toHaveBeenCalled()
    })

    it ('does not give the customer a discount if no discount exists', () => {
      const store = create_store({nth: 1})
      delete store.current_discount_id
      expect(mock_customer_repo.add_discount).not.toHaveBeenCalled()
    })

    it ('increments store purchases', () => {
      http_service.purchase(customer_id)
      expect(mock_admin_repo.increment_store_purchases).toHaveBeenCalledTimes(1)
    })
  })

  describe('purchase with discount', () => {

    it('throws if customer does not have discount', () => {
      const fn = () => http_service.purchase_with_discount(customer_id)

      const customer_data: I_Customer = {
        id: customer_id,
        count_purchase: 1,
      }
      mock1.mockImplementationOnce(() => customer_data)
      expect(fn).toThrow(BadRequestException)
    })

    it('uses the discount', () => {
      mock_customer_repo.use_discount = jest.fn()
        .mockImplementationOnce(() => null)
      mock_admin_repo.increment_discounts_used = jest.fn()
        .mockImplementationOnce(() => null)
      const res = http_service.purchase_with_discount(customer_id)
      expect(mock_customer_repo.use_discount).toHaveBeenCalledWith(customer_id)
      expect(mock_admin_repo.increment_discounts_used).toHaveBeenCalled()
      expect(res).toEqual(customer_data)

    })
  })
})
