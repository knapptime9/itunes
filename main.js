var input = document.querySelector("input");
var button = document.querySelector("button");
var results = document.getElementById("results");
var retData = {};

console.log(input);
console.log(button);
console.log(results);
console.log(player);
console.log(retData);

button.addEventListener("click", function search() {

  results.innerHTML = "";

  console.log(input.value);
  var searchTerm = input.value;

  fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music`).then(function(response) {
    console.log(response);
    response.json().then(function(data) {
        console.log(data);
        retData = data.results;
        console.log(retData);
        return retData;
        console.log(retData[0].trackName);
      })

      .then(function() {
        for (var i = 0; i < retData.length; i++) {
          results.innerHTML += `
                    <div class="box">
                      <button id="${retData[i].trackName}" class="track">
                      <div>
                        <img src=${retData[i].artworkUrl100} alt=${retData[i].artistName}>
                      </div>
                      <p class="songTitle">${retData[i].trackName}</p>
                      <p class="bandName">${retData[i].artistName}</p>
                      </button>
                    </div>`;
        }
      })

      .then(function() {
        var tracks = document.querySelectorAll(".track");
        tracks.forEach(function(track,i) {
          console.log(track);
          track.addEventListener("click", function() {
            console.log(track);
            player.innerHTML = `
                                   <p>Now playing:  ${retData[i].trackName} - ${retData[i].artistName}</p>
                                   <audio src="${retData[i].previewUrl}" controls="controls" class="music-player"></audio>`;
          });
        });
      });
  });
});
