export const saveGameStorage = ({ board, turn }) => {
	window.localStorage.setItem("board", JSON.stringify(board));
	window.localStorage.setItem("turn", turn);
};

export const saveWinnerStorage = (winner) => {
	window.localStorage.setItem("winner", winner);
};

export const resetGameStorage = () => {
	window.localStorage.removeItem("board");
	window.localStorage.removeItem("turn");
	window.localStorage.removeItem("winner");
};
