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
var DOWNLOAD_API = "https://openmp3compiler.astudy.org"
function AddDownload(id) {
    var bitrate = document.getElementById('saavn-bitrate');
    var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
    // MP3 server API
    var MP3DL = DOWNLOAD_API+"/add?id="+id;
    // make api call, if 200, add to download list
    fetch(MP3DL)
    .then(response => response.json())
    .then(data => {
        if (data.status == "success") {
            // add to download list
            var download_list = document.getElementById("download-list");
            var download_item = document.createElement("li");
           /*
           <li>
                    <div class="col">
                        
                        <img src="https://i.pinimg.com/originals/ed/54/d2/ed54d2fa700d36d4f2671e1be84651df.jpg" width="50px">
                        <div style="display: inline;">
                        <span id="download-name">Song</span>
                        <span id="download-album">Album</span>
                        <br>
                        <span id="download-size">Size</span>
                        <span id="download-status" style="color:green">Compiling.</span>
                        </div>
                    </div>
                    <hr>
                    </li>
           */
            // download_item.innerHTML = '<div class="col"><img src="'+data.image+'" width="50px"><div style="display: inline;"><span id="download-name">'+id+'</span><span id="download-album">'+data.album+'</span><br><span id="download-size">'+data.size+'</span><span id="download-status" style="color:green">Compiling.</span></div></div><hr>';
            download_item.innerHTML = `
            <div class="col">
            <img class="track-img" src="${data.image}" width="50px">
            <div style="display: inline;">
              <span class="track-name"> ${id}</span> - 
              <span class="track-album"> ${data.album}</span>
              <br>
              <span class="track-size"> Size : Null</span>
              <span class="track-status" style="color:green"> </span>
            </div>
          </div>
          <hr>
            `;

            // set download_item track_tag to song id
            download_item.setAttribute("track_tag",id);
            
            // set css class no-bullets
            download_item.className = "no-bullets";

            download_list.appendChild(download_item);
            // every 5 seconds, check download status
            var STATUS_URL = DOWNLOAD_API+"/status?id="+id;
            // get download_status_span by track_tag and class
            var download_status_span = document.querySelector('[track_tag="'+id+'"] .track-status');
            var download_name = document.querySelector('[track_tag="'+id+'"] .track-name');
            var download_album = document.querySelector('[track_tag="'+id+'"] .track-album');
            var download_img = document.querySelector('[track_tag="'+id+'"] .track-img');
            var download_size = document.querySelector('[track_tag="'+id+'"] .track-size');
            // set text content to song name and album name
            
            download_name.innerHTML= results_objects[id].track.name;
            download_status_span.innerHTML = data.status;
            download_album.innerHTML = results_objects[id].track.album.name;
            download_img.setAttribute("src",results_objects[id].track.image[2].link);
            
            // change mpopupLink background and border color to green and back to blue after 1 second
            var float_tap = document.getElementById('mpopupLink');
            float_tap.style.backgroundColor = "green";
            float_tap.style.borderColor = "green";

            setTimeout(function() {
                float_tap.style.backgroundColor = "#007bff";
                float_tap.style.borderColor = "#007bff";
            }, 1000);
            
            // check status every 5 seconds
            var interval = setInterval(function() {
                fetch(STATUS_URL)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        // update status
                        download_status_span.textContent = data.status;
                        if(data.size) {
                            download_size.textContent = "Size: "+data.size;
                        }
                        if (data.status == "Done") {
                            // download complete, add download button
                            download_status_span.innerHTML = `<a href="${DOWNLOAD_API}${data.url}" target="_blank">Download MP3</a>`;
                            // clear interval
                            clearInterval(interval);
                            return;
                  }}
              });}, 3000); // end interval
        } });}
