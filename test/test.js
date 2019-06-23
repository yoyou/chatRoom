var assert = require("assert").strict;
var userManager = require('../model/userManager');
var dbM = require('../model/db');
var user = new userManager();
// var db = new dbM();
// var request = require('supertest');
// var app = require('../app.js')

describe('user', () => {
    // describe('register', () => {
    //     it('add user', () => {
    //         user.register({
    //             name: 'test',
    //             account: 'test1',
    //             password: 'test1',
    //             photo: '../'
    //         }, function(err) {
    //             if(err) {
    //                 assert.doesNotThrow(() => {
    //                     console.log('>>>>> error');
    //                 })
    //             }
    //         }).then((resolve) => {
    //             console.log('register success')
    //         }, (reject) => {
    //             console.log(reject);               
    //         })
    //     })
    // })
    // describe('checkAuth', () => {
    //     it('checkAuth', () => {
    //         user.checkAuth({account: 'test1', account: 'test1', password: 'test1'}).then(reslove => {
    //             console.log('login success')
    //         }, (reject) => {
    //             console.log('login error')
    //             console.log(reject);
    //         })
    //     })
    // })
    // describe('change user message', () => {
    //     it('change user message', (done) => {
    //         user.updateUserMessage({account: 'test1', password: 'zmw1'}, {account: 'test1', password: 'test1'}).then(resolve => {
    //             console.log('update success');
    //             console.log(resolve)
    //             done();
    //         }, reject => {
    //             console.log('update failed');
    //             console.log(reject);
    //             done();
    //         })
    //     })
    // })
    describe('delete user', () => {
        it('delete user', () => {
            user.deleteUserMessage({account: 'test1', password: 'zmw1'}).then(resolve => {
                console.log('delete user successful')
            }, reject => {
                console.log(reject)
            })
        })
    })
})

// describe('userManager', () => {
//     describe('register', () => {
//             it('add user', () => {
//                 user.register({
//                     name: 'test',
//                     account: 'test1',
//                     password: 'test1',
//                     photo: './'
//                 }, function(err) {
//                     if (err) {
//                         assert.doesNotThrow(() => {
//                             // console.error(">>>>>>>>error code: " + err.code);
//                         })
//                     }
//                     // done();
//                 })
//             })
//         })
// describe('delete user', () => {
//     it('remove user', () => {
//         user.deleteUserMessage({
//             account: 'test1',
//             password: 'test1'
//         }, function(err) {
//             if (err) {
//                 assert.fail(err);
//             }
//         })
//     })
// })

// describe('checkAuth', () => {
//     it('checkAuth', () => {
//         user.checkAuth({ account: 'test1', password: 'test1' }, function(err, res) {
//             if (err) {
//                 assert.fail(err);
//             }
//             console.log(res);

//         })
//     })
// })

// describe('remove user', () => {
//     it('remove user', () => {
//         user.deleteUserMessage({ account: 'zmw1', password: '1234' }, function(err, res, field) {
//             if (err) {
//                 assert.fail(err);
//             }
//             console.log(res, field);
//         })
//     })
// })
// })


// describe('DUP_CHRAMTER_CONCAT', () => {
//     it('DUP_CHRAMTER_CONCAT', () => {
//         assert.strictEqual(db.DupCharamterConcat({ name: 'zmw', age: '11' }, ' AND '), "name='zmw' AND age='11'")
//     })
// })

// describe('register', () => {
    // it('register', () => {
    //     request(app).post('/register')
    //         .send({
    //             name: 'test2',
    //             account: 'test2',
    //             password: 'test2',
    //             photo: './'
    //         }).expect(200, function(err, res) {
    //             if (err) {
    //                 console.log(res.status);
    //                 return;
    //             }
    //             console.log(res.status);
    //             //done();
    //         })
    // })
    // it('login', () => {
    //     request(app).post('/login')
    //         .send({
    //             account: 'test2',
    //             password: 'test2'
    //         }).expect(200, function(err, res) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             console.log(res.status);
    //         })
    // })
// })