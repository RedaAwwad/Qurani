export const timeNow = () => {
	const today = new Date();
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = today.getFullYear();
	const month = months[today.getMonth()];
	const date = today.getDate();
	const hour = today.getHours();
	const min = today.getMinutes();

	return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
}
