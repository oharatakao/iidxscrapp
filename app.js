const app = () => {
  const playBtn = document.querySelector('.player-timer-btn');
  const song = document.querySelector('.song');
  const player = document.querySelector('.player');
  const sounds = document.querySelectorAll('.soundList-item');
  const outline = document.querySelector('.player-timer-moving-circle circle');
  const outlineLength = outline.getTotalLength();
  const timeDisplay = document.querySelector('.timeDisplay');
  let currentTime = song.currentTime;
  let currentDuration = 120;
  let leftDuration = currentDuration - currentTime;
  let minutes = Math.floor(leftDuration / 60);
  let seconds = Math.floor(leftDuration % 60);

  window.addEventListener('DOMContentLoaded', () => {
    setDefaultPlayer();
  });

  const setDefaultPlayer = () => {
    setCircleStroke();
    updatePlayerByTimeUpdate();
    setTimerText(minutes, seconds);
    mapCheckPlayingEvent();
    mapClickEventToSoundBtn();
  };

  const mapCheckPlayingEvent = () => {
    playBtn.addEventListener('click', () => {
      checkPlaying(song);
      checkSongEnding();
    });
  }

  const checkPlaying = () => {
    if (song.paused) {
      song.play();
      playBtn.src = 'svg/stop.svg';
    } else {
      song.pause();
      playBtn.src = 'svg/play.svg';
    }
  };

  const checkSongEnding = () => {
    if (currentTime > currentDuration) {
      song.pause();
      song.currentTime = 0;
      playBtn.src = 'svg/play.svg';
    }
  };

  const mapClickEventToSoundBtn = () => {
    sounds.forEach(sound => {
      sound.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-image');
        const title = this.querySelector('.soundList-title').innerText;
        const description = this.querySelector('.soundList-description').innerText;
        const songData = this.getAttribute('data-sound');;
        currentDuration = parseInt(this.getAttribute('data-time'));
        currentTime = 0;
        minutes = Math.floor(currentDuration / 60);
        seconds = Math.floor(currentDuration % 60);

        setPlayerSong(songData, imageUrl);
        setPlayerText(title, description, currentDuration);
        setTimerText(minutes, seconds);
      });
    });
  };

  const setPlayerSong = (songData, imageUrl) => {
    song.src = songData;
    player.style.backgroundImage = `url(${imageUrl})`;
    playBtn.src = 'svg/play.svg';
  }

  const setPlayerText = (title, description) => {
    const playerTitle = document.querySelector('.title-headline');
    const playerDescription = document.querySelector('.title-description');

    playerTitle.innerText = title;
    playerDescription.innerText = description;
  };

  const updateTimerText = () => {
    currentTime = song.currentTime;
    leftDuration = currentDuration - currentTime;
    minutes = Math.floor(leftDuration / 60);
    seconds = Math.floor(leftDuration % 60);

    setTimerText(minutes, seconds);
  };

  const updateCircle = () => {
    const progress = outlineLength - (currentTime / currentDuration) * outlineLength;

    outline.style.strokeDashoffset = progress;
  };

  const setCircleStroke = () => {
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
  };

  const updatePlayerByTimeUpdate = () => {
    song.addEventListener('timeupdate', () => {
      const currentSrc = song.getAttribute('src');
      let lastSrc;

      if (currentSrc === lastSrc || lastSrc === undefined) {
        lastSrc = currentSrc;

        updateCircle();
        updateTimerText();
      } else {
        setCircleStroke();
        lastSrc = undefined;
      }
    });
  }

  const setTimerText = (minutes, seconds) => {
    const renderSeconds = () => {
      return seconds > 9 ? seconds : `0${seconds}`;
    }

    timeDisplay.textContent = `${minutes}:${renderSeconds()}`;
  }
}

app();
