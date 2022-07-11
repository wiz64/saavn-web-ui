const results_container = document.querySelector("#saavn-results")

const searchUrl = "https://saavn.me/search/songs?query=";
function SaavnSearch() {
event.preventDefault(); // stop page changing to #, which will reload the page

const query = document.querySelector("#saavn-search-box").value.trim()
if(query==lastSearch) {doSaavnSearch(query)}
    window.location.hash = query 
if(query.length > 0) { 
    window.location.hash = query 
}
}

async function doSaavnSearch(query,NotScroll) {
    if(!query) {return 0;}
results_container.innerHTML = `<span class="loader">Searching</span>`;
    query=query+"&limit=50";

var response = await fetch(searchUrl + query);
var json = await response.json();
var json = json.results;
var results = [];
if(!json.length) {results_container.innerHTML = "<p> No result found. Try other Library </p>";return;}
lastSearch = decodeURI(window.location.hash.substring(1));
for(let track of json) {


song_name = TextAbstract(track.name,25);
album_name = TextAbstract(track.album.name,20);
if (track.album.name == track.name) {
    album_name = ""
}
var measuredTime = new Date(null);
measuredTime.setSeconds(track.duration); // specify value of SECONDS
var play_time = measuredTime.toISOString().substr(11, 8);
if (play_time.startsWith("00:0")) {
    play_time = play_time.slice(4);
}
if (play_time.startsWith("00:")) {
    play_time = play_time.slice(3);
}
var song_id = track.id;
var year = track.year;
var song_image = track.image[1].link;
var song_artist = TextAbstract(track.primaryArtists,30);
var bitrate = document.getElementById('saavn-bitrate');
var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
if(track.downloadUrl) {
var download_url = track.downloadUrl[bitrate_i]['link'];
var quality = "";
if (bitrate_i == 4) {quality = 320} else {quality = 160;}

        results.push(`
<div class="text-left song-container" style="margin-bottom: 20px;border-bottom-right-radius: 30px;border: 2px solid var(--gray);border-bottom-style: solid;border-top-left-radius: 30px;">
    <div class="row" style="margin: auto;">
        <div class="col-auto" style="padding: 0px;padding-right: 0px;border-style: none;"><img id="${song_id}-i" class="img-fluid d-inline" style="width: 110px;border-top-left-radius: 30px;height: 114px;" src="${song_image}" loading="lazy" /></div>
        <div class="col" style="border-style: none;padding: 2px;">
            <p class="float-right fit-content" style="margin: 0px;color: rgb(172,248,159);">${year}</p>
            <p id="${song_id}-n" class="fit-content" style="margin: 0px;color: rgb(172,248,159);max-width: 100%;">${song_name}</p>
            <p id="${song_id}-a" class="fit-content" style="margin: 0px;color: rgb(172,248,159);max-width: 100%;">${album_name}<br /></p>
            <p id="${song_id}-ar" class="fit-content" style="margin: 0px;color: rgb(172,248,159);max-width: 100%;">${song_artist}<br /></p><button class="btn btn-primary song-btn" type="button" style="margin: 0px 2px;" onclick='PlayAudio("${download_url}","${song_id}")'>▶ Play</button><p class="float-right fit-content" style="margin: 0px;color: rgb(172,248,159);">${play_time}<br /></p>
        </div>
    </div>
</div>
`
); }
    }
    
    results_container.innerHTML = results.join(' ');
    if(!NotScroll){
    document.getElementById("saavn-results").scrollIntoView();
    }


}
function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}
if(window.location.hash) {
   doSaavnSearch(window.location.hash.substring(1));
} else {doSaavnSearch('new',1);}

addEventListener('hashchange', event => { });
onhashchange = event => {doSaavnSearch(window.location.hash.substring(1))};

// If Bitrate changes, search again
$('#saavn-bitrate').on('change', function () {
    doSaavnSearch(lastSearch);
        /*
    var isDirty = !this.options[this.selectedIndex].defaultSelected;

    if (isDirty) {
        // Value Changed
        doSaavnSearch(lastSearch)
    } else {
        // Do Nothing
    } */
});