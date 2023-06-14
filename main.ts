controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.createSong(hex`0078000408020105001c000f0a006400f4010a0000040000000000000000000000000000000002180000000400011b04000800011e100014000122140018000127`), music.PlaybackMode.InBackground)
    Ammo = 10
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Ammo > 0) {
        if (mySprite.vy == 0 && mySprite.vx == 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, 50, 50)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, mySprite.vx, mySprite.vy)
        }
        Ammo += -1
        music.play(music.createSoundEffect(WaveShape.Triangle, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    } else {
        music.play(music.createSong(hex`00c8000408020105001c000f0a006400f4010a0000040000000000000000000000000000000002120000000400012404000800012408000c000124`), music.PlaybackMode.InBackground)
        mySprite.sayText("*click click click", 100, false)
    }
})
let myEnemy: Sprite = null
let enemy_count = 0
let Ammo = 0
let mySprite: Sprite = null
let projectile: Sprite = null
projectile = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, mySprite, 0, 100)
info.setLife(5)
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(img`
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    d 9 9 9 9 9 9 9 9 9 9 9 9 9 9 d 
    d d d f d d f d d d d d d d d d 
    d d d f d d f d d d d d d d d d 
    d d d f d d f d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d f f f d d d d d d d d 
    f f d d d d d d d d d d d f f f 
    f f f f f d d d d d f f f f f f 
    f f f f f f f d d f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
forever(function () {
    pauseUntil(() => enemy_count == 0)
    if (info.score() > 0) {
        for (let index = 0; index < 1; index++) {
            enemy_count += 1
            myEnemy = sprites.create(img`
                f f f f f f f f f f f f f f f f 
                f f f f f f f f f f f f f f f f 
                f f f f f f f f f f f f f f f f 
                f f f 2 f f 2 f f f f f f f f f 
                d f f f 2 2 f f f f f f f f f d 
                d d d 2 d d 2 d d d d d d d d d 
                d d d 2 d d 2 d d d d d d d d d 
                d d d 2 d d 2 d d d d d d d d d 
                d d d d d d d d d d d d d d d d 
                d d d d d d d d 2 d d d d d d d 
                d d d d d 2 2 2 d d d d d d d d 
                f f d d d d d d d d d d d f f f 
                f f f f f d d d d d f f f f f f 
                f f f f f f f d d f f f f f f f 
                f f f f f f f f f f f f f f f f 
                f f f f f f f f f f f f f f f f 
                `, SpriteKind.Enemy)
            myEnemy.setPosition(randint(0, 248), randint(0, 248))
            myEnemy.follow(mySprite, 50)
        }
    } else {
        enemy_count = 1
        myEnemy = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f 2 f f 2 f f f f f f f f f 
            d f f f 2 2 f f f f f f f f f d 
            d d d 2 d d 2 d d d d d d d d d 
            d d d 2 d d 2 d d d d d d d d d 
            d d d 2 d d 2 d d d d d d d d d 
            d d d d d d d d d d d d d d d d 
            d d d d d d d d 2 d d d d d d d 
            d d d d d 2 2 2 d d d d d d d d 
            f f d d d d d d d d d d d f f f 
            f f f f f d d d d d f f f f f f 
            f f f f f f f d d f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.Enemy)
        myEnemy.setPosition(randint(0, 248), randint(0, 248))
        myEnemy.follow(mySprite, 50)
    }
})
forever(function () {
    if (projectile.overlapsWith(myEnemy)) {
        sprites.destroy(myEnemy, effects.disintegrate, 5000)
        enemy_count += -1
        info.changeScoreBy(1)
        sprites.destroy(projectile)
    } else if (mySprite.overlapsWith(myEnemy)) {
        sprites.destroy(myEnemy)
        enemy_count += -1
        info.changeLifeBy(-1)
    }
})
forever(function () {
    info.changeLifeBy(1)
    pause(5000)
})
