document.addEventListener("DOMContentLoaded", () => {
  function llenarIconos(svg){
    let aside = document.createElement("aside");
    aside.id = "source-icons";
    aside.innerHTML = svg;
    document.body.appendChild(aside);
  }
  
  window.onload = function() {
    pedirRuta("assets/symbol-defs.svg", llenarIconos)
  }
  
  function pedirRuta(ruta, ejecutarOk, ejecutarErr){
    let req =  new XMLHttpRequest();
    req.open("GET", ruta, true);
    req.onreadystatechange = function(){
      if (req.readyState == 4) {
        if (req.status == 200){
          let text = req.responseText;
          ejecutarOk(text);
        } else if (ejecutarErr) {
          ejecutarErr(req.status);
        }
      }
    };
    req.send()
  }

  // Emtt search box
  document.querySelector('.empty').addEventListener('click', function() {
	  document.querySelector('.search').value = '';
	  this.style.display = 'none';
	  document.querySelectorAll('li').forEach(function(li) {
      li.style.display = '';
    });
  });
  // Search
  document.querySelector('.search').addEventListener('keyup', function() {
    var val = this.value.toLowerCase();

    if (val.length > 0) { 
      document.querySelector('.empty').style.display = 'inline';
	  } else {
      document.querySelector('.empty').style.display = 'none';
	  }

	  document.querySelectorAll('li').forEach(function(li) {
      var text = li.textContent.toLowerCase();
      if (text.includes(val)) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
	  });
  });
});

// Progress Bar
const progressBar = document.querySelector('#progress');

window.addEventListener('scroll', function() {
	let width = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
	progressBar.style.width = `${width}%`;
});

// Theme switch
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch');
const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
});

// Pop Over
document.querySelectorAll('i').forEach(function(icon) {
  icon.addEventListener('click', function() {

    if (this.parentElement.classList.contains('icon')) {
	    const svg = this.firstElementChild.outerHTML;
	    const name = this.parentElement.lastElementChild.textContent;

      var popover = `<div class="popover First"><span class="close">&times;</span><h3> ${name} </h3><div class="popGrid" title="usage examples"><div class="ico x128" title="128px"> ${svg} </div><div class="ico x48" title="48px"> ${svg} </div><div class="ico" title="32px"> ${svg} </div><div class="ico x16" title="16px"> ${svg} </div></div><p><u>Quitar bordes</u></p></div>`;
    };

    document.querySelectorAll('li').forEach(function(li) {
      li.classList.remove('active');
    });

    let parent = this.parentElement;
    parent.classList.add('active');
	  parent.insertAdjacentHTML('beforeend', popover);
  })
});
// Close popover
function hideMe() {
  const fade = [
    { opacity: "0" },
    { filter: "blur(69px)" },
  ];
  const timing = {
    duration: 500,
    easing: "cubic-bezier(.5, -0.53, .14, 1.23)",
    iterations: 1,
  };

  document.querySelectorAll('.popover').forEach(function(pop) {
    pop.animate(fade, timing);
    setTimeout(function(){ pop.remove() }, 450);
  });

  document.querySelectorAll('li').forEach(function(li) {
    li.classList.remove('active');
  });
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    hideMe();
  }
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.popover, li')) {
    hideMe();
  }
});

window.addEventListener('keyup', event => {
  if (event.key === 'Escape'){
    hideMe();
  }
});