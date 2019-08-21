export const filterByTeam = (array, teamName, headOfTeam) => {
	return array.filter(item => item.team === teamName && item !== headOfTeam);
}

export const capitalizeSurname = name => {
	const nameArr = name.split(" ");
	nameArr[nameArr.length - 1] = nameArr[nameArr.length - 1].toUpperCase();
	return nameArr.join(" ");
}