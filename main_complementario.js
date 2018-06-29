
/*   * SE PUEDE AHORRAR CODIGO INSTANCIADO PERSONAJES Y BALAS. * 
class Character {
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = new Image;
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
        }
}

class Human extends Character{
    constructor(){
        super (x,y,img,draw);
        this.bala = [];
    }
}

class Alien extends Character{
    constructor(){
        super (x,y,img,draw);
        this.bala = [];
    }
}
*/
        

/* 
//2. CONSTANTES
    // var balasAlien = [];  //2. CONSTANTES // Multiplayer -> * REVISAR *
    // humanEnemigo: ('./images/Characters/Humanity/Human-fighter_2.png'), //2. CONSTANTES // Multiplayer -> * REVISAR *
    // alienfireball: ('./images/characters/Covenant/Alien-fireball.png'), //2. CONSTANTES // Multiplayer -> * REVISAR *
*/

/*
 //3. CLASES // Multiplayer -> * REVISAR *
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
*/

//4. INSTANCIAS
//var alienfireball = new AlienFireball();
//var humanfireball = new HumanFireball();

//5.FUNCIONES PRINCIPALES
//drawDisparoAlien();

//6. 
/*
 *  *  * ALIEN SIDE  *  *  *
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
*/


/*   * Manejo de Audio *
var sonidos = {
    ost: ('./sounds/koc.mp3'),
}
var sound = new Audio();
    sound.src = sonidos.ost;
*/


/*   * ACCIONES PARA ALIEN SIDE  *
        case 38:
        document.getElementById('ost').play();
            if (alien.y - (alien.height/2 + 10)  < 0) return;                   // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            alien.y -=30;                                                       // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 40:
            if (alien.y + alien.height/2 + 50> (canvas.height)) return;
            alien.y += 30;
            break;
        case 76:
        crearDisparoAlien();
        document.getElementById('plasma2').play();
            break;
        }
    });
*/