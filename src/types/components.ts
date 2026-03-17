export type NewCartItem = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  cantidad: number;
  servicios: {
    precio: number;
    nombre: string;
    imagen: {
      url: string;
    } | null;
  } | null;
};

export type CartItemType = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
};

export type IconType = {
  width?: number;
  height?: number;
  className?: string;
};

export type User = {
  email: string;
  username?: string;
  role: string;
};

export type AuthState = {
  user: User | null;
  setUser: (user: AuthState["user"] | null) => void;
  clearUser: () => void;
};
