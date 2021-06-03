const {User} = require('../../models/index');

​

let join = (req,res) => {

    //res.send('join');

    res.render('./user/join.html')

}

​

let login = (req,res) => {

    let flag = req.query.flag;

    res.render('./user/login.html',{ flag })

}

​

let info = async (req,res) => {

    //, 'userdt']

    let userlist = await User.findAll({});

    console.log(userlist)

    

    res.render('./user/info.html',{

        userList: userlist,

    })

    /*

   res.json({

       userlist, 

   })

   */

}

​

let join_success = async (req,res) =>{

    let userid = req.body.userid;

    let userpw = req.body.userpw;

    let username = req.body.username;

    let gender = req.body.gender;

    let userimage = req.file == undefined ? '' : req.file.path;

    console.log(userid)

    try{

        let rst = await User.create({ userid, userpw, username, gender, userimage })

    } catch (e) {

        console.log(e);

    }

    res.render('./user/join_success.html',{ userid, username });

}

​

let login_check = async (req,res) =>{

    let userid = req.body.userid;

    let userpw = req.body.userpw;

​

    let result = await User.findOne({

        where:{ userid,userpw }

    })

    if(result == null){

        res.redirect('/user/login?flag=0')

        

    } else {

        req.session.uid = userid;

        req.session.isLogin = true;

​

        req.session.save(()=>{

            res.redirect('/');

        })

    }

​

​

}

​

let logout = (req,res)=>{

    delete req.session.isLogin;

    delete req.session.uid;

​

    req.session.save(()=>{

        res.redirect('/');

    })

}

​

let userid_check = async (req,res)=>{

    let userid = req.query.userid;

    let flag = false;

    let result = await User.findOne({

        where:{userid}

    })

​

    if(result == undefined){

        //생성가능

        flag = true;

    }else{

        //생성불가능

        flag = false;

    }

​

    res.json({

       login:flag,

        userid, 

   })

}

​

module.exports = {

    join:join,

    login:login,

    info:info,

    join_success:join_success,

    login_check:login_check,

    logout:logout,

    userid_check:userid_check,

}

​