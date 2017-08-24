import {Body, World, Material, ContactMaterial, Box} from "p2"
import {Ball, Racquet} from "Game/GameObjects"

export class PhysicsWorld extends World
{
    constructor()
    {
        super({ gravity: [0, 0] });

        this.leftTriggerFired = null;
        this.rightTriggerFired = null;

        this.setupPhysicsParameters();
        this.setupWorldBounds();
    }

    setupPhysicsParameters()
    {
        this.material = new Material(0);
        
        const options = { restitution: 1 };
        this.addContactMaterial(new ContactMaterial(
            this.material,
            this.material,
            options
        ));
    }

    setupWorldBounds()
    {
        this.createWall(250, -10);
        this.createWall(250, 330);

        const leftTrigger  = this.createTrigger(-10, 160);
        const rightTrigger = this.createTrigger(510, 160);

        this.on("beginContact", (event) => {
            const leftTriggerContact  = (event.bodyA == leftTrigger  || event.bodyB == leftTrigger);
            const rightTriggerContact = (event.bodyA == rightTrigger || event.bodyB == rightTrigger);

            if (leftTriggerContact && this.leftTriggerFired !== null)
                this.leftTriggerFired();
            
            else if (rightTriggerContact && this.rightTriggerFired !== null)
                this.rightTriggerFired();
        });
    }

    createWall(x, y)
    {
        const shape = new Box({
            width: 500,
            height: 20
        });
        shape.material = this.material;

        let newWall = new Body();
        newWall.position = [x, y];
        newWall.type = Body.STATIC;
        newWall.shapes.push(shape);
        this.addBody(newWall);

        return newWall;
    }

    createTrigger(x, y)
    {
        const shape = new Box({
            width: 20,
            height: 320
        });
        shape.sensor = true;

        let newTrigger = new Body();
        newTrigger.position = [x, y];
        newTrigger.type = Body.STATIC;
        newTrigger.shapes.push(shape);
        this.addBody(newTrigger);

        return newTrigger;
    }

    createRacquet(x, y)
    {
        let newRacquet = new Racquet();
        newRacquet.position = [x, y];
        newRacquet.material = this.material;
        this.addBody(newRacquet);

        return newRacquet;
    }

    createBall(x, y)
    {
        let newBall = new Ball();
        newBall.fixedRotation = true;
        newBall.position = [x, y];
        newBall.material = this.material;
        this.addBody(newBall);

        return newBall;
    }
}