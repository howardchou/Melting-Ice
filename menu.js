let mL1, mL2, mL3;
let music;
var menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "menu" });
    },
    init: function() {},
    preload: function() {
        this.load.image('background', './assets/background1.jpg');
        this.load.image('level1', './assets/level1.png');
        this.load.image('level2', './assets/level2.png');
        this.load.image('level3', './assets/level3.png');

        this.load.audio('bgMusic', './assets/music/background.mp3');
    },
    create: function() {
        music = this.sound.add('bgMusic', {
            volumn: 1,
            loop: true
        });
        this.add.image(621, 350, 'background');
        mL1 = this.add.image(225, 350, 'level1').setScale(0.25,0.25)
        .setInteractive()
        .on('pointerdown', (pointer, localX, localY, event) =>{
            music.play();
            this.scene.start("L1");
        });

        mL2 = this.add.image(621, 350, 'level2').setScale(0.25,0.25)
        .setInteractive()
        .on('pointerdown', (pointer, localX, localY, event) =>{
            music.play();
            this.scene.start("L2");
        });

        mL3 = this.add.image(1020, 350, 'level3').setScale(0.25,0.25)
        .setInteractive()
        .on('pointerdown', (pointer, localX, localY, event) =>{
            music.play();
            this.scene.start("L3");
        });
    },
    update: function() {}
});
