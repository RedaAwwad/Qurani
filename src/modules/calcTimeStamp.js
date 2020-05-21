export const calcTimestamp = (time) => {
	const timeStamp = new Date(time * 1000);
	const today = new Date();
	const yesterday = new Date(Date.now() - 86400000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = timeStamp.getFullYear();
	const month = months[timeStamp.getMonth()];
	const date = timeStamp.getDate();
	const hour = timeStamp.getHours();
	const min = timeStamp.getMinutes();
	if (timeStamp.setHours(0,0,0,0) == today.setHours(0,0,0,0))
		time = 'today, ' + hour + ':' + min;
	else if (timeStamp.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
		time = 'yesterday, ' + hour + ':' + min;
	else if (year == today.getFullYear())
		time = date + ' ' + month + ', ' + hour + ':' + min;
	else
		time = date + ' ' + month + ' ' + ( parseInt(year) - 1969 ) + ', ' + hour + ':' + min;

	return time;
}
