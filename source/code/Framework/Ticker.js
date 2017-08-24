import "Framework/Extensions"

export class Ticker
{
    constructor()
    {
        this.maxEllapsedTime = 100;
        this.targetFPMS = 0.06;
        this.lastTime = 0;

        this.callback = null;
    }

    start()
    {
        requestAnimationFrame((currentTime) => this.animationFrame(currentTime));
    }

    animationFrame(currentTime)
    {
        if (currentTime > this.lastTime)
        {
            let elapsedTime = currentTime - this.lastTime;
                elapsedTime = Math.clamp(elapsedTime, 0, this.maxEllapsedTime);

            const deltaTime = elapsedTime * this.targetFPMS;
            if (this.callback !== null)
                this.callback(deltaTime);

            this.lastTime = currentTime;
            requestAnimationFrame((currentTime) => this.animationFrame(currentTime));
        }
    }
}
