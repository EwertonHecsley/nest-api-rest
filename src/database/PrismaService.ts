/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

export default class PrismaService {
    public prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }
}
