const Controller = require('egg').Controller;
const random = require('../util/random');
const fs=require('fs');

class ForumController extends Controller {

// 发帖
    async addForum() {
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        var res=await ctx.model.Forum.create(data);
        if(res)
            res=1;
        else
            res=0;  

        ctx.body = {
            code:200,
            data:res
        };
    } 

// 获取帖子
async getforumlist() {
    const ctx = this.ctx;
    const {data}=ctx.request.body;
    let res;
    let logo=data.sort;
    if(data.sort=='comtime')
    res=await ctx.model.Forum.findAll({
        where:data.data,
        order:[['comtime','DESC']],
        include: [{model: ctx.app.model.User}]
    }).then(us =>us.map(u => u.toJSON())); 
    else
    res=await ctx.model.Forum.findAll({
        where:data.data,
        order:[['reploynum','DESC']],
        include: [{model: ctx.app.model.User}]
    }).then(us =>us.map(u => u.toJSON())); 
    console.log("dfsdfsdfsdfs",res);
    res.map((item)=>{
        if(item.imgurl!=null){
        item.beatUrl=item.imgurl;
        item.imgurl=fs.readdirSync('app/'+item.imgurl);
        }
        if(item.User.uid!='e3fe6790469ed968'){
        item.User.headimgUrl=item.User.headimg;
        item.User.headimg=fs.readdirSync('app/'+item.User.headimg);
        }else{
            item.User.headimgUrl=''; 
        }
    })
    ctx.body = {
        code:200,
        data:{res,logo}
    };
} 

}

module.exports =ForumController;