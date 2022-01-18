interface Contact {
  id: number;

  name: string;
  username: string;
  email: string;

  phone?: string;
  website?: string;

  address: {
    localAddress: string[];
    city: string;
    state?: string;
    zipcode: string;
    country: string;
  };

  isFavorite: boolean;
}

export type { Contact };
