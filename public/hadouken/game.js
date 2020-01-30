$(document).ready(function() {
  //start crafty
  Crafty.init(30, 1000, 400);
  Crafty.canvas();


__CONFIG = {};
__CONFIG.images = {
  player: "hadouken/sprites/guy.png",
  bground: "hadouken/sprites/bg.png",
    box: "hadouken/sprites/box2.png"
  };





  //player sprites
    Crafty.sprite(128, __CONFIG.images.player,
    {
    player: [0,0],
        playerHadooken: [0,1],
        player2: [0,2],
        player2Hadooken: [0,3]

  });
    //background sprites
    Crafty.sprite(284, __CONFIG.images.bground,
    {
    //bground: [0,0],
    bground1: [0,0],
        bground2: [1,0],
        bground3: [2,0],
        bground4: [3,0]
    });
     //box sprites
    Crafty.sprite(124, __CONFIG.images.box,
    {
        box: [0,0]
    });




  //add sounds
Crafty.audio.add("hadookensound", ["hadouken/sounds/hadoken.wav"]).settings({volume: 0.8});
Crafty.audio.add("hitsound", ["hadouken/sounds/hit.wav"]).settings({volume: 0.2});
Crafty.audio.add("jumpsound", ["hadouken/sounds/jump.wav"]).settings({volume: 0.2});



Crafty.c("health",{
     _mana:100,
     health:function(mana){
       this._mana=mana;
       return this
       },
       hurt:function(by){
         this._mana-=by;
         this.trigger("hurt",
                {by:by,
                mana:this._mana
                });
         if(this._mana<=0)this.trigger("die");
         return this},
         heal:function(by){
           this._mana+=by;
           this.trigger("heal");
           return this
           }
           }
);



 init: function generateWorld() {


    //walls
    for(var i = 1; i < 19; i++) {
      Crafty.e("2D, DOM, wall_left, bush"+Crafty.randRange(1,2))
        .attr({x: 0, y: i * 16, z: 2});
      Crafty.e("2D, Canvas, wall_right, bush"+Crafty.randRange(1,2))
        .attr({x: 1000, y: i * 16, z: 2});
    }
  }


  //the loading screen that will display while our assets load
  Crafty.scene("loading", function() {
    //load takes an array of assets and a callback when complete
    Crafty.load(["hadouken/sprites/guy.png","hadouken/sprites/bg.png", "hadouken/sprites/box2.png"], function() {
      Crafty.scene("main"); //when everything is loaded, run the main scene
    });

    //Transparent background with some loading text
    Crafty.background("#041c63");

    Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 420, y: 150})
      .text("Loading")
      .css({"text-align": "center", "color":"#fff", 'font-size':'2em', 'margin':'0 auto'});
  });

  //automatically play the loading scene
  Crafty.scene("loading");

  Crafty.scene("main", function() {
    generateWorld();

    Crafty.c('twoway', {
      __move: {left:false,right:false,up:false,falling:false},
      _speed: 10,

      twoway: function(speed,jump) {
        //if(speed) this._speed = speed*4;
               if(speed) this._speed=speed;this._speed*4;
        var move = this.__move;




        this.bind('enterframe', function() {
          //move the player in a direction depending on the booleans
          //only move the player in one direction at a time (up/down/left/right)
          if(this.isDown("RIGHT_ARROW")) this.x += this._speed;
          else if(this.isDown("LEFT_ARROW")) this.x -= this._speed;
          else if(this.isDown("UP_ARROW")) this.y -= this._speed;
                    //else if(this.isDown("UP_ARROW")) this.y-=jump;this._falling=true;changed=true;
                   // else if(move.up){this.y-=jump;this._falling=true;changed=true}
          //else if(this.isDown("Z")) this.y += this._speed;
                    else if(this.isDown("Z"));




        });

        return this;
      }
    });


          //create an invisible floor entity
        var floor = Crafty.e("2D, floor")
        .attr({x:0, y: 342, w: 1000, h: 5});


       Crafty.c('thrust', {
      thrust: function() {
        this.disabledControls = true;
        this.bind('enterframe', function() {
                //scroll player
                         // this.x -= 4;


          if(this.isDown('UP_ARROW')) {
                        this.x += 4;
                       // this.speed = 400;
          }

        });
        return this;
      }
    });

        Crafty.c('thrustfireball', {
      thrust: function() {
        this.disabledControls = true;
        this.bind('enterframe', function() {
          if(this.isDown('Z')) {
                        this.y = 0;
                        this.x = 0;
                        this.y += 300;
                        this.speed = 1;
                    }

        });
        return this;
      }
    });

    Crafty.c('score', {
      _score:0,
      score: function(initial) {
        this._score = initial;
        return this;
      },
      addScore: function(points) {
        this._score += points;
        return this;
      }
    });


    //create our player entity with some premade components
    player = Crafty.e("2D, Canvas, player, Controls, twoway, Animate, Collision, gravity, thrust, score")
      .attr({x: 0, y: 0, z: 1})
      //.twoway(0)
            .gravity('floor',20)
            .twoway(10)
            .thrust(200)
      .animate("walk_left", 10, 0, 19)
      .animate("walk_right", 0, 0, 9)
      .animate("jump_up", 3, 0, 3)
      .animate("hadooken", 20, 0, 22)

        //player.animate("walk_right", 20, 10)
      //.bind("enterframe", function(e) {



      .bind("keydown", function(e) {


                if(e.keyCode === Crafty.keys.RIGHT_ARROW) {

                    this.move.right = false;
                    if(!this.isPlaying("walk_right"))
                    this.stop().animate("walk_right", 20);

        } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {

                    this.move.left = false;
                    if(!this.isPlaying("walk_left"))
                    this.stop().animate("walk_left", 20);

        } else if(e.keyCode === Crafty.keys.UP_ARROW) {
          //Crafty.audio.play("jumpsound");
                    this.move.up = false;
                    if(!this.isPlaying("jump_up"))
                    Crafty.audio.play("jumpsound");
                    this.stop().animate("jump_up", 10);

        } else if(e.keyCode === Crafty.keys.Z) {


                //create a fireball entity
        playerHadooken = Crafty.e("2D, Canvas, playerHadooken, Animate, tween, Collision, audio")
                playerHadooken.animate("fireball", 0, 1, 7)
                playerHadooken.collision()
        playerHadooken.onHit("box", function() {
          player.addScore(Math.floor(Math.random()*4)+1);
          $('#score').html(player._score);
            Crafty.audio.play("hitsound");
            this.destroy();
            //box.destroy();

            })

            playerHadooken.attr({
              x: this._x,
              y: this._y,
              w: 128,
              h: 128,
            })

                       playerHadooken.animate("fireball", 100);
                       playerHadooken.tween({x: 1000, y: this._y}, 100);
                      Crafty.audio.play("hadookensound");

                       this.stop().animate("hadooken", 6);
                     //   playerHadooken.onHit("player2");



                }


      })



      .collision()

      .onHit("wall_left", function() {
        this.x += this._speed;
        //this.stop();
      })
            .onHit("wall_right", function() {
        this.x -= this._speed;
        //this.stop();
      })
      /*.onHit("box", function() {
        this.x -= this._speed;
      })*/




            //player 2
           /* player2 = Crafty.e("2D, Canvas, player2, Animate, gravity,collision")
                .attr({x: 850, y: 0, z: 1})
                .gravity('floor',20)*/

      //box
      var __x =0;
      for (var i=0; i<4; i++) {
        __x = Math.floor(Math.random() * 600) + 200 + __x;
        box = Crafty.e("2D, Canvas, box, Animate, gravity,collision")
                .attr({x: __x, y: 0, z: 1})
                .gravity('floor',20)
        .onHit("playerHadooken", function() {
          this.destroy();
          playerHadooken.destroy();
                      Crafty.audio.play("hitsound");
        })
      }

      //background
 /*         bground = Crafty.e("2D, Canvas, bground, Animate, tween")
                bground.attr({x: 0, y: 120, z: 0})
                //bground.animate("bground", 0, 0, 1)


                                      .tween({x: -1000, y: 120}, 10000);

 */



      for(var i = 0; i < 4; i++) {
            bground = Crafty.randRange(1, 4);
        Crafty.e("2D, Canvas, thrust, bground"+bground)
          .attr({x: i * 284, y:120, xspeed: 20});

    }








  });


});
