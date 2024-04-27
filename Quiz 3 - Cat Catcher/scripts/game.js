let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 650,

    physics: {
        default: 'arcade',
        arcade: {
            debug:false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initializes the Game
let game = new Phaser.Game(config);

// Variables
let player, goal, cursors, textScore, score, isEnding = false;

// Preload Assets
function preload() {
    console.log("Preloading assets...");
    this.load.image("background", "./assets/images/background.png");
    this.load.image("sweetpiano", "./assets/images/mysweetpiano.png");
    this.load.image("gift", "./assets/images/gift.png");
    this.load.image("ending", "./assets/images/giftending.png");
    this.load.audio('theme', './assets/audio/bgm.mp3');
}

function create() {
    console.log("Creating game...");
    this.add.image(0, 0, "background").setOrigin(0,0);

    // Background music
    const music = this.sound.add('theme');
    music.play();

    player = this.physics.add.sprite(160, 450, "sweetpiano");
    player.setCollideWorldBounds(true);

    goal = this.physics.add.sprite(850, 550, "gift");
    goal.setSize(50, 50);

    score = 0;
    textScore = this.add.text(50, 50, "Score: " + score.toString(), {
        fontFamily: 'Overmuch',
        fontSize: '50px',
        fill: '#ffffff'
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (!isEnding) {
        // Player movement
        if (cursors.left.isDown) {
            player.x -= 5; 
            player.flipX = true; 
        } 
        else if (cursors.right.isDown) {
            player.x += 5; 
            player.flipX = false;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330); 
        }
    }

    // Winning condition
    this.physics.add.overlap(player, goal, winGame);
}

function winGame () {
    if (!isEnding) {
        isEnding = true;
        score += 100;
        
        textScore.setText("Score: " + score);
        goal.disableBody(true, true);
        alert("HAPPY BIRTHDAY MY SWEET PIANO!");
        player.setTexture("ending");

        // The player returns to the default standing position of my sweet piano
        setTimeout(() => {
            player.setTexture("sweetpiano");
            isEnding = false;
        }, 3000);
    }
}
