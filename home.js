let starttext;
let Choosealeveltext;
let introducetext;

var home = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "home" });
    },
    init: function() {},
    preload: function() {
        this.load.image('background', './assets/background1.jpg')
        this.load.image('logo', './assets/logo.png')
        this.load.image('meltingI', './assets/meltingIce.png')
    },
    create: function() {
        this.add.image(621, 350, 'background');
        startText = this.add.text(config.width / 2 - 100, config.height / 2 + 150, '開始遊戲', {
            fontSize: '50px 微軟正黑體',
            color: 'white',
            stroke: 'red',
            border_radious: '10',
            padding: 10,
            backgroundColor: "#155199"
        });
        startText.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.scene.start("menu");
        })
        this.add.image(620, 350, 'logo').setScale(0.25,0.25);
        this.add.image(630, 160, 'meltingI').setScale(0.8,0.8);
    },
    update: function() {}
});