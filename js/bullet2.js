var Bullet2 = function(settings, startX, startY, power, angle) {
    // Settings
    var bulletElement = null;
    var Vx = 0;
    var Vy = 0;
    var y = startY;
    var x = startX;
    var radians = 0;
    var audio = new Audio('assets/explode.mp3');

    function wall() {
      //getBoundingClientRect determines boundaries
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(bulletRect.bottom > h){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet2);
        settings.bulletActive = false;
      }

      if(bulletRect.top < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet2);
        settings.bulletActive = false;
      }

      if(bulletRect.left < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet2);
        settings.bulletActive = false;
      }

      if(bulletRect.right > w){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet2);
        settings.bulletActive = false;
      }
    }

    // collision with enemy
    function collision() {
      var rect1 = {x: settings.player1pos.x, y: settings.player1pos.y, width: 50, height: 50} //player
      var rect2 = {x: x, y: y, width: 10, height: 10} //projectile

      if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet2);
        settings.bulletActive = false;
        settings.player1hp = settings.player1hp - 50;
        audio.play();
      }
    }

    function move(interactions){
      //while no collision or no wall, keep flying
      var flightTime = settings.frame - startTime;
      flightTime = flightTime/12;
      x = startX + Vx * flightTime;
      //s = ut - 1/2at^2
      y = startY + Vy * flightTime - (0.5)*(settings.gravity)*(flightTime)*(flightTime);
      bulletElement.style.left = x + 'px';
      bulletElement.style.bottom = y + 'px';

      if(settings.walls){
        wall();
      }

      collision();
    }

    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }

    function init(){
      bulletElement = document.createElement('div');
      bulletElement.id = 'bulletElem2';
      //starting position of bullet
      bulletElement.style.bottom = y + 'px';
      bulletElement.style.left = x + 'px';
      bulletElement.style.borderRadius = '50%';
      radians = toRadians(angle);
      Vx = power * Math.cos(radians); //how much its going up
      Vx = Math.floor(Vx);
      Vy = power * Math.sin(radians); //how much its going laterally
      Vy = Math.floor(Vy);
      height = Vy;
      startTime = settings.frame;
      document.getElementById('gameboard').appendChild(bulletElement);
    }

    this.render = function(){
      move();
    }

    init();
  }
