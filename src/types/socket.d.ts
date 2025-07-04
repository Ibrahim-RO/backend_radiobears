import { JwtPayload } from "jsonwebtoken"
import "socket.io"

declare module "socket.io" {
  interface Socket {
    user?: {
      id: string
      username: string
    } & JwtPayload
  }
}
