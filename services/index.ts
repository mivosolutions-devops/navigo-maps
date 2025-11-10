import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

export const authService = new AuthService(
  process.env.NEXT_PUBLIC_AUTH_API_URL as string,
);

export const usersService = new UsersService(
  `${process.env.NEXT_PUBLIC_USERS_API_URL as string}/`,
);
