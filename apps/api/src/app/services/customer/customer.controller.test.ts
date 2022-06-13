import { I_Discount, I_Customer } from '@schema'
import { Test } from '@nestjs/testing'
import { Customer_Http_Service } from './customer.service'
import { Customer_Http_Controller } from './customer.controller'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CUSTOMER_CONTROLLER, customer_discount, customer_discount_purchase, customer_purchase } from '@zipee-commerce/api-interfaces'

describe('Controller tests', () => {
  const ctrl = CUSTOMER_CONTROLLER
  let app: INestApplication
  let mock_http_service: any = {}

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [Customer_Http_Controller],
      providers: [Customer_Http_Service],
    })
    .overrideProvider(Customer_Http_Service)
    .useValue(mock_http_service)
    .compile()

    mock_http_service = module.get<Customer_Http_Service>(Customer_Http_Service)
    app = module.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    jest.resetAllMocks()
  })

  it('should get the customer discount', () => {
    const result: I_Discount = {
      id: 'id',
      code: 'code',
      amount: 100,
    }

    mock_http_service.get_customer_discount = jest.fn().mockReturnValue(result)

    return request(app.getHttpServer())
      .get(`/${ctrl}/${customer_discount('customer_id')}`)
      .expect(200)
      .expect(mock_http_service.get_customer_discount('customer_id'))
  })

  it('should purchase with discount', () => {
    const result: I_Customer = {
      id: 'id',
      count_purchase: 1,
    }

    mock_http_service.purchase_with_discount = jest.fn().mockReturnValue(result)

    return request(app.getHttpServer())
      .post(`/${ctrl}/${customer_discount_purchase('customer_id')}`)
      .expect(201)
      .expect(mock_http_service.purchase_with_discount('customer_id'))
  })

  it('should purchase without discount', () => {
    const result: I_Customer = {
      id: 'id',
      count_purchase: 1,
    }

    mock_http_service.purchase = jest.fn().mockReturnValue(result)

    return request(app.getHttpServer())
      .post(`/${ctrl}/${customer_purchase('customer_id')}`)
      .expect(201)
      .expect(mock_http_service.purchase('customer_id'))
  })

  it('should create a new user', () => {
    const result: I_Customer = {
      id: 'id',
      count_purchase: 1,
    }

    mock_http_service.create_customer = jest.fn().mockReturnValue(result)

    return request(app.getHttpServer())
      .post(`/${ctrl}`)
      .expect(201)
      .expect(mock_http_service.create_customer('customer_id'))
  })
})
