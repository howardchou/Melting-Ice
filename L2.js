let platform_2;
let player_2;
let cursors_2;
let stars_2;
let port2;
let collStars_2 = 0;
let reloadBtn_2;

let life_2 = 100; //life_2 value
let lifeText_2;
let audio_2;
let music_2, audioJump_2,audioMove_2,audioFire_2;

let msg_bg_2;
let win_msg_2;
let lose_msg_2;
let homeBtn_2;
let nextBtn_2;
let restartBtn_2;

var L2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "L2" });
    },
    init: function() {},
    preload: function() {
        this.load.image('oven','./assets/oven.png');
        this.load.image('ground','./assets/ground.png');
        this.load.image('upfloor','./assets/top.png');
        this.load.image('floor', './assets/floor.png');
        this.load.spritesheet("ice", "./assets/ice.png", {frameWidth: 500, frameHeight: 281});
        this.load.image('ovenlight', './assets/Pipe.png');
        this.load.image('door', './assets/port.png');
        this.load.spritesheet("exit_sprite", "./assets/exit.png", {frameWidth: 253, frameHeight: 211});
        this.load.image('star', './assets/snow.png');
        this.load.image('reload', './assets/reload.png');
        this.load.image('win_msg_1','./assets/win.png');
        this.load.image("lose_msg_1","./assets/lose.png");

        this.load.image("play", "./assets/Volume_full.png");
        this.load.image("mute", "./assets/volume_closs.png");
        this.load.audio('bgMusic', './assets/music/background.mp3');
        this.load.audio('audio_2Jump', './assets/music/jump.mp3');
        this.load.audio('audio_2Move','./assets/music/icemove.mp3');
        this.load.audio('audio_2Fire','./assets/music/new fire.mp3');
    },
    create: function() {
        this.add.image(config.width/2, config.height/2-28, "oven").setScale(0.559, 0.45); //Background
            
            platforms = this.physics.add.staticGroup(); 
            platforms.createMultiple([
                {key: "upfloor", setXY:{x: config.width/2, y: 25}}, //Top
                {key: "ground", setXY:{x: config.width/2, y: config.height-26.5}, setScale: {x: 1.23, y: 1.5}}, //Bottom

                {key: "floor", setXY:{x: 125, y: 250}, setScale: {x: 0.126, y: 0.206}}, //ground
                {key: "floor", setXY:{x: 600, y: 190}, setScale: {x: 0.156, y: 0.206}}, //ground
                {key: "floor", setXY:{x: 920, y: 320}, setScale: {x: 0.154, y: 0.206}}, //ground
                {key: "floor", setXY:{x: 1130, y: 390}, setScale: {x: 0.105, y: 0.206}}, //ground
            ]);
            platforms.children.iterate((child) => {
                child.refreshBody();
            });
            
            /*1*/
            speed1 = -400;
            updownPlatforms1 = this.physics.add.sprite(320, 550, "floor").setScale(0.156, 0.206).refreshBody().setImmovable();
            updownPlatforms1.scene.tweens.add({
                targets: updownPlatforms1,
                velocityY: speed1,
                ease: 'Linear', //動畫使用線性變化 "Cubic", "Elastic", "Bounce", "Back", "Quad.easeIn"
                duration: 1000,
                repeat: -1, //-1 -> infinity
                // onStart: () =>{
                //     moveFLoor.refreshBody();
                // },
                onUpdate: () => {
                    if(updownPlatforms1.y >= 550) {
                        updownPlatforms1.setVelocityY(1*speed1);
                    }
                },
            });

            /*2*/
            speed2 = 380;
            //updownPlatforms = this.physics.add.sprite(250, 500, "ground").setScale(0.156, 0.206).refreshBody().setImmovable();
            updownPlatforms2 = this.physics.add.sprite(720, 500, "floor").setScale(0.156, 0.206).refreshBody().setImmovable();
            updownPlatforms2.scene.tweens.add({
                targets: updownPlatforms2,
                velocityY: speed2,
                ease: 'Linear', //動畫使用線性變化 "Cubic", "Elastic", "Bounce", "Back", "Quad.easeIn"
                duration: 1000,
                repeat: -1, //-1 -> infinity
                // onStart: () =>{
                //     moveFLoor.refreshBody();
                // },
                onUpdate: () => {
                    if(updownPlatforms2.y >= 480) {
                        updownPlatforms2.setVelocityY(-1*speed2);
                    }

                },
            });

            /*end of 上下台階*/

            arcadePlatforms = this.physics.add.staticGroup();
            arcadePlatforms.create(510, 400, 'floor').setScale(0.156,0.206).refreshBody();

            
            player_2 = this.physics.add.sprite(50, 550, 'ice').setScale(0.25);
            player_2.body.setSize(player_2.width*0.6, player_2.height);
            player_2.setBounce(0.2);
            player_2.setCollideWorldBounds(true);
            
            //player_2 anims
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('ice', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: -1 //-1：無限次
            });
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'ice', frame: 2 }],
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('ice', { start: 3, end: 4 }),
                frameRate: 15,
                repeat: -1
            });


            ovenlight = this.physics.add.staticGroup();
            ovenlight.create(270, 250, 'ovenlight').setScale(0.26,0.6).refreshBody();//烤箱燈條1
            ovenlight.create(475, 645, 'ovenlight').setScale(0.5,0.5).refreshBody();//烤箱燈條2


            
            //portal
            port2 = this.physics.add.staticGroup({
                createCallback: function(port){
                    //Add object name
                    port.setName(this.getLength());
                }
            });
            port2.createMultiple([
                {key: "door", setXY:{x: 80, y: 50}, setScale: {x: 0.3, y: 0.3}}, //portal2_up
                {key: "door", setXY:{x: 1050, y: 535}, setScale: {x: 0.3, y: 0.3}} //portal2_down
            ]);
            port2.children.iterate((child) => {
                child.body.setSize(child.width*0.15, child.height*0.01);
            });
            //Add player_2 and portal2 collider
            this.physics.add.collider(player_2, port2, (player_2, port)=>{
                if(port.name == "1"){
                    var porOut = port2.getChildren().find(v => v.name == "2");
                    player_2.setPosition(porOut.x, porOut.y+70);
                }
                else{
                    var porOut = port2.getChildren().find(v => v.name == "1");
                    player_2.setPosition(porOut.x, porOut.y+70);
                }
            });
            
            exit = this.physics.add.staticSprite(1200, 125, 'exit_sprite').setScale(0.8,0.8).refreshBody();

            /*star*/
            stars_2 = this.physics.add.staticGroup({
                createCallback: function(stars_2){
                    //Add object name
                    stars_2.setName(this.getLength());
                }
            });
            stars_2.createMultiple([
                {key: "star", setXY:{x: 85, y: 180}, setScale: {x: 0.1, y: 0.1}}, //snow1
                // {key: "snow", setXY:{x: 55, y: 450}, setScale: {x: 0.15, y: 0.15}}, //snow1
                {key: "star", setXY:{x: 580, y: 150}, setScale: {x: 0.1, y: 0.1}}, //snow2
                {key: "star", setXY:{x: 1130, y: 350}, setScale: {x: 0.1, y: 0.1}} //snow3
            ]);
            stars_2.children.iterate((child) => {
                child.refreshBody();
            });
            //Add player_2 and snows collider
            this.physics.add.collider(player_2, stars_2, (player_2, star) =>{
                star.destroy();
                collStars_2++;
            });

            this.anims.create({
                key: 'exit_sprite_close',
                frames: [ { key: 'exit_sprite', frame: 0 } ],
                frameRate: 20,
            });
                
            this.anims.create({
                key: 'exit_sprite_open',
                frames: this.anims.generateFrameNumbers('exit_sprite', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: -1
            });

            

            //life_2 text
            let lifeStyle =  {font: "25px VT323", fill: "#fff"};
            console.log(life_2);
            lifeText_2 = this.add.text(
                player_2.body.x+(player_2.body.width/2-this.width/2), //Horizontal center above player_2
                player_2.body.y-30, //above the player_2
                `${life_2}%`,
                lifeStyle
            );
            //Add player_2 and ovenlight overlap
            this.physics.add.overlap(player_2, ovenlight, () => {
                //Decrease the life_2 value
                life_2 = (life_2 - 0.5).toFixed(2);
                audioFire_2.play();;
                //Set life_2 value to the text elm
                lifeText_2.setText(life_2+"%");

                //Whether game over
                if(life_2 <= 0){
                    gameOver = true;
                }
            }, null, this);
            //Reposition the lifeText_2
            lifeText_2.setPosition(player_2.body.x+(player_2.body.width/2-lifeText_2.width/2), player_2.body.y-30);

            
            //Game reminder
            msg_bg_2 =  this.add.rectangle(0, 0, 5000, 2000, 0x222222);
            msg_bg_2.alpha = 0.7;
            win_msg_2 = this.add.image(config.width/2, config.height/2-60, "win_msg_1").setScale(0.5);
            lose_msg_2 = this.add.image(config.width/2, config.height/2-100, "lose_msg_1").setScale(0.5);
            nextBtn_2 = this.add.text(config.width/2+30, config.height/2+60, "下一關", {
                fontSize: "25px",
                color: "white",
                stroke: "red",
                padding: 10,
                backgroundColor: "black"
            });
            nextBtn_2.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
                this.scene.start("L3");
            });
            restartBtn_2 = this.add.text(config.width/2+30, config.height/2+60, "再玩一次", {
                fontSize: "25px",
                color: "white",
                stroke: "red",
                padding: 10,
                backgroundColor: "black"
            });
            restartBtn_2.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
                restart_1(this.scene);
                // music_3.play();
            });
            homeBtn_2 = this.add.text(config.width/2-150, config.height/2+60, "回主頁", {
                fontSize: "25px",
                color: "white",
                stroke: "red",
                padding: 10,
                backgroundColor: "black"
            });
            homeBtn_2.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
                this.scene.start("home");
            })
            msg_bg_2.visible = false;
            win_msg_2.visible = false;
            lose_msg_2.visible = false;
            nextBtn_2.visible = false;
            restartBtn_2.visible = false;
            homeBtn_2.visible = false;

            cursors_2 = this.input.keyboard.createCursorKeys();
            
            this.physics.add.collider(player_2, platforms);
            this.physics.add.collider(player_2, updownPlatforms1);
            this.physics.add.collider(player_2, updownPlatforms2);
            this.physics.add.collider(player_2, arcadePlatforms);
            this.physics.add.collider(player_2, ovenlight);

            //reloadG
            reloadBtn_2 = this.add.image(config.width-40, 27, "reload").setScale(0.07); 
            reloadBtn_2.setInteractive().on("pointerdown", (pointer, localX, localY, event) => {
                restart_2(this.scene);
            })

            audioJump_2 = this.sound.add('audio_2Jump', {
                volumn: 0.5,
                loop: false
            });
            music_2 = this.sound.add('bgMusic', {
                volumn: 1,
                loop: true

            });
            audioMove_2=this.sound.add('audio_2Move',{
                volumn:0.2,
                loop:false
            });
            audioFire_2=this.sound.add('audio_2Fire',{
                volumn:0.2,
                loop:false
            });

            let play = this.add.image(config.width / 2 - 550, config.height / 2 - 324, 'play').setScale(0.5).setInteractive()
                .on('pointerdown', () => {
                    if (play.texture.key == "play") {
                        play.setTexture('mute');
                    } else {
                        play.setTexture('play');
                        music_2.play();
                    }
                    if (music_2.mute) {
                        music_2.setMute(false);
                    } else {
                        music_2.setMute(true);
                    }
            });
                
            music_2.play();
    },
    update: function() {
        if (cursors_2.left.isDown) {
                player_2.setVelocityX(-180);
                player_2.anims.play('left', true);
                audioMove_2.play();
                
            }
            else if (cursors_2.right.isDown) {
                player_2.setVelocityX(180);
                player_2.anims.play('right', true);
                audioMove_2.play();
            }
            else {
                player_2.setVelocityX(0);
                player_2.anims.play('turn');
            }
            // }
            if (cursors_2.up.isDown && player_2.body.touching.down) {
                player_2.setVelocityY(-375);
                audioJump_2.play();
            }

            if(collStars_2 == 3){
                exit.anims.play('exit_sprite_open',true);
            }else if(collStars_2 != 3){
                exit.anims.play('exit_sprite_close',true);
            }

            //Reposition the lifeText_2
            lifeText_2.setPosition(player_2.body.x+(player_2.body.width/2-lifeText_2.width/2), player_2.body.y-30);
            
            if(collStars_2 == 3){
                this.physics.add.collider(player_2, exit, (player_2, exit) =>{
                    console.log("pass");
                    player_2.scene.tweens.add({
                        targets: player_2,
                        scaleX: 0,
                        scaleY: 0,
                        alpha: 0,
                        ease: "Linear",
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                    });
                    lifeText_2.destroy();
                    
                    msg_bg_2.visible = true;
                    win_msg_2.visible = true;
                    nextBtn_2.visible = true;
                    homeBtn_2.visible = true;
                });
            } 
            if(gameOver == true){
                msg_bg_2.visible = true;
                lose_msg_2.visible = true;
                restartBtn_2.visible = true;
                homeBtn_2.visible = true;
                gameOver = false;
            }
    }
});
function resetPlayerPos(){
    player_2.setPosition(100, 580);
}
function restart_2(scene){
    resetPlayerPos();
    life_2 = 100;
    collStars_2 = 0;
    scene.restart();
}