var chart = document.querySelector(".top-players-chart");

const req = new XMLHttpRequest();
req.addEventListener("load", drawPlayerInfo);
sendRequest();
setInterval(updateChart, 1000*60*60);	//1 hour

function sendRequest() {
	req.open("GET", "https://api.chess.com/pub/leaderboards", true);
	req.send();
}

function updateChart() {
	req.onload = drawPlayerInfo;
	sendRequest();
}

function drawPlayerInfo() {
	var res = JSON.parse(req.responseText);
	var newChart = "";

	for (let i = 0; i < 10; i++) {
		updateSinglePlayerInfo(i);
	}

	chart.innerHTML = newChart;

	function updateSinglePlayerInfo(i) {
		var name = res["daily"][i]["name"];
		var rating = res["daily"][i]["score"];
		var country = res["daily"][i]["country"].slice(-2);

		if (name == undefined) {
			name = res["daily"][i]["username"];
		}

		newChart += '<div class="chart-row">'
			+ '<div class="chart-position">' + (i + 1) + '</div>'
			+ '<div class="chart-name">' + name + '</div>'
			+ '<div class="chart-rating">' + rating + '</div>'
			+ '<div class="chart-country">' + country + '</div>'
			+ '</div>';
	}
}

