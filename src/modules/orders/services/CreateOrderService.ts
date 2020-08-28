import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Client not exists');
    }

    const productList = await this.productsRepository.findAllById(products);

    if (!productList.length) {
      throw new AppError('Product in list not exists');
    }

    const productListID = productList.map(product => product.id);

    const checkInexistingProducts = products.filter(product =>
      productListID.includes(product.id),
    );

    if (!checkInexistingProducts) {
      throw new AppError(`Could not find this product`);
    }

    const checkNoQuantityProducts = products.filter(
      product =>
        productList.filter(list => list.id === product.id)[0].quantity <
        product.quantity,
    );

    if (checkNoQuantityProducts.length > 0) {
      throw new AppError('The quantity is not avaible');
    }

    const formatedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productList.filter(list => list.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer,
      products: formatedProducts,
    });

    const orderdProductsQuantity = products.map(product => ({
      id: product.id,
      quantity:
        productList.filter(list => list.id === product.id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderdProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
