import { DirectionFindService } from "./direction_find_service";
import { GoogleDirectionFinder } from "./google_direction_finder";

interface Response {
	body: any;
	status: number;
}

function getDirections(
	e: GoogleAppsScript.Events.DoGet,
	directionFinder: DirectionFindService
): Response {
	const origin = e.parameter["origin"];
	const destinationsString = e.parameter["destinations"];
	if (!origin || !destinationsString) {
		return {
			body: `Origin or destinations field are empty: ${JSON.stringify(
				e.parameter
			)}`,
			status: 400
		};
	}
	const destinations = destinationsString.split(",");
	if (destinations.length > 50) {
		return {
			body: "You cannot query more than 50 destinatiosn at once",
			status: 400
		};
	}
	const directions = directionFinder.FindDirections(origin, destinations);
	if (directions instanceof Promise) {
		throw new Error("promise is not returnable from doGet");
	}

	return {
		body: directions,
		status: 200
	};
}

function doGet(e: GoogleAppsScript.Events.DoGet) {
	const directionFinder = new GoogleDirectionFinder();
	const result = getDirections(e, directionFinder);
	const stringifiedResult = JSON.stringify(result);
	return ContentService.createTextOutput(stringifiedResult).setMimeType(
		ContentService.MimeType.JSON
	);
}

function doTest() {
	const req = {
		parameter: {
			origin: "osaka",
			destinations: "tokyo,nagoya"
		}
	};
	const result = doGet(req as any);
	Logger.log(result.getContent());
}
