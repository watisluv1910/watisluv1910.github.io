var video = document.querySelector('video')
var videoContainer = document.querySelector('.video__container')

function playVideo() {
    videoContainer.classList.add('playing')
    video.play()
    video.addEventListener('ended', function() {
        videoContainer.classList.remove('playing')
        video.load();     
    })
}

document.querySelector('.video-play-btn').addEventListener('click', playVideo)