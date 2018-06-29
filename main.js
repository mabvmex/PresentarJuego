//1. CANVAS //
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//2. CONSTANTES
var interval;
var cuadros;
var gameover = true;
var tiempo1 = 0;
var enemigosArreglo = [];
var balasHuman = []; 
var imagenes = {
    human: ('./images/characters/Humanity/Human-fighter_3.png'),   
    alien: ('./images/characters/Covenant/Reverse-Alien-spacecraft_3.png'),
    alienEnemigo: ('./images/characters/Covenant/Alien-spacecraft_3.png'), // -> * REVISAR *
    humanfireball: ('./images/characters/Humanity/Human-fireball.png'),
    fondo: ('./images/bg/Outer Space.jpg')
};
    
//3. CLASES - PUEDO AHORRAR CÓDIGO INSTANCIADO PERSONAJES, BALAS Y DISPAROS. -> * REVISAR *
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
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height); // Dibujate en 'X' después de ti misma con la misma altura y misma longitud
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
} //Termina constructor de Bala

class Human {
    constructor(){
        this.vidas = 50;
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

    class Enemigos{
        constructor(x=800, y, img=img2){ 
          this.x = x;
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
          this.x-=2;  // Los obstáculos se mueven hacia el origen de X
          ctx.drawImage(this.image, this.x,this.y, this.width, this.height); 
        }
      } //Termina la clase Enemigos

//4. INSTANCIAS
var mapa = new Mapa();
var human = new Human();
var alien = new Alien();


//5. FUNCIONES PRINCIPALES
function update(){
    if (gameover == true){
        cuadros++
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        mapa.draw();
        human.draw();
        alien.draw();
        drawDisparo();
        crearEnemigos(); // Push tiene que estar antes de lo que dibuja.
        drawEnemigos();  // dibuja el arreglo.
        revisaColision();
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
//Score del Jugador
function contadorTiempo1(){
    if(cuadros%25 == 0){
        tiempo1 += 1;
    }
}

// Restar vidas del jugar
function otroLado (){
    enemigosArreglo.forEach(function(elemento){
        if(elemento.x < 0 ){
            human.vidas-= 1;
            enemigosArreglo.splice(elemento,1);
        }
    });
}

// Resultado del marcador // Multiplayer -> * REVISAR *
function marcadorHumano(){
        ctx.font = '15px Retro';
        ctx.fillStyle = 'white';
        ctx.fillText( "P O W E R :  " + human.vidas, 20, 35);
        ctx.fillText("Y O U R  S C O R E  " + tiempo1, 380, 35);
        ctx.fillText("P L A Y E R   1", /* player, */ 880, 35); //
        if (human.vidas < 0){            
            ctx.font = '50px Retro';
            ctx.fillStyle = 'red';
            ctx.fillText("G A M E  O V E R", 250, 241);
            $('#record').text("Score Player = " + tiempo1 + " points");
            gameover=false;
        }
}

// Crear enemigos
 //Esta función agrega al arreglo, pero no crea nada.
function crearEnemigos() {
    if(cuadros % 10 === 0) {
        var posx = (Math.random() * (canvas.width/2)+512);
        var posy =  ((Math.random() * (canvas.height-70)+30)); 
        var enemigo = new Enemigos(posx, posy, imagenes.alienEnemigo);
        enemigosArreglo.push(enemigo); 
    }; 
} 

// Dibuja los elementos del arreglo 'enemigosArreglo'
function drawEnemigos (){
    for (var i=0; i < enemigosArreglo.length; i++){
        enemigosArreglo[i].draw();
    }
}
 
// COLISIONES -> basado en FlappyBliss
function revisaColision(){
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
//Crea el disparo :P <- Instanciar de bala, bala reusable!
function crearDisparo(){
    var humanfireball = new Bala(human);
    balasHuman.push(humanfireball);  
    
}
function drawDisparo(){
    balasHuman.forEach(function(humanfireball){
        humanfireball.draw();
    });
}

//7. LISTENERS
$('#start-button').click(function(){ start(); });
$('#reset-button').click(function(){ location.reload(); }); // Refresca la página

addEventListener('keydown', function (h){
    switch(h.keyCode) {
        case 38:                                                    // Controlar el alcance en el canvas del personaje.
            if ((human.y - (human.height/2 + 10))  < 0) return;     // Si la posición en 'Y' de 'humano' menos la mitad altura propia de 'humano' + 10 pixeles en 'Y
                human.y -=30;                                       // es MENOR que CERO, entonces ya no avances hacia arriba y regresa cada 30 pixeles.
                document.getElementById('ost').play();
            break;
        case 40:
            if (human.y + human.height/2 + 50> (canvas.height)) return;
                human.y += 30;
                document.getElementById('ost').play();
            break;
        case 88:
            crearDisparo();
            document.getElementById('plasma1').play();
            break;
    }
 //      * KEY CODE * | SpaceBar: 32 | KeyW: 87 | KeyS: 83 | KeyL: 76 | keyF: 70 | keyX: 88 | ArrowDown: 40 | ArrowUP: 38 
});
 

// Miguel Angel Barrera Villeda. 29 de Junio de 2018. IronHack, Módulo 1 - El videoJuego Javascript.