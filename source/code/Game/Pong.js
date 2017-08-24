import {vec2} from "p2"
import {PhysicsWorld} from "Game/PhysicsWorld"
import {Application} from "Framework/Application"
import {SinglePlayer} from "GameModes/SinglePlayer"
import {MultiPlayer} from "GameModes/MultiPlayer"
import {Dummy} from "GameModes/Dummy"
import {sleep} from "Framework/Sleep"

export class Pong extends Application
{
    constructor(canvas)
    {
        super(canvas);

        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;

        this.startMessage = "";
        this.countdownText = "";

        this.world = new PhysicsWorld();
        this.world.leftTriggerFired = () => {
            this.rightPlayerScore++;
            this.respawnBall(this.rightRacquet);
        }
        this.world.rightTriggerFired = () => {
            this.leftPlayerScore++;
            this.respawnBall(this.leftRacquet);
        }

        this.ball = this.world.createBall(250, 160);
        this.leftRacquet = this.world.createRacquet(12, 160);
        this.rightRacquet = this.world.createRacquet(488, 160);

        this.gameMode = new Dummy();
    }

    startSinglePlayerGame()
    {
        this.gameMode = new SinglePlayer(this);
    }

    startMultiplayerGame(channel)
    {
        this.gameMode = new MultiPlayer(this, channel);
    }

    async startGame()
    {
        this.resetGame();
        
        await sleep(1000);
        this.startMessage = "";
        this.countdownText = "3";
        await sleep(1000);
        this.countdownText = "2";
        await sleep(1000);
        this.countdownText = "1";
        await sleep(1000);
        this.countdownText = "Go!";
        await sleep(1000);
        this.countdownText = "";
        this.respawnBall(this.leftRacquet);
    }

    resetGame()
    {
        this.ball.velocity = [0, 0];
        this.ball.position = [250, 160];
        this.leftRacquet.position[1] = 160;
        this.rightRacquet.position[1] = 160;
        
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
    }

    respawnBall(racquet)
    {
        this.ball.velocity = [0, 0];

        const offset = 100;
        const canPassFromBottom = racquet.position[1] + offset < 320;
        const canPassFromTop    = racquet.position[1] - offset > 0;

        if (canPassFromBottom && canPassFromTop) {
            if(Math.random() > 0.5)
                this.ball.position = [250, racquet.position[1] + offset];
            else
                this.ball.position = [250, racquet.position[1] - offset];
        }
        else if (canPassFromBottom)
            this.ball.position = [250, racquet.position[1] + offset];
        else
            this.ball.position = [250, racquet.position[1] - offset];

        let force = [];
        vec2.subtract(force, racquet.position, this.ball.position);
        vec2.normalize(force, force);
        vec2.multiply(force, force, [3000, 3000])

        this.ball.applyForce(force);
    }

    update(deltaTime)
    {
        this.gameMode.update(deltaTime);
        this.world.step(1 / 60, deltaTime);
    }

    render()
    {
        this.viewport.clear();

        // Middle line
        this.viewport.context.lineWidth = 4;
        this.viewport.context.setLineDash([6, 6]);
        this.viewport.context.strokeStyle = "white";
        this.viewport.context.line(250, 1, 250, 320);

        // Players score
        this.viewport.context.font = "30px Arcade";
        this.viewport.context.fillStyle = "yellow";
        this.viewport.context.textAlign = "end";
        this.viewport.context.fillText(this.leftPlayerScore.toString(), 240, 32);
        this.viewport.context.textAlign = "left";
        this.viewport.context.fillText(this.rightPlayerScore.toString(), 265, 32);

        // Dynamic world objects
        this.world.bodies.forEach((body) => {
            if (body.Render !== undefined)
                this.viewport.renderElement(body);
        });

        if (this.countdownText != "")
        {
            // Blackbox for middle line
            this.viewport.context.fillStyle = "black";
            this.viewport.context.box(250, 160, 90, 90);
            this.viewport.context.fillStyle = "white";
            this.viewport.context.textAlign = "center";

            // Countdown
            this.viewport.context.font = "70px Arcade";
            this.viewport.context.fillText(this.countdownText, 257, 185);
        }

        // Message
        if (this.startMessage != "")
        {
            this.viewport.context.fillStyle = "black";
            this.viewport.context.box(250, 160, 90, 90);
            this.viewport.context.textAlign = "center";
            this.viewport.context.fillStyle = "white";
            this.viewport.context.font = "18px Arcade";
            this.viewport.context.fillText(this.startMessage, 250, 165);
        }
    }
}
