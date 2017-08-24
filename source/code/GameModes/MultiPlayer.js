import {Network} from "Framework/Network"
import Keyboard from "keymaster"

export class MultiPlayer
{
    constructor(game, channel)
    {
        this.speed = 4;
        this.game = game;
        this.channel = channel;

        if (this.channel.isServer)
        {
            this.localPlayerRacquet = this.game.leftRacquet;
            this.remotePlayerRacquet = this.game.rightRacquet;
            this.channel.on("data", (data) => {
                this.remotePlayerRacquet.position[1] = data.playerPosition;
            });
            this.game.startGame();
        }
        else
        {
            this.localPlayerRacquet = this.game.rightRacquet;
            this.remotePlayerRacquet = this.game.leftRacquet;
            this.channel.on("data", (data) => {
                this.remotePlayerRacquet.position[1] = data.playerPosition;
                this.game.ball.position = data.ballPosition;
                this.game.ball.velocity = data.ballVelocity;
                this.game.leftPlayerScore = data.leftScore;
                this.game.rightPlayerScore = data.rightScore;
            }); 
        }
    }

    update(deltaTime)
    {
        this.updateLocalPlayer(deltaTime);
        if (this.channel.isServer)
        {
            this.channel.send({
                "playerPosition": this.localPlayerRacquet.position[1],
                "ballPosition": this.game.ball.position,
                "ballVelocity": this.game.ball.velocity,
                "leftScore": this.game.leftPlayerScore,
                "rightScore": this.game.rightPlayerScore
            });
        }
        else
        {
            this.channel.send({
                "playerPosition": this.localPlayerRacquet.position[1]
            });
        }
    }

    updateLocalPlayer(deltaTime)
    {
        const upKey = Keyboard.isPressed("W"); 
        const downKey = Keyboard.isPressed("S"); 
    
        this.localPlayerRacquet.position[1] -= this.speed * deltaTime * upKey; 
        this.localPlayerRacquet.position[1] += this.speed * deltaTime * downKey; 
        this.localPlayerRacquet.position[1]  = Math.clamp(this.localPlayerRacquet.position[1], 25, 295);
    }
}