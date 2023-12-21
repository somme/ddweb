$(document).ready(function() {
  //start crafty
  Crafty.init(1000, 400, document.getElementById('game'));

  var fire = true;

  var assetsObj = {
      sprites: {
        background: "hadouken/sprites/bg.png",
        player: "hadouken/sprites/guy.png",
        box: "hadouken/sprites/box2.png"
      }
  };

  //background sprites
  Crafty.sprite(284, assetsObj.sprites.background, {
    background1: [0,0],
    background2: [1,0],
    background3: [2,0],
    background4: [3,0]
  });

  //player sprites
  Crafty.sprite(128, assetsObj.sprites.player, {
    player: [0,0],
    playerHadooken: [0,1],
  });

  //box sprites
  Crafty.sprite(124, assetsObj.sprites.box, {
     box: [0,0]
  });

    function boxes(x){
      Crafty.e("2D, Canvas, box,  Animate, Gravity, Collision, SpriteAnimation, Tween")
        .attr({x: x, y: 0, z: 1})
        .gravity('Floor')
        .onHit("playerHadooken", function() {
          fire = true
          Crafty.audio.play("hitsound");
          playerHadooken.destroy();

          this.reel("destroy_box", 100, 1, 0, 3)
            .animate("destroy_box", 1)
            .bind('AnimationEnd', function(){
              this.destroy()
              boxes(Math.floor(Math.random() * 600) + 200)
            });


      })
    }

   function addAssets() {
     Crafty.audio.add('jumpsound', 'hadouken/sounds/jump.wav');
     Crafty.audio.add("hadookensound", "hadouken/sounds/hadoken.wav");
     Crafty.audio.add("hitsound", "hadouken/sounds/hit.wav");
     Crafty.background("#041c63");

     //randomize background
     for(var i = 0; i < 4; i++) {
       var bg = Crafty.math.randomInt(1, 4);
       Crafty.e("2D, Canvas, background"+bg).attr({x: i * 284, y:120, xspeed: 20});
     }

     Crafty.e("2D, Canvas, wall_left").attr({x: 0, y: 0, w: 10, h: 350});
     Crafty.e("2D, Canvas, wall_right").attr({x: 990, y: 0, w: 10, h: 350});
     Crafty.e('Floor, 2D, Canvas').attr({x: 0, y: 350, w: 1000, h: 10})

      player = Crafty.e("2D, DOM, player, Twoway, Gravity, Collision, SpriteAnimation, Keyboard")
      .attr({x: 0, y: 0, z: 1})
      .twoway(200)
      .gravity('Floor')
      .reel('walk_left',   600, 10, 0, 10)
      .animate("walk_left", 0)
      .reel('walk_right', 600, 0, 0, 10)
      .animate("walk_right", 0)
      .reel('jump_up', 600,  3, 0, 3)
      .animate("jump_up", 0)
      .bind("KeyDown", function(e) {
       if (e.key == Crafty.keys.LEFT_ARROW) {
            this.animate("walk_left", -1);
        } else if (e.key == Crafty.keys.RIGHT_ARROW) {
          this.animate("walk_right", -1);
        } else if (e.key == Crafty.keys.UP_ARROW) {
          Crafty.audio.play("jumpsound");
          this.animate("jump_up", 10);
        } else if(e.key == Crafty.keys.F) {

          function resetFire() {
            fire = true
          }

          if (!fire){
            setTimeout(resetFire, 2000);
          }

        if(fire){
            fire = false
            Crafty.audio.play("hadookensound");
            player.reel("hadooken",  100, [[20, 0], [21, 0], [22, 0]])
              .animate("hadooken", 1);

            //create a fireball entity
            playerHadooken = Crafty.e("2D, DOM, playerHadooken, SpriteAnimation, Animate, Tween, Collision, audio")
              .reel("fireball", 800, 0, 1, 7)
              .animate("fireball", -1)
              .attr({
                x: player._x,
                y: player._y,
                w: 128,
                h: 128,
              })
              .animate("fireball", -1)
              .tween({x: 1000, y: this._y}, 2000)

        }

      }
  })
  .bind("KeyUp", function(e) {

    if (e.key == Crafty.keys.LEFT_ARROW) {
      player.pauseAnimation()
    }
    if (e.key == Crafty.keys.RIGHT_ARROW) {
      player.pauseAnimation()
    }
    if (e.key == Crafty.keys.UP_ARROW) {
      player.pauseAnimation();
    }

  })
  .collision()
  .onHit("wall_left", function() {
    player.x = 10;
  })
  .onHit("wall_right", function() {
    player.x = -10;
  });

  boxes(Math.floor(Math.random() * 600) + 200)
  }

   Crafty.scene("main", function() {
    Crafty.scene("main");
   });

  Crafty.load(assetsObj,
    function() {
      addAssets();
    }
  );

});
