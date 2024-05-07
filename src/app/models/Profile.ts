export class Profile {
  id: string | null;
  description: string;

  constructor(profile: Partial<Profile> = {}) {
    this.id = profile?.id || null;
    this.description = profile?.description || '';
  }
}
