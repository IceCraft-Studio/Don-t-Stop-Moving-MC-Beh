import {world,system} from "@minecraft/server";
import {timer} from "./addon_options.js";
const playerMovement = {};

function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playerDamageTick() {
    for (const player of world.getPlayers()) {
        //console.warn(`${player.name} [${playerMovement[player.id]}] - Damage`);
        if (playerMovement[player.id] === timer) player.applyDamage(2);
    }
}

function playerMovementTick() {
    for (const player of world.getPlayers()) {
        if (player.id in playerMovement) {
            const velocity = player.getVelocity().x + player.getVelocity().z;
            if ((-0.001 < velocity) && (velocity < 0.001) || playerMovement[player.id] < 0) {
                playerMovement[player.id] = Math.min(timer, playerMovement[player.id] + randInt(2,10));
            } else if (playerMovement[player.id] >= 0) {
                playerMovement[player.id] = Math.max(0, playerMovement[player.id] - randInt(1,5));
            }
            if (player.getComponent('minecraft:health').current === 0) {
                playerMovement[player.id] = -45;
            }
        } else {
            playerMovement[player.id] = -275;
        }
    }
}

//Calculate movement:
system.runInterval(playerMovementTick,5);

//Deal Damage:
system.runInterval(playerDamageTick,20);