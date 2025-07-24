import { Module } from "@nestjs/common";
import { JwtStrategy } from "./service/accesstoken.decode";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [PassportModule],
    providers: [JwtStrategy],
    exports:[JwtStrategy]

})
export class AuthModules {

}