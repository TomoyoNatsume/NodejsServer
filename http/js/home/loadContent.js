$().ready(()=>{
    dynamicTitle();
    const $visitCounter=$('.visit-counter');
    const url=`/api/user/visitCounter`;
    get(url).then(res=>{
        if(res.errno){
            alert('数据错误');
            return;
        }
        console.log(res);
        $visitCounter.append(res.visitCounter);

        return;
    })
})