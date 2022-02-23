import {world} from "mojang-minecraft";
var playerMovement = new Object;

world.events.tick.subscribe(eventData => tickEvent(eventData));

function randInt(min, max) {
      max++;
      return Math.floor(Math.random() * (max - min)) + min;
}

function tickEvent (eventData) {
    if (eventData.currentTick % 5 === 0) {
        for (const player of world.getPlayers()) {
            if (Object.keys(playerMovement).includes(player.name)) {
                const velocity = player.velocity.x + player.velocity.z;
                if ((-0.001 < velocity) && (velocity < 0.001) || playerMovement[player.name] < 0) {
                    if (playerMovement[player.name] === 125 && eventData.currentTick % 20 === 0) {
                        try {
                            player.runCommand('damage @s 2');
                        } catch {
                            playerMovement[player.name] = 0;
                        }
                    }
                    playerMovement[player.name] = Math.min(125, playerMovement[player.name] + randInt(2,10));
                } else if (playerMovement[player.name] >= 0) {
                    playerMovement[player.name] = Math.max(0, playerMovement[player.name] - randInt(1,5));
                }
            } else {
                playerMovement[player.name] = -275;
            }
        }
    }
}