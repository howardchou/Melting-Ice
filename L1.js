let player_1;
let platforms_1;
let fires_1;
let cursors_1;
let exit_1;
let port1_1;
let port2_1;
let pipes_1;
let audio_1;
let life_1 = 100;
let lifeText_1;
let music_1, audioJump_1,audioMove_1,audioFire_1;
let reloadBtn_1;
let snows_1;
let collSnows_1=0;

let msg_bg_1;
let win_msg_1;
let lose_msg_1;
let homeBtn_1;
let nextBtn_1;
let restartBtn_1;
//Life 
let lifeStyle_1 = { font: "25px VT323", fill: "#fff" };

var L1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "L1" });
    },
    init: function() {},
    preload: function() {
        this.load.image('oven', './assets/oven.png');
        this.load.image("ground", "./assets/ground.png");
        this.load.image("top", "./assets/top.png");
        this.load.image("floor", "./assets/floor.png");
        this.load.image("wall", "./assets/wall.png");
        this.load.image("fire", "./assets/fire.png");
        this.load.spritesheet("exit_sprite","./assets/exit.png",{frameWidth: 253, frameHeight: 211 });
        this.load.image("port", "./assets/port.png");
        this.load.image("pipe", "./assets/Pipe.png");
        this.load.image("snow", "./assets/snow.png");
        this.load.image("play", "./assets/Volume_full.png");
        this.load.image("reload","./assets/reload.png");
        this.load.image("mute", "./assets/volume_closs.png");
        this.load.image('win_msg_1','./assets/win.png');
        this.load.image("lose_msg_1","./assets/lose.png");
        this.load.spritesheet("ice", "./assets/ice.png", { frameWidth: 500, frameHeight: 281 });

        //Music
        this.load.audio('bgMusic', './assets/music/background.mp3');
        this.load.audio('audioJump_1', './assets/music/jump.mp3');
        this.load.audio('audioMove_1','./assets/music/icemove.mp3');
        this.load.audio('audioFire_1','./assets/music/fire.mp3');
    },
    create: function() {
        //music
        audioJump_1 = this.sound.add('audioJump_1', {
            volumn: 0.5,
            loop: false
        });
        music_1 = this.sound.add('bgMusic', {
            volumn: 1,
            loop: true

        });
        audioMove_1=this.sound.add('audioMove_1',{
            volumn:0.2,
            loop:false,
        });
        audioFire_1=this.sound.add('audioFire_1',{
            volumn:0.2,
            loop:false
        });
        music_1.play();
        this.add.image(config.width / 2, config.height / 2 - 28, "oven").setScale(0.559, 0.45);
        //Background
        //exit_1 = this.add.image(config.width / 2 + 620, config.height / 2 + 185, "exit1").setScale(0.4).refreshBody(); //exit_1
        exit_1=this.physics.add.staticSprite(1200,570,'exit_sprite').setScale(0.8,0.8).refreshBody();
        //增加場景基本物件
        platforms_1 = this.physics.add.staticGroup();
        platforms_1.createMultiple([
            { key: "top", setXY: { x: config.width / 2, y: 25 } }, //Top
            { key: "ground", setXY: { x: config.width / 2, y: config.height - 25 }, setScale: { x: 1.23, y: 1.5 } }, //Bottom



            { key: "wall", setXY: { x: 220, y: 570 }, setScale: { x: 0.3, y: 0.3 } },
            { key: "wall", setXY: { x: 510, y: 418 }, setScale: { x: 0.3, y: -0.3 } }
        ]);
        platforms_1.children.iterate((child) => {
            child.refreshBody();
        });


        fires_1 = this.physics.add.staticGroup();
        fires_1.createMultiple([
            { key: "fire", setXY: { x: 1050, y: 578 }, setScale: { x: 0.3, y: 0.2 } } //fire1
        ]);
        fires_1.children.iterate((child) => {
            child.refreshBody();
        });

        pipes_1 = this.physics.add.staticGroup();
        pipes_1.createMultiple([
            { key: "pipe", setXY: { x: 365, y: 495 }, setScale: { x: 0.3, y: 0.3 } },//pipe1
            { key: "pipe", setXY: { x: 660, y: 350 }, setScale: { x: 0.3, y: 0.3 } },//pipe2
        ]);
        pipes_1.children.iterate((child) => {
            child.refreshBody();

        });
        //星星
        snows_1 = this.physics.add.staticGroup({
            createCallback:function(snows_1){
                snows_1.setName(this.getLength());
            }
        });
        snows_1.createMultiple([
            { key: "snow", setXY: { x: 660, y: 300 }, setScale: { x: 0.1, y: 0.1 } },//pipe1
            { key: "snow", setXY: { x: 365, y: 450 }, setScale: { x: 0.1, y: 0.1 } },//pipe2
            { key: "snow", setXY: { x: 660, y: 600 }, setScale: { x: 0.1, y: 0.1 } },//pipe1
        ]);
        snows_1.children.iterate((child) => {
            child.refreshBody();
            //child.setName(snows_1.getLength());
        });
       

        //Portals
        port1_1 = this.physics.add.staticGroup({
            createCallback: function (port) {
                //Add object name
                port.setName(this.getLength());
            }
        });
        port1_1.createMultiple([
            { key: "port", setXY: { x: 890, y: 300 }, setScale: { x: 0.3, y: 0.3 } }, //portal1_in
            { key: "port", setXY: { x: 750, y: 500 }, setScale: { x: 0.3, y: 0.3 } }, //portal1_out
        ]);
        port1_1.children.iterate((child) => {
            child.refreshBody();
            child.body.setSize(child.width * 0.15, child.height * 0.15);
        });

        //player_1
        player_1 = this.physics.add.sprite(100, 580, 'ice').setScale(0.25);
        player_1.body.setSize(player_1.width * 0.6, player_1.height);
        player_1.setBounce(0.2);
        player_1.setCollideWorldBounds(true);

        //player_1 anims
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
        lifeText_1 = this.add.text(player_1.body.x + (player_1.body.width / 2 - this.width / 2), player_1.body.y - 30, `${life_1}%`, lifeStyle_1);

        this.physics.add.overlap(player_1,snows_1,(player,snows)=>{
            snows.destroy();
            collSnows_1++;

        },null,this);


        //exit
        this.anims.create({
            key:'exit_sprite_close',
            frames:[{key:'exit_sprite',frame:0}],
            frameRate:20
        });
        this.anims.create({
            key:'exit_sprite_open',frames:this.anims.generateFrameNumbers('exit_sprite',{start:0,end:2}),
            frameRate:15,
            repeat:-1
        });

        //Game reminder
        msg_bg_1 =  this.add.rectangle(0, 0, 5000, 2000, 0x222222);
        msg_bg_1.alpha = 0.7;
        win_msg_1 = this.add.image(config.width/2, config.height/2-60, "win_msg_1").setScale(0.5);
        lose_msg_1 = this.add.image(config.width/2, config.height/2-100, "lose_msg_1").setScale(0.5);
        nextBtn_1 = this.add.text(config.width/2+30, config.height/2+60, "下一關", {
            fontSize: "25px",
            color: "white",
            stroke: "red",
            padding: 10,
            backgroundColor: "black"
        });
        nextBtn_1.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.scene.start("L2");
        });
        restartBtn_1 = this.add.text(config.width/2+30, config.height/2+60, "再玩一次", {
            fontSize: "25px",
            color: "white",
            stroke: "red",
            padding: 10,
            backgroundColor: "black"
        });
        restartBtn_1.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            restart_1(this.scene);
            // music_3.play();
        });
        homeBtn_1 = this.add.text(config.width/2-150, config.height/2+60, "回主頁", {
            fontSize: "25px",
            color: "white",
            stroke: "red",
            padding: 10,
            backgroundColor: "black"
        });
        homeBtn_1.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.scene.start("home");
        })
        msg_bg_1.visible = false;
        win_msg_1.visible = false;
        lose_msg_1.visible = false;
        nextBtn_1.visible = false;
        restartBtn_1.visible = false;
        homeBtn_1.visible = false;

        //增加玩家與草地的碰撞效果
        this.physics.add.collider(player_1, platforms_1, (res) => {
            //檢測是否碰到平台頂端
        });

        

        this.physics.add.collider(player_1, pipes_1, (res) => {
            //檢測是否碰到平台頂端
            life_1 = (life_1 - 0.05).toFixed(2);
            lifeText_1.setText(life_1 + "%");
        });



        //Add the collider event of player_1 and portal1
        this.physics.add.collider(player_1, port1_1, (player_1, port) => {
            if (port.name == "1") {
                var porOut = port1_1.getChildren().find(v => v.name == "2");
                player_1.setPosition(porOut.x, porOut.y + 20);
                port.scene.tweens.add({
                    targets: port,
                    scaleY: 0,
                    ease: "Linear",
                    duration: 300,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => { port.destroy(); }
                });
                porOut.scene.tweens.add({
                    targets: porOut,
                    scaleY: 0,
                    ease: "Linear",
                    duration: 300,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => { porOut.destroy(); }
                });
            }
        });

        //接收鍵盤事件
        cursors_1 = this.input.keyboard.createCursorKeys();

        reloadBtn=this.add.image(config.width / 2 + 550, config.height / 2 - 324,"reload").setScale(0.07).setInteractive()
        .on('pointerdown',(pointer,localX,loacalY,event)=>{
            restart_1(this.scene);
        });

        //音效播放
        let play = this.add.image(config.width / 2 - 550, config.height / 2 - 324, 'play').setScale(0.5).setInteractive()
            .on('pointerdown', () => {
                if (play.texture.key == "play") {
                    play.setTexture('mute');
                } else {
                    play.setTexture('play');
                    music_1.play();
                }
                if (music_1.mute) {
                    music_1.setMute(false);
                } else {
                    music_1.setMute(true);
                }
            });

        //扣血
        this.physics.add.overlap(player_1, fires_1, () => {
            life_1 = (life_1 - 0.12).toFixed(2);
            audioFire_1.play()
            lifeText_1.setText(life_1 + "%");

            //Whether game over
            if(life_1 <= 0){
                gameOver = true;
            }
        }, null, this);
    },
    update: function() {
        // 2顆星星
        if(collSnows_1 == 3){
            exit_1.anims.play('exit_sprite_open',true);
        }
        // 收集星星後打開
        if(collSnows_1==3){
            this.physics.add.collider(player_1,exit_1,(player_1,exit)=>{
               // console.log("pass");
                player_1.scene.tweens.add({
                    targets:player_1,
                    scaleX:0,
                    scaleY:0,
                    alpha:0,
                    ease:"Linear",
                    duration:800,
                    repeat:0,
                    yoyo:false
                });
                msg_bg_1.visible = true;
                win_msg_1.visible = true;
                nextBtn_1.visible = true;
                homeBtn_1.visible = true;
            });

        }
        if(gameOver == true){
            msg_bg_1.visible = true;
            lose_msg_1.visible = true;
            restartBtn_1.visible = true;
            homeBtn_1.visible = true;
            gameOver = false;
        }
        //按起跳的時候 要維持左右原本的動力
        //在空中的時候 不能按左右鍵
        if (cursors_1.left.isDown) {
            player_1.setVelocityX(-180);
            audioMove_1.play();
            player_1.anims.play('left', true);
        }
        else if (cursors_1.right.isDown) {
            player_1.setVelocityX(180);
            audioMove_1.play();
            player_1.anims.play('right', true);
        }
        else {
            player_1.setVelocityX(0);
            player_1.anims.play('turn');
        }
        // }
        if (cursors_1.up.isDown && player_1.body.touching.down) {
            audioJump_1.play();
            player_1.setVelocityY(-375);
        }
        //生命及時更新
        lifeText_1.setPosition(player_1.body.x + (player_1.body.width / 2 - lifeText_1.width / 2), player_1.body.y - 30);
    }
});
//Function 重頭開始 (角色)
function resetplayer_1Pos(){
    player_1.setPosition(100,580);
}
//Function 遊戲重開始
function restart_1(scene){
    resetplayer_1Pos();
    life_1=100;
    collSnow=0;
    gameOver = false;
    scene.restart();
    music_1.play();
}