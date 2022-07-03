function PlayAudio(audio_url, song_id) {
    
  var audio = document.getElementById('player');
  var source = document.getElementById('audioSource');
  source.src = audio_url;
  var name = document.getElementById(song_id+"-n").textContent;
  var album = document.getElementById(song_id+"-a").textContent;
  var image = document.getElementById(song_id+"-i").getAttribute("src");
    
document.title = name+" - "+album;
var bitrate = document.getElementById('saavn-bitrate');
var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
var quality = "";
if (bitrate_i == 4) {quality = 320} else {quality = 160;}


    document.getElementById("player-name").innerHTML = name;
        document.getElementById("player-album").innerHTML = album;
document.getElementById("player-image").setAttribute("src",image);

var promise = audio.load();
if (promise) {
    //Older browsers may not return a promise, according to the MDN website
    promise.catch(function(error) { console.error(error); });
}//call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
};
function searchSong(search_term) {
    
document.getElementById('search-box').value=search_term;
var goButton = document.getElementById("search-trigger");
            goButton.click();
    
}

