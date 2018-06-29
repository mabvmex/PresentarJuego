//1. CANVAS //
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//2. CONSTANTES
var interval;
var cuadros;
var enemigosArreglo = [];
var balasHuman = []; 
var balasAlien = [];
//var paraBorrar = false;
var gameover = true;
var tiempo1 = 0;
var imagenes = {
    human: ('./images/characters/Humanity/Human-fighter_3.png'),   
    humanEnemigo: ('./images/Characters/Humanity/Human-fighter_2.png'),   
    alien: ('./images/characters/Covenant/Alien-spacecraft_3.png'),
    alienEnemigo: ('./images/characters/Covenant/Alien-spacecraft_3.png'),
    humanfireball: ('./images/characters/Humanity/Human-fireball.png'),
    alienfireball: ('./images/characters/Covenant/Alien-fireball.png'),
    fondo: ('./images/bg/Outer Space.jpg')
};
    
//3. CLASES
class Mapa {
    constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = imagenes.fondo;
    this.image.onload = function(){
        this.draw();
    }.bind(this);
}
    draw(){
        this.x-=3; // Velocidad de desplazamiento hacia el origen de las 'X' de la imagen de fondo; (se regresa 'N'px en cada refresco)
        if(this.x < -this.width) this.x=0;  // Si la posición del fondo en 'X' es menor que su PROPIA LONGITUD, coloca la imagen en 'X' = 0
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height); //Dibujate en 'X' después de ti misma con la misma altura y misma longitud
    }
} //Termina la clase MAPA

class Bala {
    constructor(character){
        this.y = character.y;
        this.width = 50;
        this.height = 50;
        this.x = character.x + this.width;
        this.vX = 20;
        this.image = new Image;
        this.image.src = imagenes.humanfireball;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
}
draw(){
    this.x += this.vX;
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
}
}//Termina constructor de Bala

class BalaAlien {
    constructor(character){
        this.y = character.y;
        this.width = 50;
        this.height = 50;
        this.x = character.x - this.width;
        this.vX = -20;
        this.image = new Image;
        this.image.src = imagenes.alienfireball;
}
draw(){
    this.x += this.vX;
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
}
}//Termina constructor de BalaAlien


