const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menu = $('.bx-menu')
const control = $('.downbar')
const playlist = $('.play-list')
const progress = $('.progress')
const progress2 = $('.progress-bar');
const circle = $('.progress-circle');
const audio = $('#audio');
const songName = $('.nav__title-name')
const songArtist = $('.nav__title-artist')
const playBtn = $('.bx-play-circle')
const pauseBtn = $('.bx-pause-circle')
const nextBtn = $('.bx-skip-next-circle')
const prevBtn = $('.bx-skip-previous-circle')
const songTime = $('.current-time')
const songFullTime = $('.song-time')
const repeatBtn = $('.repeat')
const shuffleBtn = $('.shuffle')
const bg = $('.wide')
const itemMusic = $('.play-list-item')
const notmute = $$('.notmute')
const mute = $('.bx-volume-mute')
const vol = $$('.vol')
const vol0 = $('.bx-volume')
const vol1 = $('.bx-volume-low')
const vol2 = $('.bx-volume-full')
const volProgress = $('.volbar')
const volProgressBar = $('.volbar-progress')
const volDot = $('.volbar-dot')
const menuTopBtn = $('.menu-top')
const filter = $('.filter')
const filter1 = $('.filter1')
const log = $('.log')
const shareLabel = $('.share-label')

const app = {
    isPlaying: false,
    isDrag: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    listshow: false,
    isMuted: false,
    onVol: 2,
    volIsDrag: false,
    currentVol: audio.volume,
    songs: [{
            name: 'Cơn gió mùa hạ',
            singer: 'Superluckyqi',
            path: './asset/music/song1.mp3',
            image: './asset/img/pc/song1.png'
        },
        {
            name: 'Trạm khí tượng',
            singer: 'Uu',
            path: './asset/music/song2.mp3',
            image: './asset/img/pc/song2.png'
        },
        {
            name: 'Anh Nơi Xa Xôi',
            singer: 'Hoa Đồng',
            path: './asset/music/song3.mp3',
            image: './asset/img/pc/song3.png'
        },
        {
            name: 'Một triệu khả năng',
            singer: '克丽丝叮',
            path: './asset/music/song4.mp3',
            image: './asset/img/pc/song4.png'
        },
        {
            name: 'Em Cứ Nghĩ',
            singer: 'Từ Vi',
            path: './asset/music/song5.mp3',
            image: './asset/img/pc/song5.png'
        },
        {
            name: 'Rất muốn bên cạnh anh',
            singer: 'Lưu tăng đồng',
            path: './asset/music/song6.mp3',
            image: './asset/img/pc/song6.png'
        },
        {
            name: 'Anh, có ổn không',
            singer: 'Lữ Khẩu Khẩu',
            path: './asset/music/song7.mp3',
            image: './asset/img/pc/song7.png'
        },
        {
            name: 'Chỉ vì quá yêu anh',
            singer: 'Đinh Phù Ny',
            path: './asset/music/song8.mp3',
            image: './asset/img/pc/song8.png'
        },
        {
            name: 'Những năm tháng ấy',
            singer: 'Uu',
            path: './asset/music/song9.mp3',
            image: './asset/img/pc/song9.png'
        },
        {
            name: 'Trạm khí tượng',
            singer: 'Uu',
            path: './asset/music/song10.mp3',
            image: './asset/img/pc/song10.png'
        },
        {
            name: 'Cơn Gió Mùa Hạ',
            singer: 'Tàu Lửa Ngủ Gật',
            path: './asset/music/song11.mp3',
            image: './asset/img/pc/song11.png'
        },
        {
            name: 'Vạn Vật Hấp Dẫn',
            singer: 'F*yy',
            path: './asset/music/song12.mp3',
            image: './asset/img/pc/song13.png'
        },
        {
            name: 'Đều Trách Tại Em',
            singer: 'Hồ 66',
            path: './asset/music/song13.mp3',
            image: './asset/img/pc/song12.png'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <li class="play-list-item" data-index="${index}">
                <div class="play-list-box__title">
                    <span class="play-list-item__name ${index === this.currentIndex ? 'active' : ''}">${song.name}</span>
                    <span class="play-list-item__artist">${song.singer}</span>
                </div>
                <i class='bx bx-heart' data-index="${index}"></i>
                <i class='bx bx-share share' data-index="${index}"></i>
            </li>
            `
        });

        playlist.innerHTML = htmls.join('');
    },

    definedProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    loadCurrentSong: function () {
        songName.textContent = this.currentSong.name
        songArtist.textContent = this.currentSong.singer
        bg.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    handleEvents: function () {
        that = this;
        menu.onclick = function () {
            if (this.listshow) {
                control.classList.remove('active')
                menu.classList.remove('active')
                this.listshow = false
            } else {
                control.classList.add('active')
                menu.classList.add('active')
                this.listshow = true
            }
        }

        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        pauseBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        document.addEventListener('keyup', event => {
            if (event.code === 'Space' || event.code === 'KeyK') {
                playBtn.click()
            }
        })

        audio.onplay = function () {
            app.handleTime();
            playBtn.classList.add("hide");
            pauseBtn.classList.remove("hide");
            that.isPlaying = true;
        }

        audio.onpause = function () {
            pauseBtn.classList.add("hide");
            playBtn.classList.remove("hide");
            that.isPlaying = false;
        }


        nextBtn.onclick = function () {
            if (that.isRandom) {
                app.shuffleHandler();
                audio.play();
                app.render()
            } else {
                app.nextSong();
                audio.play();
                app.render()
            }

        }

        // bam shift + N
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyN' && event.shiftKey) {
                nextBtn.click();
            }
        })

        prevBtn.onclick = function () {
            if (that.isRandom) {
                nextBtn.click();
            } else {
                app.prevSong();
                audio.play();
                app.render()
            }
        }

        // bam shift + P
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyP' && event.shiftKey) {
                prevBtn.click();
            }
        })

        audio.onended = function () {
            if (that.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        repeatBtn.onclick = function () {
            if (that.isRepeat) {
                that.isRepeat = false;
                repeatBtn.classList.remove('active');
            } else {
                that.isRepeat = true;
                repeatBtn.classList.add('active');
            }
        }

        shuffleBtn.onclick = function () {
            that.isRandom = !that.isRandom;
            shuffleBtn.classList.toggle('active', that.isRandom);
        }

        if (itemMusic) {
            itemMusic.addEventListener('click', (e) => {
                console.log(e)
            })
        }

        progress.addEventListener('mousedown', () => {
            that.isDrag = true;
            circle.classList.add('dragging');
        })

        document.addEventListener("mousemove", (e) => {
            that.progresshandle(e);
        })

        document.addEventListener('mouseup', () => {
            that.isDrag = false;
            circle.classList.remove('dragging');
        })

        // menu filter
        menuTopBtn.addEventListener('click', () => {
            filter.classList.toggle('active')
        })

        document.addEventListener('keydown', event => {
            if (event.code === 'KeyI') {
                menuTopBtn.click()
            }
        })

        filter.addEventListener('click', (e) => {
            if (e.target.closest('.log') == null) {
                menuTopBtn.click()
            }
        })

        // bam mui ten tua
        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowRight') {
                audio.currentTime += 5
                if (!that.isPlaying) {
                    audio.pause()
                }
            }
        })

        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowLeft') {
                audio.currentTime -= 5
                if (!that.isPlaying) {
                    audio.pause()
                }
            }
        })

        // tua 10s
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyL') {
                audio.currentTime += 10
                if (!that.isPlaying) {
                    audio.pause()
                }
            }
        })

        document.addEventListener('keydown', event => {
            if (event.code === 'KeyJ') {
                audio.currentTime -= 10
                if (!that.isPlaying) {
                    audio.pause()
                }
            }
        })

        // mo menu
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyC') {
                menu.click()
            }
        })

        window.onload = () => {
            console.log('afd')
            setTimeout(() => {
                playBtn.click()
                setTimeout(() => audio.pause(), 100)
            }, 1000)
        }

        // mute handle
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyM') {
                if (this.isMuted) {
                    audio.volume = this.currentVol
                    this.isMuted = false
                } else {
                    this.currentVol = audio.volume
                    audio.volume = 0
                    this.isMuted = true
                }
            }
        })

        mute.onclick = () => {
            audio.volume = this.currentVol
            this.isMuted = false
        }

        for (var i = 0; i < 3; i++) {
            notmute[i].onclick = () => {
                this.currentVol = audio.volume
                audio.volume = 0
                this.isMuted = true
            }
        }

        // R key
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyR') {
                repeatBtn.click()
            }
        })

        // S key
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyS') {
                shuffleBtn.click()
            }
        })

        // music numpad
        document.addEventListener('keydown', event => {
            for (var i = 0; i < 10; i++) {
                if (event.code === `Digit${i}` || event.code === `Numpad${i}`) {
                    const numberPercent = i * 10
                    audio.currentTime = numberPercent / 100 * audio.duration
                }
            }
        })

        // arrow volume
        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowUp') {
                audio.volume += 0.1
            }
        })

        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowDown') {
                audio.volume -= 0.1
            }
        })

        // handle volume change
        audio.onvolumechange = () => {
            this.volumeChangeHandle()
            volProgressBar.style.height = audio.volume * 100 + "%"
        }

        // hover 
        for (var i = 0; i < 4; i++) {
            vol[i].onmouseover = () => {
                volProgress.classList.remove('hide')
            }
        }

        for (var i = 0; i < 4; i++) {
            vol[i].onmouseout = () => {
                volProgress.classList.add('hide')
            }
        }

        volProgress.onmouseover = () => volProgress.classList.remove('hide')
        volProgress.onmouseout = () => volProgress.classList.add('hide')

        // xu li drag
        volProgress.addEventListener('mousedown', () => {
            this.volIsDrag = true;
            volDot.classList.add('dragging');
        })

        document.addEventListener("mousemove", (e) => {
            this.volumeHandle(e)
        })

        document.addEventListener('mouseup', (e) => {
            this.volIsDrag = false;
            volDot.classList.remove('dragging');
        })

        // playlist handle
        playlist.addEventListener('click', (e) => {
            const songNode = e.target.closest('.play-list-item:not(.active)')
            const shareNode = e.target.closest('.share')

            if (songNode && shareNode === null) {
                this.currentIndex = songNode.getAttribute('data-index')
                this.loadCurrentSong()
                audio.play()
                app.render()
                console.log('a')
            }

            if (shareNode) {
                filter1.classList.toggle('active')
                const songE = shareNode.getAttribute('data-index')
                const songN = this.songs[songE].name
                shareLabel.textContent = `share ${songN} with:`
            }
        })

        // share filter handle
        filter1.addEventListener('click', (e) => {
            if (e.target.closest('.log1') === null) {
                filter1.classList.toggle('active')
            }
        })

        
    },


    getCurrentTime: function (seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const minutes = (seconds % 3600) / 60

        return [minutes, seconds % 60].map(format).join(':')
    },

    handleTime: function () {
        audio.ontimeupdate = function (e) {
            const seconds = e.target.currentTime
            const secondsFormat = Math.floor(seconds * 100 / 100);
            songTime.innerHTML = `${app.getCurrentTime(secondsFormat)}`;
            songFullTime.innerHTML = `${app.getCurrentTime(Math.floor(audio.duration))}`;
            let timePercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress2.style.width = timePercent + "%";
        }
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },

    progresshandle: function (e) {
        const widthprogress = progress.getBoundingClientRect().width;
        const max = progress.getBoundingClientRect().left + widthprogress;
        let numberprogress = e.clientX - progress.getBoundingClientRect().left;
        if (this.isDrag && numberprogress >= 0 && numberprogress < max) {
            percentprogress = Math.floor(numberprogress / widthprogress * 100)
            progress2.style.width = percentprogress + "%";
            circle.style.left = "calc(" + percentprogress + "% - 3px)";
            let audioPercent = audio.duration * percentprogress / 100;
            audio.currentTime = audioPercent;
        }
    },

    shuffleHandler: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    volchange0: function () {
        vol0.classList.remove('hide')
        vol1.classList.add('hide')
        vol2.classList.add('hide')
        mute.classList.add('hide')
    },
    volchange1: function () {
        vol1.classList.remove('hide')
        vol0.classList.add('hide')
        vol2.classList.add('hide')
        mute.classList.add('hide')
    },
    volchange2: function () {
        vol2.classList.remove('hide')
        vol1.classList.add('hide')
        vol0.classList.add('hide')
        mute.classList.add('hide')
    },
    volmute: function () {
        vol2.classList.add('hide')
        vol1.classList.add('hide')
        vol0.classList.add('hide')
        mute.classList.remove('hide')
    },

    volumeHandle: function (e) {
        const max = volProgress.getBoundingClientRect().top + volProgress.offsetHeight
        let numberprogressvol1 = e.clientY - volProgress.getBoundingClientRect().top
        let numberprogressvol2 = volProgress.offsetHeight - numberprogressvol1
        if (this.volIsDrag && numberprogressvol2 >= 0 && numberprogressvol2 < max) {
            const heightprogress = volProgress.offsetHeight;
            percentprogress = Math.floor(numberprogressvol2 / heightprogress * 100)
            volProgressBar.style.height = percentprogress + "%";
            audio.volume = percentprogress / 100;
        }
    },

    volumeChangeHandle: function () {
        const volumePercent = Math.floor(audio.volume * 100)

        if (volumePercent <= 30 && volumePercent > 0) {
            this.onVol = 0
            this.volchange0()
        } else if (volumePercent > 30 && volumePercent < 80) {
            this.onVol = 1
            this.volchange1()
        } else if (volumePercent === 0) {
            this.volmute()
        } else {
            this.onVol = 2
            this.volchange2()
        }
    },

    start: function () {
        this.definedProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();
    }
}

app.start()