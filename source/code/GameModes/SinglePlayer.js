import {vec2} from "p2"
import Keyboard from "keymaster"

export class SinglePlayer
{
    constructor(game)
    {
        this.game = game;
        this.speed = 4;
        this.game.startGame();
    }

    update(deltaTime)
    {
        this.updatePlayer(deltaTime);
        this.updateOpponent(deltaTime);
    }

    updatePlayer(deltaTime)
    {
        const playerRacquet = this.game.leftRacquet;
        
        const upKey = Keyboard.isPressed("W"); 
        const downKey = Keyboard.isPressed("S"); 
    
        playerRacquet.position[1] -= this.speed * deltaTime * upKey; 
        playerRacquet.position[1] += this.speed * deltaTime * downKey; 
        playerRacquet.position[1]  = Math.clamp(playerRacquet.position[1], 25, 295);
    }

    updateOpponent(deltaTime)
    {
        const opponentRacquet = this.game.rightRacquet;
        const ball = this.game.ball;
        
        let upKey = 0;
        let downKey = 0;

        if (Math.abs(opponentRacquet.position[1] - ball.position[1]) >= this.speed) {
            upKey = opponentRacquet.position[1] > ball.position[1];
            downKey = opponentRacquet.position[1] < ball.position[1];
        }
    
        opponentRacquet.position[1] -= this.speed * deltaTime * upKey; 
        opponentRacquet.position[1] += this.speed * deltaTime * downKey; 
        opponentRacquet.position[1]  = Math.clamp(opponentRacquet.position[1], 25, 295);
    }
}