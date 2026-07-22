
import { Context } from './Context'


class LaunchpicsError extends Error {

  isLaunchpicsError = true

  sdk = 'Launchpics'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LaunchpicsError
}

