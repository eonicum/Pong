import Peer from "peerjs"
import EventEmitter from "eventemitter3"

// Signals:
//   1. ConnectionEstablished(channel)
//   2. ConnectionFailed(reason)
//   3. ConnectionClosed()
//   4. Connecting()
export class Network extends EventEmitter
{
    constructor()
    {
        super();

        this.peer = new Peer({
            key: "n7skyxue4k46ajor",
            secure: true
        });
        this.peer.on("open", (id) => this.networkInitialized());
        this.peer.on("connection", (channel) => this.incomingConnection(channel));
        this.peer.on("error", (error) => {
            switch (error.type) {
                case "peer-unavailable":
                    this.connectionToRemotePeerFailed();
                    break;

                case "server-error":
                    this.connectionToMasterServerFailed();
                    break;

                default:
                    console.error(error.type);
                    break;
            }
        });
    }

    async connectionToRemotePeerFailed()
    {
        this.publicPeerId = this.peer.id;
        this.emit("ConnectionFailed", "Can't connect to player 2!");
    }

    async connectionToMasterServerFailed()
    {
        this.emit("ConnectionFailed", "Master server unavailable!");
    }

    networkInitialized()
    {
        if (this.publicPeerId == "")
        {
            this.publicPeerId = this.peer.id;
        }
        else
        {
            this.emit("Connecting");
            this.channel = this.peer.connect(this.publicPeerId, {
                reliable: false
            });
            this.channel.isServer = false;
            this.channel.on("open", () => {
                this.emit("ConnectionEstablished", this.channel);
            });
            this.channel.on("close", () => {
                this.emit("ConnectionClosed");
            });
        }
    }

    incomingConnection(channel)
    {
        this.channel = channel;
        this.channel.isServer = true;
        this.channel.on("close", () => {
            this.emit("ConnectionClosed");
        });

        this.emit("ConnectionEstablished", this.channel);
    }

    get publicPeerId()
    {
        const browserHash = window.location.hash.toString();
        return browserHash.substr(1); // Remove # from beginning
    }

    set publicPeerId(id)
    {
        window.location.hash = id;
    }
}
