import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { Address } from './address.entity';
import { BagItem } from './bag-item.entity';

enum ShippingStatus {
  AWAITING = 'awaiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

@Entity()
export class Shipping extends DefaultEntity {
  @ManyToOne(() => Address, { nullable: true })
  senderAddress?: Address;

  @Column({ nullable: true })
  senderNickName?: string;
  @Column({ nullable: true })
  senderFullName?: string;

  @ManyToOne(() => Address)
  recipientAddress: Address;

  @Column({ nullable: true })
  recipientNickName?: string;
  @Column({ nullable: true })
  recipientFullName?: string;

  @Column({ type: 'enum', enum: ShippingStatus })
  status: ShippingStatus;

  @OneToMany(() => BagItem, (item) => item.shipping)
  items: BagItem[];
}
