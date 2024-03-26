import { _decorator } from 'cc';

export default class GameEvent  {
    static BATTLE_START: string = 'BATTLE_START';
    static BATTLE_START_COUNTDOWN = 'BATTLE_START_COUNTDOWN';
    static BATTLE_END: string = 'BATTLE_END';

    static STICK_BLUE_DEAD: string = "STICK_BLUE_DEAD";
    static STICK_RED_DEAD: string = "STICK_RED_DEAD";

    static GAME_FINISH: string = 'GAME_FINISH';
    static GAME_LOSE: string = 'GAME_LOSE';
}