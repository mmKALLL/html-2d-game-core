import * as System from '../arch/system'
import { MyState } from '../main'

export const DrawSpritesSystem = System.create<MyState>(
  () => {},
  (game, time) => {
    game.state.physicsBodies.forEach((id, body) => {
      const sprite = game.state.sprites.get(id)
      if (sprite) {
        if (body.facing && Math.sign(sprite.scale.x) !== body.facing) {
          sprite.scale.x *= -1
        }
        sprite.position.x = body.position.x
        sprite.position.y = body.position.y
        sprite.rotation = body.angle
      }
    })
    const player_x = game.state.physicsBodies.get('player')?.position.x
    if (!player_x) { return }
    game.state.backgrounds.forEach((id, obj) => {
      const { sprite, original_x, parallaxX } = obj
      if (parallaxX > 0) {
        const adjust_x = player_x * (1 - parallaxX)
        sprite.position.x = original_x + adjust_x
      }
    })
  }
)
