import axios from 'axios'  //引入axios



export var ip = 'http://127.0.0.1:5000'; //请求基本路径

axios.defaults.baseURL= ip ;

export var picURL = ip + '/upload/imgs/goods_img/'  //图片在后台服务器中的位置


export var shoppicURL = ip + '/upload/shop/'  //图片在后台服务器中的位置




//登录接口
// account：用户名    password：密码
export var login = (account,password)=>axios.post('/users/checkLogin',{account,password});

//验证token是否过期接口
// token:身份令牌
export var checktoken = (token)=>axios.get('/users/checktoken',{params:{token}});

//添加账号接口
// account:账号     password：密码     userGroup：用户组
export var add = (account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup});

//获取账号列表接口
// currentPage=当前页码    pageSize=每页条数
export var list = (currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}});

//删除账号接口
// id=要删除账号的id
export var del = (id)=>axios.get('/users/del',{params:{id}});

//批量删除账号接口
// ids=要删除账号的id数组
export var batchdel = (ids)=>axios.get('/users/batchdel',{params:{ids}});

//修改账号接口
//id=要修改账号的id    account=账号   userGroup=用户组
export var edit = (id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup});

//检验旧密码是否正确
export var checkoldpwd = (oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}});

//修改密码
export var editpwd = (newPwd,id)=>axios.post('/users/editpwd',{newPwd,id});

//获取个人账户信息
export var accountinfo = (id)=>axios.get('/users/accountinfo',{params:{id}});

//获取商品分类接口
//currentPage=当前页    pageSize=每页条数
export var catelist = (currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}});

//添加商品分类
export var addcate = (cateName,state)=>axios.post('/goods/addcate',{cateName,state});

//查询所有分类名称
// /goods/categories
export var Categories = ()=>axios.get('/goods/categories',{params:{}});

//删除商品分类
export var delcate = (id)=>axios.get('/goods/delcate',{params:{id}});

//修改商品分类
export var editcate = (id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state});

//头像上传接口
export var upload = (id)=>axios.post('/users/avatar_upload',{id});

//添加商品分类
export var addgoods = (name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc});

//获取分类列表接口
export var goodslist = (currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}});

//删除商品
export var goodsdel = (id)=>axios.get('/goods/del',{params:{id}});

//修改商品数据
export var goodedit = (name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id});

//获取订单列表
export var orderlist = (params)=>axios.get('/order/list',{params});



//获取订单详情
export var orderdetail = (id)=>axios.get('/order/detail',{params:{id}});

//修改订单
export var orderedit = (obj)=>axios.post('/order/edit',obj);

//店铺内容修改
export var shopedit = (obj)=>axios.post('/shop/edit',obj);

//首页报表接口
export var ordertotaldata = (params)=>axios.get('/order/totaldata',{params});

//订单报表接口
export var ordertotal = (date)=>axios.get('/order/ordertotal',{params:{date}});











//店铺详情
export var shopinfo = ()=>axios.get('/shop/info',{params:{}});





