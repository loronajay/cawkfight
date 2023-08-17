let isGameOver = false;
let isTie = false;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

const attackSound = document.getElementById('attackSound');
const attackSound2 = document.getElementById('attackSound2');
const hitSound = document.getElementById('hitSound');
const bigDeath = document.getElementById('bigDeath');
const smallDeath = document.getElementById('smallDeath');
const bigJump = document.getElementById('bigJump');
const smallJump = document.getElementById('smallJump');
const bigHurt = document.getElementById('bigHurt');
const smallHurt = document.getElementById('smallHurt');


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
      x: 600,
      y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6,
    image: new Image()
  })

const player = new Fighter({
  position: {
    x: 0,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
       imageSrc: './img/samuraiMack/samuraiMack/Idle.png',
       framesMax: 8 
    },
    run: {
        imageSrc: './img/samuraiMack/samuraiMack/Run.png',
        framesMax: 8
    },
    jump: {
        imageSrc: './img/samuraiMack/samuraiMack/Jump.png',
        framesMax: 2
    },
    fall: {
        imageSrc: './img/samuraiMack/samuraiMack/Fall.png',
        framesMax: 2
    },
    attack1: {
        imageSrc: 'img/samuraiMack/samuraiMack/Attack1.png',
        framesMax: 6
    },
    takeHit: {
        imageSrc: 'img/samuraiMack/samuraiMack/Take Hit.png',
        framesMax: 4
    },
    death: {
        imageSrc: 'img/samuraiMack/samuraiMack/Death.png',
        framesMax: 6
    }
   },
   attackBox: {
    offset: {
      x: 70,
      y: 55,  
    },
    width: 200,
    height: 50
   },
   type: 'player'
})

const enemy = new Fighter({
    position: {
        x: 970,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
      x: 215,
      y: 167
    },
    sprites: {
      idle: {
        imageSrc: './img/kenji/kenji/Idle.png',
        framesMax: 4 
      },
      run: {
        imageSrc: './img/kenji/kenji/Run.png',
        framesMax: 8
      },
      jump: {
        imageSrc: './img/kenji/kenji/Jump.png',
        framesMax: 2
      },
      fall: {
        imageSrc: './img/kenji/kenji/Fall.png',
        framesMax: 2
      },
      attack1: {
        imageSrc: 'img/kenji/kenji/Attack1.png',
        framesMax: 4
      },
      takeHit: {
        imageSrc: 'img/kenji/kenji/Take hit.png',
        framesMax: 3
      },
      death: {
        imageSrc: 'img/kenji/kenji/Death.png',
        framesMax: 7
      }
    },
    attackBox: {
    offset: {
      x: -170,
      y: 55,  
    },
    width: 200,
    height: 50
    },
    type: 'enemy'
})

enemy.draw()

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed:false
    }
}

decreaseTimer()

function playAttackSound() {
  attackSound.currentTime = 0; // Reset the sound to the beginning
  attackSound.play();
}

function playAttackSound2() {
  attackSound2.currentTime = 0; // Reset the sound to the beginning
  attackSound2.play();
}

function playHitSound(volume = 1.0) {
  hitSound.currentTime = 0; // Reset the sound to the beginning
  hitSound.volume = volume;
  hitSound.play();
}

function playBigDeath() {
  bigDeath.currentTime = 0; // Reset the sound to the beginning
  bigDeath.play();
}

function playSmallDeath() {
  smallDeath.currentTime = 0; // Reset the sound to the beginning
  smallDeath.play();
}

function playBigJump() {
  bigJump.currentTime = 0; // Reset the sound to the beginning
  bigJump.play();
}

function playSmallJump() {
  smallJump.currentTime = 0; // Reset the sound to the beginning
  smallJump.play();
}

function playBigHurt() {
  bigHurt.currentTime = 0; // Reset the sound to the beginning
  bigHurt.play();
}

function playSmallHurt() {
  smallHurt.currentTime = 0; // Reset the sound to the beginning
  smallHurt.play();
}

function animate() {
    if (isGameOver && !isTie) {
      return;
    }

    if (isTie) {
      player.switchSprite('idle');
      enemy.switchSprite('idle');
    }

    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4  
        player.switchSprite('run') 
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
        player.switchSprite('run')
    } else {
      player.switchSprite('idle')  
    }

    if (player.velocity.y < 0) {
      player.switchSprite('jump') 
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }


    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4   
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle') 
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump') 
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    /// detect collisions & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && 
        player.framesCurrent === 4
    )   {
        enemy.takeHit()
        player.isAttacking = false

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
      player.isAttacking = false
    }


    // this is where player gets hit
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent === 2
    )   {
        player.takeHit()
        enemy.isAttacking = false
        
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
      }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId })
    }
    
}

animate()

window.addEventListener('keydown', (event) => {
    if (!isGameOver && !isTie && !player.dead && player.health > 0) {

    switch (event.key) {
        case 'd':
          keys.d.pressed = true
          player.lastKey = 'd'
          break
        case 'a':
          keys.a.pressed = true
          player.lastKey = 'a'
          break
        case 'w':
          player.velocity.y = -10
          playBigJump();
          break
        case 's':
          player.attack()
          playBigJump();
          playAttackSound();
          break
    }
}
    if (!isGameOver && !isTie && !enemy.dead && enemy.health > 0) {
      switch(event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          enemy.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          enemy.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          enemy.velocity.y = -10
          playSmallJump();
          break
        case 'ArrowDown':
          enemy.attack()
          playSmallJump();
          playAttackSound2();
          break
    }
}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
          keys.d.pressed = false
          break
        case 'a':
          keys.a.pressed = false
          break
        case 'w':
          keys.w.pressed = false
          break
    }

    switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = false
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = false
          break
        case 'ArrowUp':
          keys.ArrowUp.pressed = false
          break
    }
    console.log(event.key)
})