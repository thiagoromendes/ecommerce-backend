import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column()
  product_id: string;

  @Column('int')
  quantity: number;

  @Column()
  order_id: string;

  @ManyToOne(() => Product, { cascade: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
