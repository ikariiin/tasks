import { TeamDto } from "@tasks/common";

export interface TeamState {
  teams: TeamDto[];
  activeTeam: TeamDto | null;
}
