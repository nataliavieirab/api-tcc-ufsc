// import {
//   Entity,
//   Column,
//   OneToMany,
//   OneToOne,
// } from 'src/external/decorators/orm';

import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { DefaultEntity } from './default-entity';
import { UserRole } from './user-role.entity';

// // import { Organization } from '../organization.entity';
// import {
//   User as DomainUser,
//   UserStatus,
// } from 'src/domain/entities/domain/user';
// import {
//   UserRole,
//   UserCredential,
//   UserProfile,
// } from 'src/data/entities/domain/user';
// import { UserDocument } from 'src/data/entities/domain/user/user-document.entity';
// import { IsUnique } from 'src/data/validators/uniqueness.validator';
// import { DefaultEntity } from 'src/data/entities/default-entity';
// import { UserEmail } from 'src/data/entities/domain/user/user-email.entity';

@Entity()
export class User extends DefaultEntity {
  @Column()
  @Unique('userName', [])
  userName: string;

  @OneToMany(() => UserRole, (role) => role.user)
  roles: UserRole[];

  // @Column({
  //   type: 'enum',
  //   enum: UserStatus,
  // })
  // status!: UserStatus;

  // @OneToMany(() => UserRole, (role) => role.user)
  // roles!: UserRole[];

  // @OneToMany(() => UserCredential, (credential) => credential.user)
  // credentials!: UserCredential[];

  // @OneToOne(() => UserProfile, (profile) => profile.user, { lazy: true })
  // profile?: UserProfile;

  // @OneToMany(() => UserEmail, (email) => email.user, { lazy: true })
  // emails!: UserEmail[];

  // @OneToMany(() => UserDocument, (document) => document.user)
  // documents!: UserDocument[];
}
