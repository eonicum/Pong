import {Ticker} from "Framework/Ticker";
import {Viewport} from "Framework/Viewport"

export class Application
{
    constructor(canvas)
    {
        this.viewport = new Viewport(canvas);
        this.viewport.setResolution(1000, 640);
        this.viewport.context.scale(2, 2);
        
        this.ticker = new Ticker();
        this.ticker.callback = (deltatime) => {
            this.update(deltatime);
            this.render();
        }

        this.start();
    }

    start()
    {
        if (this.update === undefined || this.render === undefined) {
            console.error("Start abborted: application is an abstract class!");
            return;
        }

        this.ticker.start();
    }
}