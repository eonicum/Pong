import {Body, Box, Circle, Material} from "p2"

export class Ball extends Body
{
    constructor()
    {
        super({ mass: 1 });
        
        this.radius = 7;
        this.shape = new Circle({
            radius: this.radius
        });
        this.shapes.push(this.shape);
        this.damping = 0;
    }

    set material(material)
    {
        this.shape.material = material;
    }

    Render(context)
    {
        context.fillStyle = "white";
        context.circle(this.position[0], this.position[1], this.radius);
    }
}

export class Racquet extends Body
{
    constructor()
    {
        super({ mass: 20 });
        
        this.width = 12;
        this.height = 50;

        this.type = Body.KINEMATIC;
        this.shape = new Box({
            width: this.width,
            height: this.height
        });
        this.shapes.push(this.shape);
    }

    set material(material)
    {
        this.shape.material = material;
    }

    Render(context)
    {
        context.fillStyle = "white";
        context.box(this.position[0], this.position[1], this.width, this.height);
    }
}
