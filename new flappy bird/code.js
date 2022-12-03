const barriersVelocity = 1;
const gravity = 1;
const clickImpulse = 0.4;
const birdDensity = 10;
const delayBetweenBars = 4000;
let scores = 0;
let gameStarted = false;
let bird;
let myBarInput = {
    x:6,
    y:2.3,
    name: "ground",
    shape: "square",
    height: 2,
    width: 0.15,
    color: 'red',
    fixedRotation:true,
}
let myConv = document.getElementById('game');
let world = boxbox.createWorld(myConv, {
    gravity: {x: 0, y:gravity},
    scale: 60
});

document.querySelector('body').addEventListener('keydown',()=>{
    if(gameStarted == false){
        document.getElementById('notif').classList.add('hidden');
        gameStarted = true;
        let repeat = setInterval(()=>{
            scores += 20;
            document.getElementById('score-id').innerText = 'score = '+scores;
            let w = (Math.random()*0.2)+0.2//barrier width set random number between (0.2 , 0.4)
            myBarInput.width = w;
            let y = (Math.random()*1.5)-1;//(-1, 0.5)
            
            //barrier top
            myBarInput.y = y;//y in barrier 1 : (-1, 0.5)
            let Barrier1 = world.createEntity(myBarInput);
            Barrier1.setVelocity( 'V1', barriersVelocity, -90 );
            Barrier1.onStartContact(()=>{//شروع برخورد
                Barrier1.destroy();
            })
        
            //barrier down
            myBarInput.y = y+3;//y in barrier 2 : (2, 3.5)
            let Barrier2 = world.createEntity(myBarInput);
            Barrier2.setVelocity( 'V1', barriersVelocity, -90 );
            Barrier2.onStartContact(()=>{//شروع برخورد
                Barrier2.destroy();
            })
        },delayBetweenBars)

        bird = world.createEntity({
            image: './img/bird.png' ,
            name: 'bird',
            shape: "square",
            height: .2,
            width: 0.4,
            x:1,
            y:1,
            density: birdDensity
        })
        bird.imageStretchToFit(true)
        bird.onKeydown((e)=>{
            if(e.key === 'w'){
                bird.applyImpulse( clickImpulse, 0 )
            }
        })
        bird.onStartContact(()=>{//game failer
            document.getElementById('notif').innerText = 'game failed - your score is: '+scores;
            document.getElementById('notif').classList.remove('hidden');
            clearInterval(repeat);
            bird.applyImpulse(2,180);
        })
    }
})



let ground = world.createEntity({
    x:1,
    y:10,//at least 2.5
    name: "ground",
    shape: "square",
    height: 0.01,
    width: 20,
    color: 'black',
    type: 'static',
})

let wall = world.createEntity({
    x:-1,
    y:0,
    name: "ground",
    shape: "square",
    height: 5,
    width: 0.15,
    color: 'black',
    fixedRotation:true,
    type: 'static',
})



