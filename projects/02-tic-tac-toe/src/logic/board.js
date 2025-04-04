import { WINNER_COMBINATIONS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
	for (const combination of WINNER_COMBINATIONS) {
		const [a, b, c] = combination;
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a];
		}
	}

	return null;
};

export const checkEndGame = (boardToCheck) => {
	return boardToCheck.every((cell) => cell != null);
};
