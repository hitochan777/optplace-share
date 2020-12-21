import { DirectionFindService } from "./direction_find_service";
import { DirectionInfo } from "./direction_info";

export class GoogleDirectionFinder implements DirectionFindService {
	private directionResponse2DirectionInfo(
		destination: string,
		directions: any
	): DirectionInfo {
		const totalCost = directions.routes[0]?.fare?.value ?? null;
		const durations = directions.routes[0]?.legs.map((leg: any) =>
			leg.duration ? leg.duration.value : 0
		);
		const totalDuration = durations?.reduce(
			(total: number, duration: number) => duration + total,
			0
		);
		return {
			destination,
			duration: totalDuration,
			cost: totalCost
		};
	}
	public FindDirections(
		origin: string,
		destinations: string[]
	): DirectionInfo[] {
		const directionInfoList = destinations.map(destination => {
			const directions = Maps.newDirectionFinder()
				.setOrigin(origin)
				.setDestination(destination)
				.setMode(Maps.DirectionFinder.Mode.TRANSIT)
				.getDirections();
			return this.directionResponse2DirectionInfo(destination, directions);
		});
		return directionInfoList;
	}
}
