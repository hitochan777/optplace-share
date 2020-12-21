import { useState } from "react";

interface Direction {
	destination: string;
	cost: number;
	duration: number;
}

export const useSearchDirections = () => {
	const [directions, setDirections] = useState<Direction[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const searchDirections = async (origin: string, destinations: string[]) => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`${
					process.env.NEXT_PUBLIC_API_ENDPOINT
				}?origin=${origin}&destinations=${destinations.join(",")}`
			);

			const jsonResponse = await response.json();
			setDirections(jsonResponse.body);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return [directions, searchDirections, isLoading] as const;
};
