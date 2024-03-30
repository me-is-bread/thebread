import { Env } from "https://cdn.skypack.dev/@humanwhocodes/env?min";

var env = new Env();

var audio_click = document.getElementById('click_player');
var text = document.getElementById('title');
var contentText = document.getElementById('content-text'); 

var linkHolder = document.getElementById('link-holder');
var linkBackText = document.getElementById('link-text-back');

var player = document.getElementById('player');

var swapBtn = document.getElementById('swapBtn');

var contentShift = false;
var q = 'GigaVideo';

var sparkleVideo = "https://firebasestorage.googleapis.com/v0/b/shivam-rudra-db.appspot.com/o/thebreadVideoData%2FSparkle%20480%20No%20Edit.mp4?alt=media&token=" + env.get("FIREBASE_SPARKLE_TOKEN");
var GigaVideo = "https://firebasestorage.googleapis.com/v0/b/shivam-rudra-db.appspot.com/o/thebreadVideoData%2FGiga(Ready%20Steady).mp4?alt=media&token=" + env.get("FIREBASE_GIGA_TOKEN");
var yukopiVideo = "https://firebasestorage.googleapis.com/v0/b/shivam-rudra-db.appspot.com/o/thebreadVideoData%2FYukopi.mp4?alt=media&token=" + env.get("FIREBASE_YUKOPI_TOKEN");

function swapVideo() {
    if (screen.width > 768) {
        if (q == 'sparkleVideo') {
            player.src = GigaVideo;
            q = 'GigaVideo';
        }
        else {
            player.src = sparkleVideo;
            q = 'sparkleVideo';
        }
    }
}

function videoToPlay () {
    if (screen.width > 768) {
        player.src = GigaVideo;
    }
    else {
        player.src = yukopiVideo;
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
    swapBtn.style.display = "none";
    if (screen.width > 768) {
        contentShift = true;
        audio_click.play();
        linkHolder.hidden = true;
        linkBackText.hidden = false;

        if (q == 'GigaVideo') {
            text.innerHTML = "Credits";
            contentText.innerHTML = 'Giga - Ready Steady ft. 初音ミク・鏡音リン・鏡音レン【MV】. <br/ > Video and song by Giga.';
        }
        else {
            text.innerHTML = "Credits";
            contentText.innerHTML = 'Sparkle Trailer — "Monodrama" | Honkai: Star Rail. <br/ > Video and song by Honkai Star Rail.';
        }
    }
    else {
        contentShift = true;
        audio_click.play();
        text.innerHTML = "Credits";
        contentText.innerHTML = 'Yukopi - 寝起きヤシの木 (feat.歌愛ユキ) <br/ > Video and song by Yukopi.';
        linkHolder.hidden = true;
        linkBackText.hidden = false;
    }
}

function linkBack () {
    swapBtn.style.display = "block";
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
