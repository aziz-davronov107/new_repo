import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService){}
  async create(createPostDto: CreatePostDto) {
    let newPost = await this.prisma.post.create({data:createPostDto})
    return {data:newPost};
  }
}
