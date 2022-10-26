import {world,system} from "@minecraft/server";
import {timer} from "./modules/addon_options.js";
var playerMovement = {};

function randInt(min, max) {
      max++;
      return Math.floor(Math.random() * (max - min)) + min;
}

async function tickEvent(eventData) {
    system.run(tickEvent);
    if (eventData.currentTick % 5 === 0) {
        for (const player of world.getPlayers()) {
            if (player.id in playerMovement) {
                const velocity = player.velocity.x + player.velocity.z;
                if ((-0.001 < velocity) && (velocity < 0.001) || playerMovement[player.id] < 0) {
                    if (playerMovement[player.id] === timer && eventData.currentTick % 20 === 0) {
                        try {
                            await player.runCommandAsync('damage @s 2');
                        } catch {}
                    }
                    playerMovement[player.id] = Math.min(timer, playerMovement[player.id] + randInt(2,10));
                } else if (playerMovement[player.id] >= 0) {
                    playerMovement[player.id] = Math.max(0, playerMovement[player.id] - randInt(1,5));
                }
                if (player.getComponent('minecraft:health').current === 0) {
                    playerMovement[player.id] = -20;
                }
            } else {
                playerMovement[player.id] = -275;
            }
        }
    }
}

system.run(tickEvent);