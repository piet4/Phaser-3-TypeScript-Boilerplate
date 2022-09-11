import GameScene from "./GameScene";

enum States {
  STANDING,
  WALKING_X,
  WALKING_Y
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: GameScene, x: number, y: number) {
    const texture = "player";

    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setAllowDrag(true).setMaxVelocityX(40);
    this.body.setAllowDrag(true).setMaxVelocityY(40);

    this.setSize(24)
      .setCollideWorldBounds(true)
      .setDragX(Math.pow(8, 2))
      .setDragY(Math.pow(8, 2))
      .setState(States.STANDING);
  }

  public setState(value: States) {
    switch (value) {
      case States.STANDING:
        this.setSize(24)

          .play("stand");
        break; 
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right,  up, down } = this.scene.inputs;
    const directionX = -Number(left) + Number(right);
    const directionY = -Number(up) + Number(down);

    const accelerationX = directionX * Math.pow(7, 2);
    const accelerationY = directionY * Math.pow(7, 2);
    
    switch (this.state) {

        case States.STANDING:

        if (left || right) {
            this.setState(States.WALKING_X);
          } else if (up || down) {
            this.setState(States.WALKING_Y);
         } else  {
            this.setVelocityY(0);
            this.setVelocityX(0);
        }
        break;
  
        case States.WALKING_X:
    
            this.setAccelerationX(accelerationX);

            if (!left || !right) {
                this.setState(States.STANDING);
              }

        break;
        
        case States.WALKING_Y:
    
            this.setAccelerationY(accelerationY);

            if (!down || !up) {
                this.setState(States.STANDING);
            }
        break;

    }

    super.preUpdate(time, delta);
  }

  public setSize(height: number) {
    super.setSize(16, height);

    this.body.setOffset(0, this.height - height);

    return this;
  }

}
