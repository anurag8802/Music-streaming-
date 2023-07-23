const music =new Audio('audio/1.mp3');
//music.play();

const songs= [
    {
        id: 1,
        songName: `Naina ashq na ho<br><div class="subtitle">Holiday</div>`,
        poster: "img/arjitimg/1.jpg"
     },
     {
        id: 2,
        songName: `Khairiyat<br><div class="subtitle">Sushant singh rajput</div>`,
        poster: "img/arjitimg/2.jpg"
     },
     {
        id: 3,
        songName: `Desh Mere<br><div class="subtitle">Bhuj</div>`,
        poster: "img/arjitimg/3.jpg"
     },
     {
        id: 4,
        songName: `Dhokha<br><div class="subtitle">DHOKHA</div>`,
        poster: "img/arjitimg/4.jpg"
     },
     {
        id: 5,
        songName: `Tera yaar Hoon Main<br><div class="subtitle">Sonu ke titu ki sweety</div>`,
        poster: "img/arjitimg/5.jpg"
     },
     {
        id: 6,
        songName: `Maa<br><div class="subtitle">street dancer 3D</div>`,
        poster: "img/arjitimg/6.jpg"
     },
     {
        id: 7,
        songName: `Glti se Mistake<br><div class="subtitle">Jagga Jasoos</div>`,
        poster: "img/arjitimg/7.jpg"
     },
     {
        id: 8,
        songName: `Hamari Adhuri Kahani<br><div class="subtitle">Adhuri Kahani</div>`,
        poster: "img/arjitimg/8.jpg"
     },
     {
        id: 9,
        songName: `Traffic<br><div class="subtitle">Satyamev jayte</div>`,
        poster: "img/arjitimg/9.jpg"
     },
     {
        id: 10,
        songName: `ayee villian<br><div class="subtitle">ek villian</div>`,
        poster: "img/arjitimg/10.jpg"
     },
     {
        id: 11,
        songName: `Mera yaaraa<br><div class="subtitle">Suryavanshi</div>`,
        poster: "img/arjitimg/11.jpg"
     },
     {
        id: 12,
        songName: `Befikre<br><div class="subtitle">Befikre</div>`,
        poster: "img/arjitimg/12.jpg"
     },
     {
        id: 13,
        songName: `Raazi<br><div class="subtitle">RAAZI</div>`,
        poster: "img/arjitimg/13.jpg"
     },
     {
        id: 14,
        songName: `Tamasha<br><div class="subtitle">Dhuvani</div>`,
        poster: "img/arjitimg/14.jpg"
     },
     {
      id: 15,
      songName: `Pachtaoge<br><div class="subtitle">Jaani</div>`,
      poster: "img/arjitimg/15.jpg"
   },
]
Array.from(document.getElementsByClassName('songitem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src= songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML= songs[i].songName;
});

let search_results = document.getElementsByClassName('search_results')[0];
songs.forEach(element =>{
    const {id,songName,poster} = element;
   let card = document.createElement('a');
   card.classList.add('card');
   card.href = "#" + id ;
   card.innerHTML = `<img src="${poster}" alt="">
   <div class="content">
      ${songName}  
   </div>`;
   search_results.appendChild(card);
});

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup',()=>{
   let input_value = input.value.toUpperCase();
   let items = search_results.getElementsByTagName('a');
   for (let i = 0; i < items.length; i++) {
      let as = items[i].getElementsByClassName('content')[0];
      let text_value = as.textContent || as.innerHTML;

     if (text_value.toUpperCase().indexOf(input_value)>-1) {
         items[i].style.display = "flex" ;
     } else {
      items[i].style.display = "none" ;
     }
     if(input.value==0){
      search_results.style.display ="none";
     }
     else {
      search_results.style.display ="";
     }
   }
});


let masterplay = document.getElementById('masterplay');
let wave =document.getElementById('wave');

masterplay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <= 0) {
       music.play();
       wave.classList.add('active1');
       masterplay.classList.remove('bi-play-fill');
       masterplay.classList.add('bi-pause-fill');
    } else {
       music.pause();
       wave.classList.remove('active1');
       masterplay.classList.add('bi-play-fill');
       masterplay.classList.remove('bi-pause-fill');
    }
});

