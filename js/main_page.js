var info = document.querySelector(".top-players-chart");

function reqListener() {
	var res = JSON.parse(req.responseText);
	info.innerText = res["daily"][0]["name"];
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://api.chess.com/pub/leaderboards", true);
req.send();

