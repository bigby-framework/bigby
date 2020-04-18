import { Game2D, Renderable2D } from "@bigby/2d";
import { Entity } from "@bigby/core";
import MainScene from "./scenes/main";
import { with2DEditor } from "@bigby/2d-editor";
import { Ticker } from "@bigby/behaviors";

/* Anything built using Bigby is comprised of entities (represented by instances
of the Entity class). Each entity can have child entities, forming a scene tree,
and any number of behaviors (represented by instances of the Behavior class.)

How you work with these core classes is mostly up to you -- in this example
game, we'll create a set of classes that inherit from them. You don't absolutely
_have_ to follow this classic OOP approach, but we'll stick to it for now to keep
things simple.

We'll start with the following class, an instance of which represents the game
itself. */

class ExampleGame extends Entity {
  constructor() {
    super("Example Game");

    /*
    Entities are not expected to implement any logic of their own; they merely
    act as containers for a collection of behaviors. Any kind of functionality
    should be implemented as such a behavior, and an entity's constructor
    typically does little more than add behaviors through the `addBehavior`
    function.

    The first behavior we want to add is `Game2D`, which implements the actual
    2D game engine. (Bigby's core framework is engine agnostic; at some point in
    the future, there will also be a Game3D.) */
    this.addBehavior(Game2D);

    /* TODO: explain Ticker */
    this.addBehavior(Ticker);

    /* All entities that intend to render something to the screen are expected
    to have the Renderable2D behavior. */
    this.addBehavior(Renderable2D);

    /* There is no specific "scene management" in Bigby; scenes are simply
    entities that you add to (and later remove from) your top-level entity. So,
    let's create an instance of the MainScene class and add it as a child. */
    this.addChild(new MainScene());
  }
}

/* This example game uses the Bigby CLI, which expects the root entity to be the
default export of this module. If we just export the game object itself, bigby
will run the game; but let's wrap it in `with2DEditor` to get the Bigby Editor
UI for free. */
export default with2DEditor(new ExampleGame());
