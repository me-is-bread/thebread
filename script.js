var audio_click = document.getElementById('click_player');
var text = document.getElementById('title');
var contentText = document.getElementById('content-text'); 

var linkHolder = document.getElementById('link-holder');
var linkBackText = document.getElementById('link-text-back');

var player = document.getElementById('player');


var contentShift = false;

function videoToPlay () {
    if (screen.width > 768) {
        player.src = "./media/Giga(Ready Steady) 720p.mp4";
    }
    else {
        player.src = "./media/Yukopi.mp4";
    }
}

function play() {
    var status = document.getElementById('status');
    
    if (player.muted == true) {
        player.muted = false;
        status.innerText = 'music_note'
    }
    else {
        player.muted = true;
        status.innerText = 'music_off'
    }
}

body.onclick = function() {
    audio_click.play();
}

function linkAbout () {
    contentShift = true;
    audio_click.play();
    text.innerHTML = "About Me";
    linkHolder.hidden = true;
    linkBackText.hidden = false;
}

function linkCredits () {
    if (screen.width > 768) {
        contentShift = true;
        audio_click.play();
        text.innerHTML = "Credits";
        contentText.innerHTML = 'Giga - Ready Steady ft. 初音ミク・鏡音リン・鏡音レン【MV】. <br/ > Video and song by Giga.';
        linkHolder.hidden = true;
        linkBackText.hidden = false;
    }
    else {
        contentShift = true;
        audio_click.play();
        text.innerHTML = "Credits";
        contentText.innerHTML = 'Yukopi - 強風オールバック (feat.歌愛ユキ) <br/ > Video and song by Yukopi.';
        linkHolder.hidden = true;
        linkBackText.hidden = false;
    }
}

function linkBack () {
    if (contentShift == true) {
        contentShift = false;
        audio_click.play();
        text.innerHTML = "Portfolio";
        contentText.innerHTML = "Hi, my name is, <br /> <h1> Sahil Raut. <br /> I build things for Web. </h1> <br /> I'm a web developer specialized in UI/UX designs. <br /> (with designing software as Figma or Adobe XD and also with HTML, CSS, JS) <br /> I like to produce unique designs in every project.";
        linkHolder.hidden = false;
        linkBackText.hidden = true;
    }

    else {
        return
    }
}
