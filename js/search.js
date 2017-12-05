
$(function () {
    $('#back').click(function () {
        history.back()
    })
    let search = '';
    let arr
    //将本地数据已存数据再次放入search;
    if(localStorage.history){
        search=localStorage.history
         arr = search.split(",")
        arr.shift()
        arr=arr.slice(-5)
        let str='';
        arr.forEach(val=> {

          str+=`<span>${val}</span>`
        })
         $('.span').html(str)

    }
    $('#record').on('click','span',function () {
          let thisa=$(this).text()
        console.log(thisa)
        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + thisa + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend:function () {
                $('#gd').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                $('#record').hide()
                let arr = res.result.list;
                console.log(1);
                let str='';
                arr.forEach(val=>{
                    if(val.pic ==""){
                    str += `<li class="list" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                }
                else{
                    str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                }
            })
                $('#aaa').html(str);

            }
        })


    })








    $('.search input').blur(function () {
        let values = $(this).val();
        //存搜索内容到search
        if (values=='') {
            return
        }

        else {
             // if(values!=arr.includes.call(arguments))
                 search += "," + values
                 localStorage.history = search;
                 let arr
                 arr = localStorage.history.split(",")


                arr.shift()
            arr=arr.slice(-5)
            let str='';
            arr.forEach(val=> {

                str+=`<span>${val}</span>`
                 })
            $('.span').html(str)
        }
        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + values + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend:function () {
               $('#gd').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                $('#record').hide()
                let arr = res.result.list;
                console.log(1);
                  let str='';
                    arr.forEach((val,index)=>{
                        if(val.pic ==""){
                        str += `<li class="list" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }else
                    {
                        str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                    }
                })
                    $('#aaa').html(str);

            },
        })
    })


    $('.sosuo').click(function () {
        console.log(1)
        // 删除新闻栏目
        $('#wrapper').remove();
        // 获取输入内容
        let values = $('input').val();
        // 输出搜索新闻
        $.ajax({
            url: "https://api.jisuapi.com/news/search?keyword=" + values + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend:function () {
                $('#gd').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                $('#record').hide()
                let arr = res.result.list;
                let str = "";
                arr.forEach((val,index)=>{
                    if(val.pic==""){
                    str += `<li class="list" >
                                <a href="${val.url}">
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                }
                else
                {
                    str += `<li class="list">
                                <a href="${val.url}">
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                }
            })
                $('#aaa').html(str);

            },
        })
    })


})