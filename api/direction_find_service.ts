import { DirectionInfo } from "./direction_info";

export interface DirectionFindService {
  FindDirections(
    origin: string,
    directions: string[]
  ): DirectionInfo[] | Promise<DirectionInfo[]>;
}
