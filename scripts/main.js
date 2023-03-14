import { world } from "@minecraft/server";
import { mobList } from "./modules/mob_list.js";

world.events.blockBreak.subscribe(async (eventData) => {
    const locX = eventData.block.location.x;
    const locY = eventData.block.location.y;
    const locZ = eventData.block.location.z;
    await eventData.player.runCommandAsync(`summon ${randChoice(mobList)} ${locX} ${locY} ${locZ}`);
});

function randInt(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

function randChoice(array, num) {
    if (num) {
        const choice = [];
        while (num > 0) {
            num--;
            choice.push(array[randInt(0, array.length - 1)]);
        }
        return choice;
    } else {
        return array[randInt(0, array.length - 1)];
    }
}