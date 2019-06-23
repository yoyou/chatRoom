const path = require('path');
const Koa = require('koa');
const sot = require('socket.io');
const body = require('koa-body');
const route = require('koa-route');
const KoaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
// const log4js = require('log4js');
// log4js.configure({
//     appenders: [
//         {
//             type: console,
//             category: 'console'
//         },
//         {
//             type: 'dateFile',
//             filename: 'log/logs',
//             pattern: '_yyyyMMdd.log',
//             category: 'loginfo'
//         }
//     ],
//     replaceConsole: true,
// })

// const logger = log4js.getLogger('console');


const util = require('util');
// const vertify = util.promisify(jwt.vertify);
const userM = require('./model/userManager');
const staticServer = require('koa-static');

const app = new Koa();
const userManager = new userM();

const secret = "talk_room";

app.use(KoaJwt({ secret }).unless({
    path: ['/register', '/login'] //     '/^\/public/login'
}));

app.use(staticServer(path.join(__dirname, 'public'), {
    extensions: true
}));

app.use(body({
    multipart: true
}));

app.use(async(ctx, next) => {
    console.log(ctx.method + ' ' + ctx.url)
    const start = new Date().getTime(); // 当前时间
    await next().catch((err) => {
        if (err.status == 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n'
        } else {
            throw err;
        }
    })
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`>>>>>>  Time: ${ms}ms`); // 打印耗费时间
})

app.use(route.post('/register', async(ctx, next) => {
    console.log('regitser:  ' + ctx.url);
    let user = ctx.request.body
    console.log(ctx.request);
    console.log(user);
    if (user.name && user.account && user.password && user.photo) {
        try {
            await userManager.register(user)
            ctx.status = 200;
            ctx.response.body = "注册成功";
            ctx.cookies.set('userToken', jwt.sign({
                account: user.account,
                name: user.name
            }, secret, { expiresIn: '1h' }))
        } catch (error) {
            console.log(error)
            ctx.status = 400;
            ctx.response.body = "用户存在";
        }
    }else {
        ctx.status = 400;
        ctx.response.body = '参数错误'
    }
}))



app.use(route.post('/login', async(ctx) => {
    console.log('login:  ' + ctx.url);
    let user = ctx.request.body;
    if (user.account && user.password) {
        try {
            let res = await userManager.checkAuth(user);
            if (res.length == 0) {
                ctx.status = 403;
                ctx.respond.body = "登录失败";
            } else {
                let user = res[0];
                ctx.cookies.set('userToken', jwt.sign({
                    account: user.account,
                    name: user.name
                }, secret, { expiresIn: '1h' }))
                ctx.status = 200;
                ctx.respond.body = "登录成功"
            }
        } catch (error) {
            ctx.status = 403;
            ctx.respond.body = "登录失败";
        }
    }
}))

app.use(route.post('/userinfo', async(ctx) => { // token验证
    console.log('userinfo:  ' + ctx.url);
    const token = ctx.header.authorization;
    let payload;
    if (token) {
        payload = await verify(token.split(' ')[1], secret);
        try {
            let res = await userManager.checkAuth({
                account: payload.account,
                password: payload.password
            });
            if (res.length == 0) {
                ctx.status = 304;
                ctx.redirect('/public/login');
            } else {
                ctx.status = 200;
                ctx.respond.body = "登录成功"
            }
        } catch (error) {
            ctx.status = 304;
            ctx.redirect('/public/login');
        }
    }
}))

// app.use(route.post('/updateImage', async(ctx) => {

// }))

// app.use(route.get('/history', async(ctx) => {

// }))

var server = app.listen(3000);



var io = sot.listen(server);

var clientList = []

io.sockets.on("connection", function(socket) {
    socket.on('join', function(user) {
        clientList.forEach((o, index) => {
            console.log(user.name + '上线', o.name)
            o.emit('online', {
                id: socket.id,
                name: user.name,
            });
        });
        var flag = clientList.some((cur) => {
            if (cur.id == socket.id) {
                return true;
            }
            return false;
        })
        if (!flag) {
            socket.name = user.name
            clientList.push(socket);
            console.log('join', user.name);
        }
    });

    socket.on('send', (rev) => { // 接受信息
        console.log(clientList.length);
        clientList.forEach((o, index) => {
            if (socket.id != o.id) {
                console.log('send >>' + rev.message);
                o.emit('message', { // 群发
                    message: rev.message,
                    name: socket.name
                })
            }
        })
    })

    socket.on('disconnect', function() { //断连
        clientList.find((cur, index) => {
            if (socket.id == cur.id) {
                console.log('下线' + cur.name);
                clientList.splice(index, 1);
                clientList.forEach((o, index) => {
                    o.emit('offLine', {
                        id: socket.id
                    })
                })
                return true;
            }
            return false;
        })
    });
})

module.exports = server;