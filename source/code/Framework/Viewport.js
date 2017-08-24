export class Viewport
{
    constructor(canvas)
    {
        this.clearColor = "black";
        this.canvas = canvas;
        this.context = canvas.getContext("2d", {
            willReadFrequently: true
        });

        this.scaleWidth = 1.0;
        this.scaleHeight = 1.0;
    }

    setResolution(width, height)
    {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    renderElement(renderable)
    {
        this.context.fillStyle = this.clearColor;
        this.context.strokeStyle = this.clearColor;

        renderable.Render(this.context);
    }

    clear()
    {
        this.context.fillStyle = this.clearColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}