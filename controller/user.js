const {exec,escape}=require('../db/mysql');
const fs=require('fs');
const path=require('path');
const {genPassword}=require('../utils/cryp');

const login=async (username, password)=>{
    username=escape(username);
    password=genPassword(password);
    password=escape(password);
    console.log(password);
    const sql=`
    select username,realname from users where username=${username} and password=${password};`;
    console.log('sql is:',sql);
    const rows=await exec(sql);
    return rows[0]||{};
}
const visitCounter=(ctx)=>{
    const promise=new Promise((resolve,reject)=>{
        const fileName=path.join(__dirname,'../','logs','counter.json');
        fs.readFile(fileName,(err,data)=>{
            if(err){
                console.log('读取文件失败');
                ctx.body=new ErrorModel('读取文件失败');
                return;
            }
            var logData=data.toString();
            logData=JSON.parse(logData);
            console.log(logData);
            ctx.body={};
            ctx.body.visitCounter=++logData.counter;
            fs.writeFile(fileName,JSON.stringify(logData),err=>{
                if(err){
                    console.log('写入文件失败');
                    ctx.body=new ErrorModel('写入文件失败');
                    return;
                }
                resolve();
                return console.log('ctx:',ctx);
            })
            return;
        })
        return;
    })
    return promise;
}
module.exports={login,visitCounter}