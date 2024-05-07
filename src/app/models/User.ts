import { Profile } from './Profile';

export class User {
  id: string | null;
  name: string;
  profiles: Profile[] | '';

  constructor(user: Partial<User> = {}) {
    this.id = user?.id || null;
    this.name = user?.name || '';
    this.profiles = user?.profiles || '';
  }
}
