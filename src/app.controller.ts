import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly authService: AuthService) {
    }

    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    public async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    public async getProfile(@Request() req) {
        return req.user;
    }
}
