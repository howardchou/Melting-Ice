let player_3;

let cursors;
let reloadBtn;
let play;

//Game objects
let platforms_3; 
let moveFLoor_3;
let cookies_3;
let fires_3;
let exit_3;
let port1_3;
let port2_3;
let snows_3;

let msg_bg_3;
let win_msg_3;
let lose_msg_3;
let homeBtn_3;
let restartBtn_3;

let life_3 = 100; //life_3 value
let lifeText_3;
let collSnow_3 = 0;
let audio_3;
let music_3, audioJump_3, audioMove_3, audioFire_3;
let gameOver = false;
let gameWin = false;

var L3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "L3" });
    },
    init: function() {},
    preload: function() {
        //Load Google WebFont
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        //Game controller
        this.load.image("reload", "./assets/reload.png");
        this.load.image("play", "./assets/Volume_full.png");
        this.load.image("mute", "./assets/volume_closs.png");
        //Game objects
        this.load.image('oven', './assets/oven.png');
        this.load.image("ground", "./assets/ground.png");
        this.load.image("top", "./assets/top.png");
        this.load.image("floor", "./assets/floor.png");
        this.load.image("wall", "./assets/wall.png");
        this.load.image("fire", "./assets/fire.png");
        this.load.image("cookie", "./assets/cookie.png");
        this.load.image("cookieH", "./assets/cookieH.png");
        this.load.image('win_msg_3','./assets/win.png');
        this.load.image("lose_msg_3","./assets/lose.png");
        this.load.spritesheet("exit", "./assets/exit.png", {frameWidth: 253, frameHeight: 211});

        this.load.image("port", "./assets/port.png");
        this.load.image("snow", "./assets/snow.png");
        this.load.audio('bgMusic', './assets/music/background.mp3');
        this.load.audio('jump', './assets/music/jump.mp3');
        this.load.audio('move','./assets/music/icemove.mp3');
        this.load.audio('fire','./assets/music/fire.mp3');
        //player_3
        this.load.spritesheet("ice", "./assets/ice.png", {frameWidth: 500, frameHeight: 281});
    },
    create: function() {
        //Keyboard event
        cursors = this.input.keyboard.createCursorKeys();
        //Background
        this.add.image(config.width/2, config.height/2-28, "oven").setScale(0.559, 0.45); 
        audioJump_3 = this.sound.add('jump', {
            volumn: 0.5,
            loop: false
        });
        music_3 = this.sound.add('bgMusic', {
            volumn: 1,
            loop: true

        });
        audioMove_3=this.sound.add('move',{
            volumn:0.2,
            loop:false
        });
        audioFire_3=this.sound.add('fire',{
            volumn:0.2,
            loop:false
        });
        music_3.play();
        
        //exit_3
        exit_3 = this.physics.add.staticSprite(config.width/2+620, config.height/2-140, 'exit')
        .setScale(0.8).refreshBody();
        this.anims.create({
            key: 'exit_sprite_close',
            frames: [ { key: 'exit', frame: 0 } ],
            frameRate: 20,
        });
            
        this.anims.create({
            key: 'exit_sprite_open',
            frames: this.anims.generateFrameNumbers('exit', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        });
        //增加場景基本物件
        platforms_3 = this.physics.add.staticGroup();
        platforms_3.createMultiple([
            {key: "top", setXY:{x: config.width/2, y: 25}}, //Top
            {key: "ground", setXY:{x: config.width/2, y: config.height-26.5}, setScale: {x: 1.23, y: 1.5}}, //Bottom

            {key: "floor", setXY:{x: 90, y: 370}, setScale: {x: 0.15, y: 0.2}}, //floor1
            {key: "floor", setXY:{x: 150, y: 520}, setScale: {x: 0.25, y: 0.2}}, //floor2
            {key: "floor", setXY:{x: 550, y: 447}, setScale: {x: 0.07, y: 0.15}}, //floor3
            {key: "floor", setXY:{x: 910, y: 400}, setScale: {x: 0.1, y: 0.15}}, //floor4
            {key: "floor", setXY:{x: 1050, y: 350}, setScale: {x: 0.1, y: 0.15}}, //floor5

            {key: "wall", setXY:{x: 480, y: 540}, setScale: {x: 0.3, y: 0.4}},
            {key: "wall", setXY:{x: 550, y: 132}, setScale: {x: 0.3, y: -0.3}}
        ]);
        platforms_3.children.iterate((child) => {
            child.refreshBody();
        });
        //Play btn
        play = this.add.image(config.width / 2 - 550, config.height / 2 - 324, 'play')
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                if (play.texture.key == "play") {
                    play.setTexture('mute');
                } else {
                    play.setTexture('play');
                    music_3.play();
                }
                if (music_3.mute) {
                    music_3.setMute(false);
                } else {
                    music_3.setMute(true);
                }
            });
        //Game nav
        reloadBtn = this.add.image(config.width-40, 27, "reload").setScale(0.07); 
        reloadBtn.setInteractive().on("pointerdown", (pointer, localX, localY, event) => {
            restart(this.scene);
        })

        cookies_3 = this.physics.add.staticGroup();
        cookies_3.createMultiple([
            {key: "cookieH", setXY:{x: 650, y: 200}, setScale: {x: 0.35, y: 0.4}}, //cookie1
            {key: "cookieH", setXY:{x: 800, y: 250}, setScale: {x: 0.35, y: 0.4}}, //cookie2
            {key: "cookieH", setXY:{x: 750, y: 445}, setScale: {x: 0.35, y: 0.4}}, //cookie3
            {key: "cookie", setXY:{x: 625, y: 573}, setScale: {x: 0.5, y: 0.5}} //cookie4
        ]);
        cookies_3.children.iterate((child) => {
            child.refreshBody();
            // child.setImmovable();
        });

        fires_3 = this.physics.add.staticGroup();
        fires_3.createMultiple([
            {key: "fire", setXY:{x: 445, y: 138}, setScale: {x: 0.32, y: -0.25}}, //fire1
            {key: "fire", setXY:{x: 410, y: 543}, setScale: {x: 0.3, y: 0.3}}, //fire2
            {key: "fire", setXY:{x: 800, y: 139}, setScale: {x: 0.3, y: -0.25}}, //fire3
            {key: "fire", setXY:{x: 575, y: 578}, setScale: {x: 0.3, y: 0.2}}, //fire4_1
            {key: "fire", setXY:{x: 638, y: 578}, setScale: {x: 0.3, y: 0.2}}, //fire4_2
            {key: "fire", setXY:{x: 701, y: 578}, setScale: {x: 0.3, y: 0.2}}, //fire4_3
            {key: "fire", setXY:{x: 764, y: 578}, setScale: {x: 0.3, y: 0.2}} //fire4_4
        ]);
        fires_3.children.iterate((child) => {
            child.refreshBody();
        });
        //Random time to show up the fire
        this.time.addEvent({
            loop: true,
            delay: Math.random(),
            // callback: showfires_3,
            callbackScope: this
        });

        var floorSpeedY = 300; 
        moveFLoor_3 = this.physics.add.sprite(350, 170, "floor").setScale(0.1, 0.2);
        moveFLoor_3.refreshBody();
        moveFLoor_3.setImmovable();
        moveFLoor_3.setBounce(0);
        moveFLoor_3.scene.tweens.add({
            targets: moveFLoor_3,
            velocityY: floorSpeedY, 
            ease: 'Linear', //動畫使用線性變化 "Cubic", "Elastic", "Bounce", "Back", "Quad.easeIn"
            duration: 1000,
            repeat: -1, //-1 -> infinity
            onUpdate: () => {
                if(moveFLoor_3.y >= 300) {
                    moveFLoor_3.setVelocityY(-1*floorSpeedY);
                }
            },
        });

        //Portals
        port1_3 = this.physics.add.staticGroup({
            createCallback: function(port){
                //Add object name
                port.setName(this.getLength());
            }
        });
        port1_3.createMultiple([
            {key: "port", setXY:{x: 250, y: 600}, setScale: {x: 0.3, y: 0.3}}, //portal1_in
            {key: "port", setXY:{x: 550, y: 250}, setScale: {x: 0.3, y: 0.3}} //portal1_out
        ]);
        port1_3.children.iterate((child) => {
            child.refreshBody();
            child.body.setSize(child.width * 0.15, child.height * 0.15);
        });

        port2_3 = this.physics.add.staticGroup({
            createCallback: function(port){
                //Add object name
                port.setName(this.getLength());
            }
        });
        port2_3.createMultiple([
            {key: "port", setXY:{x: 950, y: 100}, setScale: {x: 0.3, y: 0.3}}, //portal2_up
            {key: "port", setXY:{x: 900, y: 455}, setScale: {x: 0.3, y: 0.3}} //portal2_down
        ]);
        port2_3.children.iterate((child) => {
            child.refreshBody();
            child.body.setSize(child.width * 0.15, child.height * 0.15);
        });

        snows_3 = this.physics.add.staticGroup({
            createCallback: function(snow){
                //Add object name
                snow.setName(this.getLength());
            }
        });
        snows_3.createMultiple([
            {key: "snow", setXY:{x: 445, y: 100}, setScale: {x: 0.12, y: 0.12}}, //snow1
            {key: "snow", setXY:{x: 645, y: 100}, setScale: {x: 0.12, y: 0.12}}, //snow2
            {key: "snow", setXY:{x: 625, y: 468}, setScale: {x: 0.12, y: 0.12}} //snow3
        ]);
        snows_3.children.iterate((child) => {
            child.refreshBody();
        });

        //player_3
        player_3 = this.physics.add.sprite(100, 580, 'ice').setScale(0.25);
        player_3.body.setSize(player_3.width*0.6, player_3.height-25);
        player_3.setBounce(0.2);
        player_3.setCollideWorldBounds(true);
        
        //player_3 anims
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
        
        //life_3 text
        let lifeStyle =  {font: "25px VT323", fill: "#fff"};
        lifeText_3 = this.add.text(
            player_3.body.x+(player_3.body.width/2-this.width/2), //Horizontal center above player_3
            player_3.body.y-30, //above the player_3
            `${life_3}%`,
            lifeStyle);
        
        //Game reminder
        msg_bg_3 =  this.add.rectangle(0, 0, 5000, 2000, 0x222222);
        msg_bg_3.alpha = 0.7;
        win_msg_3 = this.add.image(config.width/2, config.height/2-60, "win_msg_3").setScale(0.5);
        lose_msg_3 = this.add.image(config.width/2, config.height/2-100, "lose_msg_3").setScale(0.5);
        homeBtn_3 = this.add.text(config.width/2+30, config.height/2+60, "回主頁", {
            fontSize: "25px",
            color: "white",
            stroke: "red",
            padding: 10,
            backgroundColor: "black"
        });
        homeBtn_3.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.scene.start("home");
        })
        restartBtn_3 = this.add.text(config.width/2-150, config.height/2+60, "再玩一次", {
            fontSize: "25px",
            color: "white",
            stroke: "red",
            padding: 10,
            backgroundColor: "black"
        });
        restartBtn_3.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            restart(this.scene);
            // music_3.play();
        })
        msg_bg_3.visible = false;
        win_msg_3.visible = false;
        lose_msg_3.visible = false;
        homeBtn_3.visible = false;
        restartBtn_3.visible = false;


        //player_3 and platform's collider
        this.physics.add.collider(player_3, platforms_3, (res)=>{
            //檢測是否碰到平台頂端
            // if(res.body.touching.up) console.log("hit ceil");
        });
        //player_3 and cookie's collider
        this.physics.add.collider(player_3, cookies_3, (player_3, cookie)=>{
            cookie.disableBody(true, false);
            //Cookies anim
            cookie.scene.tweens.add({
                targets: cookie,
                y: config.height, //預計降落到地面 y:{start:50, from: 0, to: 600}
                ease: 'Linear', //動畫使用線性變化 "Cubic", "Elastic", "Bounce", "Back", "Quad.easeIn"
                duration: 800,
                repeat: 0, //-1 -> infinity
                yoyo: false, //動畫完成後，回到初始狀態
                onComplete: () => {cookie.destroy();} //完成動畫執行事件
            });
            //檢測是否碰到平台頂端
            // if(res.body.touching.up) console.log("hit ceil");
        });
        //player_3 and portal1's collider
        this.physics.add.collider(player_3, port1_3, (player_3, port)=>{
            if(port.name == "1"){
                var porOut = port1_3.getChildren().find(v => v.name == "2");
                player_3.setPosition(porOut.x, porOut.y+20);
                port.scene.tweens.add({
                    targets: port,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    ease: "Linear",
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => {port.destroy();}
                });
                porOut.scene.tweens.add({
                    targets: porOut,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    ease: "Linear",
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => {porOut.destroy();}
                });
            }
        });
        //Add player_3 and portal2 collider
        this.physics.add.collider(player_3, port2_3, (player_3, port)=>{
            if(port.name == "1"){
                var porOut = port2_3.getChildren().find(v => v.name == "2");
                player_3.setPosition(porOut.x, porOut.y+70);
            }
            else{
                var porOut = port2_3.getChildren().find(v => v.name == "1");
                player_3.setPosition(porOut.x, porOut.y+70);
            }
        });
        
        //Add player_3 and move floor collider
        this.physics.add.collider(player_3, moveFLoor_3, (player_3) => {
            if(snows_3.getChildren().find(v => v.name == "1") && moveFLoor_3.body.touching.up){
                var snow1 = snows_3.getChildren().find(v => v.name == "1");
                snow1.setPosition(55, 450);
                snow1.refreshBody();
            }
        });
        
        //Add player_3 and snows_3 collider
        this.physics.add.overlap(player_3, snows_3, (player_3, snow) =>{
            snow.destroy();
            collSnow_3++;
        }, null, this);

        //Add player_3 and fires_3 overlap
        this.physics.add.overlap(player_3, fires_3, () => {
            //Decrease the life_3 value
            life_3 = (life_3 - 0.4).toFixed(2);
            //Set life_3 value to the text elm
            lifeText_3.setText(life_3+"%");
            audioFire_3.play();

            //Whether game over
            if(life_3 <= 0){
                gameOver = true;
            }
        }, null, this);
    },
    update: function() {
        //Reposition the lifeText_3
        lifeText_3.setPosition(player_3.body.x+(player_3.body.width/2-lifeText_3.width/2), player_3.body.y-30);
        //player_3's move
        if (cursors.left.isDown) {
            player_3.setVelocityX(-180);
            player_3.anims.play('left', true);
            audioMove_3.play();
        }
        else if (cursors.right.isDown) {
            player_3.setVelocityX(180);
            player_3.anims.play('right', true);
            audioMove_3.play();
        }
        else {
            player_3.setVelocityX(0);
            player_3.anims.play('turn');
        }
        if (cursors.up.isDown && player_3.body.touching.down) {
            player_3.setVelocityY(-375);
            audioJump_3.play();
        }
        //Game win anim
        if(collSnow_3 == 3){
            this.physics.add.collider(player_3, exit_3, (player_3, exit_3) =>{
                console.log("pass");
                player_3.scene.tweens.add({
                    targets: player_3,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    ease: "Linear",
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                });
                lifeText_3.destroy();

                msg_bg_3.visible = true;
                win_msg_3.visible = true;
                homeBtn_3.visible = true;
                restartBtn_3.visible = true;
            });
            exit_3.anims.play('exit_sprite_open',true);
        } 
        else{
            exit_3.anims.play('exit_sprite_close',true);
        }
        if(gameOver == true){
            msg_bg_3.visible = true;
            lose_msg_3.visible = true;
            homeBtn_3.visible = true;
            restartBtn_3.visible = true;
            gameOver = false;
        }
    }
});
function collectSnow(player_3, snow){
    snow.destroy();
    collSnow_3++;
}
function resetPlayerPos_3(){
    player_3.setPosition(100, 580);
}
function restart(scene){
    resetPlayerPos_3();
    life_3 = 100;
    collSnow_3 = 0;
    gameOver = false;
    scene.restart();
    music_3.play();
}