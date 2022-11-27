let particles = [];
let frequency = 20;
// Popolate particles
setInterval(
function () {
  popolate();
}.bind(this),
frequency);


let c1 = createCanvas({ width: $(".frontcard").width(), height: $(".frontcard").height() });
let c2 = createCanvas({ width: $(".frontcard").width(), height: $(".frontcard").height() });
let c3 = createCanvas({ width: $(".frontcard").width(), height: $(".frontcard").height() });

let tela = c1.canvas;
let canvas = c1.context;

// $("body").append(tela);
$("div.drmoodi").append(c3.canvas);
writeText(c2.canvas, c2.context, "Dr.\nFarzan\nMoodi");


class Particle {
  constructor(canvas, options) {
    let random = Math.random();
    this.canvas = canvas;
    this.x = options.x;
    this.y = options.y;
    this.s = 3 + Math.random();
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = 0.5 + Math.random() * 20;
    this.color = this.radius > 5 ? "#FF5E4C" : "#ED413C"; //this.randomColor()
  }

  randomColor() {
    let colors = ["#FF5E4C", "#FFFFFF"];
    return colors[this.randomIntFromInterval(0, colors.length - 1)];
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    //this.swapColor()
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;
    this.a += Math.random() * 0.8 - 0.4;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }
    this.render();
    return true;
  }}


function createCanvas(properties) {
  let canvas = document.createElement('canvas');
  canvas.width = properties.width;
  canvas.height = properties.height;
  let context = canvas.getContext('2d');
  return {
    canvas: canvas,
    context: context };

}

function writeText(canvas, context, text) {
  let size = 65;
  context.font = size + "px Montserrat";
  context.fillStyle = "#111111";
  context.textAlign = "center";
  let lineheight = 70;
  let lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - lineheight * (lines.length - 1) / 3);
  }
}

function maskCanvas() {
  c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
  c3.context.globalCompositeOperation = 'source-atop';
  c3.context.drawImage(c1.canvas, 0, 0);
  blur(c1.context, c1.canvas, 2);
}

function blur(ctx, canvas, amt) {
  ctx.filter = `blur(${amt}px)`;
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';
}


/*
 * Function to clear layer canvas
 * @num:number number of particles
 */
function popolate() {
  particles.push(
  new Particle(canvas, {
    x: $(window).width() / 2,
    y: $(window).height() / 2 }));


  return particles.length;
}

function clear() {
  canvas.globalAlpha = 0.03;
  canvas.fillStyle = '#111111';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

function update() {
  clear();
  particles = particles.filter(function (p) {
    return p.move();
  });
  maskCanvas();
  requestAnimationFrame(update.bind(this));
}

update();

gsap
  .timeline()
  .set(".numTxt", { x: 22, y: 375 })
  .set(".nameTxt", { x: 22, y: 410 })
  .add(centerMain(), 0.2)
  .from(
    ".ball",
    {
      duration: 2,
      transformOrigin: "50% 50%",
      scale: 0,
      opacity: 0,
      ease: "elastic",
      stagger: 0.2
    },
    0
  )
  .fromTo(
    ".card",
    {
      x: 200,
      y: 40,
      transformOrigin: "50% 50%",
      rotation: -4,
      skewX: 10,
      skewY: 4,
      scale: 2,
      opacity: 0
    },
    {
      duration: 1.3,
      skewX: 0,
      skewY: 0,
      scale: 1,
      opacity: 1,
      ease: "power4.inOut"
    },
    0.2
  );

function centerMain() {
  gsap.set(".main", { x: "50%", xPercent: -70, y: "50%", yPercent: -52 });
}
window.onresize = centerMain;

window.onmousemove = (e) => {
  let winPercent = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    },
    distFromCenter =
      1 -
      Math.abs(((e.clientX - window.innerWidth / 2) / window.innerWidth) * 2);

  gsap
    .timeline({ defaults: { duration: 0.5, overwrite: "auto" } })
    .to(".card", { rotation: -7 + 9 * winPercent.x }, 0)
    .to(".fillLight", { opacity: distFromCenter }, 0)
    .to(".bg", { x: 100 - 200 * winPercent.x, y: 20 - 40 * winPercent.y }, 0);
};

/* background card script*/
var 
$card = $('.card'),
$cardTitle = $('.card-title'),
$cardSubtitle = $('.card-subtitle'),
$cardShine = $('.card-shine'),
$cardShadow = $('.card-shadow'),
currentMousePos = { x: 0, y: 0 },
mouseFromCenter = { x: 0, y: 0 };

$(document).mousemove(function(event) {
	var
	wHeight= $(window).height(),
	wWidth= $(window).width();

	currentMousePos.x = event.pageX;
	currentMousePos.y = event.pageY;
	mouseFromCenter.x = currentMousePos.x - (wWidth / 2);
	mouseFromCenter.y = currentMousePos.y - (wHeight / 2);
	
	var 
	around1 = -1 * (currentMousePos.y * 100 / wHeight * 0.2 - 10) + 'deg',
	around2 = 1 * (currentMousePos.x * 100 / wWidth * 0.2 - 10) + 'deg',
	trans1 = (currentMousePos.x * 100 / wHeight * 0.3 ) + 'px',
	trans2 = (currentMousePos.y * 100 / wHeight * 0.3 ) + 'px',
	dy = event.pageY - wHeight / 2, //@h/2 = center of poster
	dx = event.pageX - wWidth / 2, //@w/2 = center of poster
	theta = Math.atan2(dy, dx), // angle between cursor and center of poster in RAD
	angle = theta * 180 / Math.PI - 90,  
	mousePositionX = ( currentMousePos.x / wWidth) * 100,
	mousePositionY = 50+( currentMousePos.y / wHeight)*10;

	// gradient angle and opacity for card shine effect
	$cardShine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (currentMousePos.y / wHeight) * .7 + ') 0%,rgba(255,255,255, 0) 80%)');
	// card pos and angle
	$card.css({
	"-webkit-transform": "translate3d(" + trans1 + ", " + trans2 +", 0) scale(1) rotatex(" + around1 + ") rotatey(" + around2 + ")",'background-position': mousePositionX + '%' + ' ' + (currentMousePos.y / wHeight) * 50  + '%'
	});
	// card shadow pos and angle
	$cardShadow.css({"transform": "scale(.9,.9) translateX(" + ((mouseFromCenter.x * -0.02) + 12) + "px) translateY(" + ((mouseFromCenter.y * -0.02) + 12 ) + "px) scale(1.0) rotateY(" + (mouseFromCenter.x / 25) * 0.5 + "deg) rotateX(" + ((mouseFromCenter.y / -25) ) + "deg)" });

	$cardTitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.7) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.65) + "px)"
	});

	$cardSubtitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.5) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.15) + "px) translateZ(60px)"
	});
});
