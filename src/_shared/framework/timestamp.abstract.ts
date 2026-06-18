import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

// export abstract class ATimestamp {
//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn({ name: 'deleted_at' })
//   deletedAt?: Date;
// }

export abstract class ATimestamp {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
