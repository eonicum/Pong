import "normalize.css"
import "assets/main.css"
import "assets/index.html"

import {Network} from "Framework/Network"
import {UI} from "Game/UI"
import {Pong} from "Game/Pong"

window.onload = function() {
    const ui = new UI();
    const game = new Pong(ui.gameCanvas);

    const network = new Network();
    network.on("Connecting", () => {
        ui.showMessage("Connecting to player 2...");
    });
    network.on("ConnectionEstablished", (channel) => {
        ui.showMessage("Connection established!");
        ui.showMessage("Starting player vs player...");
        game.startMultiplayerGame(channel);
    });
    network.on("ConnectionClosed", () => {
        ui.showError("Connection closed!");
        ui.showMessage("Starting player vs enemy...");
        game.startSinglePlayerGame();
    });
    network.on("ConnectionFailed", async (reason) => {
        ui.showError(reason);
        ui.showMessage("Starting player vs enemy...");
        ui.showMessage("Send URL to friend to play online...");
        game.startSinglePlayerGame();
    });
    
    // Start p2e immediately, if first launch
    if (network.publicPeerId == "") {
        ui.showMessage("Starting player vs enemy...");
        ui.showMessage("Send URL to friend to play online...");
        game.startSinglePlayerGame();
    }
}
