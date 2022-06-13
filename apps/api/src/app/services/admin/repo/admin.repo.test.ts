import { I_Store } from '@schema'
import { Admin_Repo } from './admin.repo'
import { Test, TestingModule } from '@nestjs/testing'

describe('Admin Repo tests', () => {
  let repo: Admin_Repo
  let app: TestingModule
  const store_init: I_Store = {
    count_discounts_given: 0,
    count_discounts_used: 0,
    count_store_purchases: 0,
    nth: 0,
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [Admin_Repo],
    }).compile()
    repo = app.get<Admin_Repo>(Admin_Repo);
  })

  afterEach(async() => {
    // Reset the repo since data store may be modified with each test..
    app = await Test.createTestingModule({
      providers: [Admin_Repo],
    }).compile()

    repo = app.get<Admin_Repo>(Admin_Repo);
  })


  it('should init empty stores', () => {
    expect(repo.get_store()).toEqual(store_init)
    expect(repo.get_discounts()).toEqual({})
  })

  it('should add a discount', () => {
    const discount = repo.add_discount({code: 'foo', amount: 5})
    expect(repo.get_discounts()[discount.id]).toEqual(discount)
    // TODO - mock uuid and add test for unique id logic.
  })

  it('should get discounts', () => {
    const discount1 = repo.add_discount({code: 'foo', amount: 5})
    expect(repo.get_discounts()[discount1.id]).toEqual(discount1)
    const discount2 = repo.add_discount({code: 'bar', amount: 6})
    expect(repo.get_discounts()[discount2.id]).toEqual(discount2)
  })

  it('should inc discounts given', () => {
    expect(repo.get_store().count_discounts_given).toBe(0)
    repo.increment_discounts_given()
    expect(repo.get_store().count_discounts_given).toBe(1)
  })

  it('should inc discounts used', () => {
    expect(repo.get_store().count_discounts_used).toBe(0)
    repo.increment_discounts_used()
    expect(repo.get_store().count_discounts_used).toBe(1)
  })

  it('should inc store purchases', () => {
    expect(repo.get_store().count_store_purchases).toBe(0)
    repo.increment_store_purchases()
    expect(repo.get_store().count_store_purchases).toBe(1)
  })

  it('should set nth transaction value', () => {
    repo.set_nth(1)
    expect(repo.get_store().nth).toBe(1)
  })
})
