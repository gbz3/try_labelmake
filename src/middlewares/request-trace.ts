import Koa from 'koa'

export const mwRequestTrace = async (ctx: Koa.Context, next: Koa.Next) => {
  const start = Date.now()
  ctx.logger.debug(`>> START RequestHeaders=${JSON.stringify(ctx.request.headers)}`)

  await next()

  const ms = Date.now() - start
  ctx.logger.debug(`<< END ${ms}ms status=${ctx.response.status} ResponseHeader=${JSON.stringify(ctx.response.headers)}`)
}
