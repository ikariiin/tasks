import { PrivateUserDto } from "@tasks/common";

export interface AuthState {
  user: PrivateUserDto | null;
}
