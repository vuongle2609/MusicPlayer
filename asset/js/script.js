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

const app = {
    isPlaying: false,
    isDrag: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    listshow: false,
    songs: [
        {
            name: 'Cơn gió mùa hạ',
            singer: 'Superluckyqi',
            path: './asset/music/song1.mp3',
            image: './asset/img/songlist/song1.png'
        },
        {
            name: 'Trạm khí tượng',
            singer: 'Uu',
            path: './asset/music/song2.mp3',
            image: './asset/img/songlist/song2.png'
        },
        {
            name: 'Anh Nơi Xa Xôi',
            singer: 'Hoa Đồng',
            path: './asset/music/song3.mp3',
            image: './asset/img/songlist/song3.png'
        },
        {
            name: 'Một triệu khả năng',
            singer: '克丽丝叮',
            path: './asset/music/song4.mp3',
            image: './asset/img/songlist/song4.png'
        },
        {
            name: 'Em Cứ Nghĩ',
            singer: 'Từ Vi',
            path: './asset/music/song5.mp3',
            image: './asset/img/songlist/song5.png'
        },
        {
            name: 'Rất muốn bên cạnh anh',
            singer: 'Lưu tăng đồng',
            path: './asset/music/song6.mp3',
            image: './asset/img/songlist/song6.png'
        },
        {
            name: 'Anh, có ổn không',
            singer: 'Lữ Khẩu Khẩu',
            path: './asset/music/song7.mp3',
            image: './asset/img/songlist/song7.png'
        },
        {
            name: 'Chỉ vì quá yêu anh',
            singer: 'Đinh Phù Ny',
            path: './asset/music/song8.mp3',
            image: './asset/img/songlist/song8.png'
        },
        {
            name: 'Những năm tháng ấy',
            singer: 'Uu',
            path: './asset/music/song9.mp3',
            image: './asset/img/songlist/song9.png'
        },
        {
            name: 'Trạm khí tượng',
            singer: 'Uu',
            path: './asset/music/song10.mp3',
            image: './asset/img/songlist/song10.png'
        },
        {
            name: 'Cơn Gió Mùa Hạ',
            singer: 'Tàu Lửa Ngủ Gật',
            path: './asset/music/song11.mp3',
            image: './asset/img/songlist/song10.png'
        },
        {
            name: 'Vạn Vật Hấp Dẫn',
            singer: 'F*yy',
            path: './asset/music/song12.mp3',
            image: './asset/img/songlist/song10.png'
        },
        {
            name: 'Đều Trách Tại Em',
            singer: 'Hồ 66',
            path: './asset/music/song13.mp3',
            image: './asset/img/songlist/song10.png'
        }
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <li class="play-list-item">
                <div class="box-img" style="background-image: url(${song.image})">
                </div>
                <div class="play-list-box__title">
                    <span class="play-list-item__name">${song.name}</span>
                    <span class="play-list-item__artist">${song.singer}</span>
                </div>
                <i class='bx bx-heart'></i>
                <i class='bx bx-dots-horizontal-rounded'></i>
            </li>
            `
        });

        playlist.innerHTML = htmls.join('');
    },

    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            } 
        })
    },

    loadCurrentSong: function() {
        songName.textContent = this.currentSong.name;
        songArtist.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;
    },

    handleEvents: function() {
        that = this;
        menu.onclick = function() {
            if (this.listshow) {
                control.classList.remove('active')
                this.listshow = false
            }
            else {
                control.classList.add('active')
                this.listshow = true
            }
        }

        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }

        pauseBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }

        audio.onplay = function() {
            app.handleTime();
            playBtn.classList.add("hide");
            pauseBtn.classList.remove("hide");
            that.isPlaying = true;
        }

        audio.onpause = function() {
            pauseBtn.classList.add("hide");
            playBtn.classList.remove("hide");
            that.isPlaying = false;  
        }


        nextBtn.onclick = function() {
            if (that.isRandom) {
                app.shuffleHandler();
                audio.play();
            }
            else {
                app.nextSong();
                audio.play();
            }
            
        }

        prevBtn.onclick = function() {
            if (that.isRandom) {
                nextBtn.click();
            }
            else {
                app.prevSong();
                audio.play();
            }
        }

        audio.onended = function() {
            if (that.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        repeatBtn.onclick = function() {
            if (that.isRepeat) {
                that.isRepeat = false;
                repeatBtn.classList.remove('active');
            }
            else {
                that.isRepeat = true;
                repeatBtn.classList.add('active');
            }
        }

        // xu ly an shuffle 
        shuffleBtn.onclick = function() {
            that.isRandom = !that.isRandom; 
            shuffleBtn.classList.toggle('active', that.isRandom);
        }

        // xu li thanh progress
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

    },
    getCurrentTime: function(seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const minutes = (seconds % 3600) / 60

        return [minutes, seconds % 60].map(format).join(':')
    },

    handleTime: function() {
        audio.ontimeupdate = function(e) {
            const seconds = e.target.currentTime
            const secondsFormat = Math.floor(seconds * 100/100);
            songTime.innerHTML = `${app.getCurrentTime(secondsFormat)}`;
            songFullTime.innerHTML = `${app.getCurrentTime(Math.floor(audio.duration))}`;
            let timePercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress2.style.width = timePercent + "%";
        }
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },

    progresshandle: function(e) {
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

    shuffleHandler: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        this.definedProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();
    }
}

app.start()