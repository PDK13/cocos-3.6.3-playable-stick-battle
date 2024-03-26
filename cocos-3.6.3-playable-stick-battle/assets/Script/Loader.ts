import { _decorator, Component, PhysicsSystem2D, v2, Node, game, director, tween, v3, CCString, sys, Enum, CCBoolean, Input, Button, Label, KeyCode, input } from 'cc';
import GameEvent from './GameEvent';
import { CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loader')
export default class Loader extends Component {

    @property(CCBoolean)
    touchStart: boolean = true;

    @property(CCBoolean)
    loop = false;

    @property(CCBoolean)
    auto = false;

    @property(CCBoolean)
    directStore = false;

    @property(CCString)
    androidLink = "";

    @property(CCString)
    iosLink = "";

    @property(CCInteger)
    adsType = 0;

    @property(Node)
    panelComplete: Node = null;

    @property(Node)
    panelLose: Node = null;

    @property(Node)
    buttonStart: Node = null;

    @property(Label)
    timeStart: Label = null;

    static finish: boolean = false;
    fired: boolean = false;

    onLoad() {
        game.frameRate = 59;
        director.on(GameEvent.GAME_FINISH, this.onFinish, this);
        director.on(GameEvent.GAME_LOSE, this.onLose, this);
        if (this.directStore || Loader.finish) {
            this.node.on(Input.EventType.TOUCH_START, this.retryOnclick, this);
        }
        else {
            this.timeStart.node.active = false;
            //
            if (this.touchStart)
                this.node.on(Input.EventType.TOUCH_START, this.battleStartOnClick, this);
            else
                this.buttonStart.on(Input.EventType.TOUCH_START, this.battleStartOnClick, this);
            //
            director.on(GameEvent.BATTLE_START_COUNTDOWN, this.SetBattleStartAutoTime, this);
        }

        //
        PhysicsSystem2D.instance.enable = true;
    }

    //
    
    battleStartOnClick() {
        this.buttonStart.active = false;
        this.timeStart.node.active = false;
        this.node.off(Input.EventType.TOUCH_START);
        //
        director.emit(GameEvent.BATTLE_START);
    }

    //

    private SetBattleStartAutoTime() {
        this.timeStart.node.active = true;
        this.SetBattleStartAutoTimeCountdown(11);
    }

    private SetBattleStartAutoTimeCountdown(Time: number): void {
        if (!this.buttonStart.activeInHierarchy)
            return;
        //
        if (Time.valueOf() == 0) {
            this.battleStartOnClick();
            return;
        }
        //
        this.timeStart.string = "BATTLE START IN " + ((Time.valueOf() - 1).toString());
        this.scheduleOnce(() => this.SetBattleStartAutoTimeCountdown(Time - 1), 1);
    }

    //

    onFinish() {
        if (this.loop) {
            Loader.finish = true;
            director.loadScene(director.getScene().name);
            return;
        }
        this.panelComplete.active = true;
        let panel = this.panelComplete.getChildByName("panel");
        tween(panel).to(0.1, { scale: v3(1, 1, 1) }).start();
    }

    retryOnclick() {
        let link = '';
        switch (sys.os) {
            case sys.OS.ANDROID:
                link = this.androidLink;
                break;
            case sys.OS.IOS:
                link = this.iosLink;
                break;
            default:
                link = this.androidLink;
                break;
        }
        openGameStoreUrl(link);
    }

    onLose() {
        if (this.loop) {
            Loader.finish = true;
            director.loadScene(director.getScene().name);
            return;
        }
        this.panelLose.active = true;
        let panel = this.panelLose.getChildByName("panel");
        tween(panel).to(0.1, { scale: v3(1, 1, 1) }).start();
    }

    storeOnLick() {
        let link = '';
        switch (sys.os) {
            case sys.OS.ANDROID:
                link = this.androidLink;
                break;
            case sys.OS.IOS:
                link = this.iosLink;
                break;
            default:
                link = this.androidLink;
                break;
        }
        openGameStoreUrl(link);
    }
}
