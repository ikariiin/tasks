import { PublicUserDto } from "@tasks/common";

export interface AuthState {
  user: PublicUserDto | null;
}
