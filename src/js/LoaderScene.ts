export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("player", "./assets/images/player.png");
  }

  public create() {
    this.scene.start("game");
  }
}
