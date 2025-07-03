import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-dto';
import { PrismaService } from 'src/core/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    let email = createUserDto.email;
    const oldUser = await this.prisma.user.findFirst({where:{email}});

    if (oldUser) throw new ConflictException("This user already exist!");

    const newUser = await this.prisma.user.create({data:createUserDto});
    return {
      data:newUser
    };
  }

  async findAll(query: QueryUserDto) {
    let {name,title:post_title} = query

    const whereUser: Prisma.UserWhereInput = {};
    if (name) whereUser.name = name;

    const wherePost : Prisma.PostWhereInput | undefined = 
    post_title ? {title:{contains:post_title,mode:"insensitive"}} : undefined;

    const user = await this.prisma.user.findMany(
      {
        where:whereUser,
        include:{
          posts: post_title ? {where: wherePost} : true,
        }
      }
    );
    return { data: user };
  }

  async findOne(id: string) {
    const user = this.prisma.user.findUnique({where:{id}});
    if(!user) throw new NotFoundException("this user not found!") 
    return { data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prisma.user.findUnique({where:{id}});
    if(!user) throw new NotFoundException("this user not found!") 
    await this.prisma.user.update({data:updateUserDto,where:{id:id}})
    return `This action updates a #${id} user`
  }

  async remove(id: string) {
    const user = this.prisma.user.findUnique({where:{id}});
    if(!user) throw new NotFoundException("this user not found!") 
    await this.prisma.user.delete({where:{id:id}})
    return `This action removes a #${id} user`;
  }
}