class Human {
    constructor(){
        this.vidas = 20;//100;
        this.width = 60;
        this.height = 60;
        this.x = 10;
        this.y = ((canvas.height/2) - (this.height/2)); // Posición inicial en el centro del mapa.
        this.image = new Image();
        this.image.src = imagenes.human;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
    draw(){
        this.x, this.y;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

} //Termina la clase Human

    class Alien {
        constructor(){
            this.vidas = 100;
            this.width = 60;
            this.height = 60;
            this.x = canvas.width-100;
            this.y = ((canvas.height/2)-(this.height/2));
            this.image = new Image();
            this.image.src = imagenes.alien;
            this.image.onload = function(){
                this.draw();
            }.bind(this)
        }
        draw(){
            this.x, this.y;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    } //Termina la clase Alien

//var img2 = "./images/characters/SpaceInvader.png"
    class Enemigos{
        constructor(x=800, y, img=img2){ 
          this.x = x
          this.y = y;
          this.width = 40;
          this.height = 40; 
          this.image = new Image();
          this.image.src = img;
          this.image.onload = function(){
            this.draw();
          }.bind(this);
        }
          draw() {
          this.x-=2;  // ELos obstáculos se mueven hacia el origen de X (x-2)
          ctx.drawImage(this.image, this.x,this.y, this.width, this.height);
        }
      } //Termina la clase Enemigos


//4. INSTANCIAS
var mapa = new Mapa();
var human = new Human();
var alien = new Alien();
//var alienfireball = new AlienFireball();
//var humanfireball = new HumanFireball();


//5. FUNCIONES PRINCIPALES
function update(){
    if (gameover==true){
        cuadros++
        //if(cuadros < 30 )cuadros++;
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        mapa.draw();
        human.draw();
        alien.draw();
        drawDisparo();
        drawDisparoAlien();
        crearEnemigos(); //Push tiene que etar antes de lo que dibuja.
        drawEnemigos(); // dibuja el arreglo.
        checkColision();
        otroLado ();
        marcadorHumano();
        contadorTiempo1();
    }
}

function start(){
    cuadros = 0;
    interval = setInterval(update, 1000/60);        
}

//6. FUNCIONES AUXILIARESv

function contadorTiempo1(){
    if(cuadros%25 == 0){
        tiempo1 += 1;
    }
}

// RESTAR VIDAS DE PLAYER

function otroLado (){
    enemigosArreglo.forEach(function(elemento, index){
        console.log(elemento.x)
        if(elemento.x < 0 ){
            console.log("entramos al if");
            human.vidas-= 0.5;
            enemigosArreglo.splice(elemento,1);
        }
        console.log(human.vidas);
    });
}

function marcadorHumano(){
//console.human.vidas 
        ctx.font = '50px Paytone One';
        ctx.fillStyle = 'red';
        ctx.fillText(human.vidas, 20, 100);
        if (human.vidas < 0){
            
            ctx.fillText("GAME OVER "+tiempo1, 350, 350);
            ctx.font = '50px Paytone One';
            ctx.fillStyle = 'red';
            $('#div').text(tiempo1);
            
           
            gameover=false;
            
        }
}

//CREAR ENEMIGOS
function crearEnemigos() { //Esta función mete al arreglo... pero no crea.
    if(cuadros % 10 === 0) {
        var posy =  (Math.random() * canvas.height);  // Math.floor((Math.random() * 10)+10);
        var posx = (Math.random() * (canvas.width/2)+512);   //Math.floor((Math.random() * 10)+10);
        var enemigo = new Enemigos(posx, posy,imagenes.alienEnemigo);
        // console.log(posx)
        // console.log(posy)
        enemigosArreglo.push(enemigo); 
        

    }; //El diferente genera solo cuando sea difrente de 100, sin el , solo una vez
    //var x = Math.floor((Math.random() * 50)+20);
} 



function drawEnemigos (){
    for (var i=0; i < enemigosArreglo.length; i++){
        enemigosArreglo[i].draw();
    }
}
 
//SISTEMA DE COLISIONES

function checkColision(){
    enemigosArreglo.forEach(function(nave,index){
    for (var i=0; i < balasHuman.length; i++){
            if( nave.x < balasHuman[i].x + balasHuman[i].width && 
                nave.x + nave.width > balasHuman[i].x && 
                nave.y < balasHuman[i].y + balasHuman[i].height && 
                nave.y + nave.height > balasHuman[i].y)
                    { 
                        balasHuman.splice(i,1);
                        enemigosArreglo.splice(index,1);
                    }
            }
    });
}

// funcion choque(indiceBala, indiceNave){ 
//     //paraBorrar=false
//}
// });
//}
function crearDisparo(){
    var humanfireball = new Bala(human);
    balasHuman.push(humanfireball);  
    
}
function drawDisparo(){
    balasHuman.forEach(function(humanfireball){
        humanfireball.draw();
    });
}
//  *  *  * ALIEN SIDE  *  *  *
function crearDisparoAlien(){
    var alienfireball = new BalaAlien(alien);
    //alien.balasAlien.push(alienfireball);   
    balasAlien.push(alienfireball);   
}
function drawDisparoAlien(){
        balasAlien.forEach(function(alienfireball){
        alienfireball.draw();
    });
}

//7. LISTENERS
$('#start-button').click(function(){
    start();
});

$('#reset-button').click(function(){
     location.reload(); // Refresca la página
})

addEventListener('keydown', function (h){
    switch(h.keyCode) {
        case 87:                                                                //ArrowUp
            if (human.y - (human.height/2 + 10)  < 0) return;                   // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            human.y -=30;      
            document.getElementById('ost').play();                                                 // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 83:                                                                //ArrowDown
            if (human.y + human.height/2 + 50> (canvas.height)) return;
            human.y += 30;
            break;
        case 70:                                                                //KeyL
            crearDisparo();
            document.getElementById('plasma1').play();
            break;

//  *  *  * ACCIONES PARA ALIEN SIDE  *  *  *
        case 38:                                                                // KeyW -> UP
        document.getElementById('ost').play();
            if (alien.y - (alien.height/2 + 10)  < 0) return;                   // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            alien.y -=30;                                                       // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            // break;
            // if (alien.y - alien.height < 0) return;                          // Si la posición en 'Y' de 'alien' menos la altura propia de 'alien'    
            //alien.y -= 30;                                                    // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 40:                                                                // KeyS -> Down
            if (alien.y + alien.height/2 + 50> (canvas.height)) return;
            alien.y += 30;
            break;
        case 76:                                                                // KeyF
        crearDisparoAlien();
        document.getElementById('plasma2').play();
            break;
        }
    });


/*
 
multiplayer
pantalla de seleccion
Arrelglasr clases
*/




/* 
  * * * * * SE PUEDE AHORRAR CODIGO INSTANCIADO PERSONAJES Y BALAS. * * * * *
*/
// class Character {
//     constructor(x,y,img){
//         this.x = x;
//         this.y = y;
//         this.width = 50;
//         this.height = 50;
//         this.image = new Image;
//         this.image.src = img;
//         this.image.onload = function(){
//             this.draw();
//         }.bind(this)
// }
// draw(){
//     ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
// }
// }

// class Human extends Character{
//     constructor(){
//         super (x,y,img,draw);
//         this.bala = [];
//     }
// }

// class Alien extends Character{
//     constructor(){
//         super (x,y,img,draw);
//         this.bala = [];
//     }
// }

// var sonidos = {
//     ost: ('./sounds/koc.mp3'),
// }
// var sound = new Audio();
//     sound.src = sonidos.ost;