const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
      el.classList.add('bi-play-circle-fill');
      el.classList.remove('bi-pause-circle-fill');
      //   el.style.background ='rgb(105, 105, 105, .0)';
    })
}

const makeAllBackground = ()=>{
    Array.from(document.getElementsByClassName('songitem')).forEach((el)=>{
        el.style.background ='rgb(105, 105, 105, .0)';
    })
}

let index=0;
let poster_master_play =document.getElementById('poster_master_play');
let download_music =document.getElementById('download_music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id
        music.src = `audio/arjit/${index}.mp3`;
        poster_master_play.src = `img/arjitimg/${index}.jpg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
       masterplay.classList.add('bi-pause-circle-fill');
       download_music.href = `audio/${index}.mp3`;
       let songTitles = songs.filter((ele)=>{
        return ele.id == index;
       });

       songTitles.forEach(elem =>{
        let {songName}=elem;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
       });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.add('bi-pause-circle-fill');
        el.target.classList.remove('bi-play-circle-fill');
        wave.classList.add('active1');
       });
});
 
let currentstart=document.getElementById('currentstart');
let currentend=document.getElementById('currentend');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];
music.addEventListener('timeupdate', ()=>{
   let music_curr = music.currentTime;
   let music_dur = music.duration;
   let min1 = Math.floor(music_dur/60);
   let sec1 = Math.floor(music_dur %60);
   if(sec1 < 10){
      sec1 = `0${sec1}`;
   }
   currentend.innerText = `${min1}:${sec1}`;

   let min2 = Math.floor(music_curr / 60);
   let sec2 = Math.floor(music_curr % 60);
   if(sec2 < 10){
      sec2 = `0${sec2}`;
   }
   currentstart.innerText = `${min2}:${sec2}`;

   let progbar = parseInt((music_curr / music_dur)*100);
   seek.value = progbar;
   let seekbar =seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});
 seek.addEventListener('change', ()=>{
   music.currentTime =seek.value * music.duration /100;
 });

 let vol_icon = document.getElementById('vol_icon');
 let vol      = document.getElementById('vol');
 let vol_bar  = document.getElementsByClassName('vol_bar')[0];
 let vol_dot  = document.getElementById('vol_dot');
 
 vol.addEventListener('change',()=>{
   if(vol.value==0){
      vol_icon.classList.remove('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.add('bi-volume-mute-fill');
   }
   if(vol.value > 0){
      vol_icon.classList.remove('bi-volume-up-fill');
      vol_icon.classList.add('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-mute-fill');
   }
   if(vol.value>50){
      vol_icon.classList.add('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-mute-fill');
   }
   let vol_b = vol.value;
   vol_bar.style.width = `${vol_b}%`;
   vol_dot.style.left  = `${vol_b}%`;
   music.volume = vol_b/100;
 });
let prev =document.getElementById('prev');
let next =document.getElementById('next');
prev.addEventListener('click',()=>{
   index--;
   if(index <1){
      index=Array.from(document.getElementsByClassName('songitem')).length;
   }
   music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
       masterplay.classList.add('bi-pause-circle-fill');

       let songTitles = songs.filter((ele)=>{
        return ele.id == index;
       });

       songTitles.forEach(elem =>{
        let {songName}=elem;
        title.innerHTML = songName;
      //   poster_master_play.src = poster;
       });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.add('bi-pause-circle-fill');
        el.target.classList.remove('bi-play-circle-fill');
        wave. classList.add('active1');
});

next.addEventListener('click',()=>{
   index ++;
   if(index > Array.from(document.getElementsByClassName('songitem')).length){
      index = 1;
   }
   music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
       masterplay.classList.add('bi-pause-circle-fill');

       let songTitles = songs.filter((ele)=>{
        return ele.id == index;
       });

       songTitles.forEach(elem =>{
        let {songName}=elem;
        title.innerHTML = songName;
      //   poster_master_play.src = poster;
       });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.add('bi-pause-circle-fill');
        el.target.classList.remove('bi-play-circle-fill');
        wave. classList.add('active1');
});


let pop_song_left=document.getElementById('pop_song_left');
let pop_song_right=document.getElementById('pop_song_right');
let pop_songs =document.getElementsByClassName('pop_songs')[0];


pop_song_right.addEventListener('click', ()=>{
    pop_songs.scrollLeft +=330;
});
pop_song_left.addEventListener('click', ()=>{
    pop_songs.scrollLeft -=330;
});
let pop_art_left=document.getElementById('pop_art_left');
let pop_art_right=document.getElementById('pop_art_right');
let item =document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', ()=>{
    item.scrollLeft +=330;
});
pop_art_left.addEventListener('click', ()=>{
    item.scrollLeft -=330;
});

let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click',()=>{
 let x = shuffle.innerHTML;
  switch (x) {
   case "next":
      shuffle.classList.add('bi-arrow-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML = 'repeat';
      break;

   case "repeat":
      shuffle.classList.remove('bi-arrow-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.add('bi-shuffle');
      shuffle.innerHTML = 'random';
      break;

   case "random":
      shuffle.classList.remove('bi-arrow-repeat');
      shuffle.classList.add('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML = 'next';
      break;
  }
});
 const next_music = ()=>{
   if(index==songs.length){
      index=1
   }
   else {
      index++;
   }
   music.src = `audio/${index}.mp3`;
   poster_master_play.src = `img/${index}.jpg`;
   music.play();
   masterplay.classList.remove('bi-play-fill');
  masterplay.classList.add('bi-pause-circle-fill');
  download_music.href = `audio/${index}.mp3`;
  let songTitles = songs.filter((ele)=>{
   return ele.id == index;
  });

  songTitles.forEach(elem =>{
   let {songName}=elem;
   title.innerHTML = songName;
   download_music.setAttribute('download',songName);
  });
   
   makeAllBackground();
   Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
   makeAllplays();
   el.target.classList.add('bi-pause-circle-fill');
   el.target.classList.remove('bi-play-circle-fill');
   wave.classList.add('active1');
 }

 const repeat_music = ()=>{
   index;
   music.src = `audio/${index}.mp3`;
   poster_master_play.src = `img/${index}.jpg`;
   music.play();
   masterplay.classList.remove('bi-play-fill');
  masterplay.classList.add('bi-pause-circle-fill');
  download_music.href = `audio/${index}.mp3`;
  let songTitles = songs.filter((ele)=>{
   return ele.id == index;
  });

  songTitles.forEach(elem =>{
   let {songName}=elem;
   title.innerHTML = songName;
   download_music.setAttribute('download',songName);
  });
   
   makeAllBackground();
   Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
   makeAllplays();
   el.target.classList.add('bi-pause-circle-fill');
   el.target.classList.remove('bi-play-circle-fill');
   wave.classList.add('active1');
 }

 const random_music = ()=>{
   if(index==songs.length){
      index = 1
   }
   else {
      index = Math.floor((Math.random()* songs.length)+1);
   }
   music.src = `audio/${index}.mp3`;
   poster_master_play.src = `img/${index}.jpg`;
   music.play();
   masterplay.classList.remove('bi-play-fill');
  masterplay.classList.add('bi-pause-circle-fill');
  download_music.href = `audio/${index}.mp3`;
  let songTitles = songs.filter((ele)=>{
   return ele.id == index;
  });

  songTitles.forEach(elem =>{
   let {songName}=elem;
   title.innerHTML = songName;
   download_music.setAttribute('download',songName);
  });
   
   makeAllBackground();
   Array.from(document.getElementsByClassName('songitem'))[index-1].style.background= "rgb(105, 105, 105, .1)";
   makeAllplays();
   el.target.classList.add('bi-pause-circle-fill');
   el.target.classList.remove('bi-play-circle-fill');
   wave.classList.add('active1');
 }
 music.addEventListener('ended',()=>{
   let b= shuffle.innerHTML;
    switch (b) {
       case 'repeat':
           repeat_music();
          break;  
       case 'next':
          next_music();
         break;   
       case 'random':
         random_music();
        break;
       default:
          break;
    }
  });