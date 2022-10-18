import { PublicUserDto } from "common";

export interface AuthState {
  user: PublicUserDto | null;
}
