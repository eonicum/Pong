export class UI
{
    constructor()
    {
        this.statusElement = document.getElementById("status");
        this.gameCanvas = document.getElementsByTagName("canvas")[0];
        this.messages = [];

        setInterval(() => this.update(), 1500);
    }

    update()
    {
        if (this.messages.length == 0)
            return;

        this.statusElement.innerHTML = this.messages.shift();
    }

    showMessage(message)
    {
        this.messages.push(message);
    }

    showError(message)
    {
        message = `<div class="eror-message">${message}</div>`;
        this.showMessage(message);
    }
}