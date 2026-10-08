const firstVisit=!sessionStorage.getItem('chaenggim-home-seen');
if(firstVisit){document.body.classList.add('first-visit');sessionStorage.setItem('chaenggim-home-seen','1');}
