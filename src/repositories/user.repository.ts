import { User } from 'src/entities/user.entity';
import { DefaultRepository } from './default.repository';

export class UserRepository extends DefaultRepository<User> {}
