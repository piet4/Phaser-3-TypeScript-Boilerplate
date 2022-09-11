import Inputs from "./Inputs";
import Player from "./Player";

export default class GameScene extends Phaser.Scene {
  private _inputs: Inputs;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  public create() {

    this._inputs = new Inputs(this);

    const player = new Player(this, 32, 192);

  }


  public get inputs() {
    return this._inputs;
  }
}
