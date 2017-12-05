$(function () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false})
    $(document).ajaxSend(function () {
        $('.content,#add').hide()
        $('#gd').show()
    })
    $(document).ajaxSuccess(function () {
        $('#gd').hide()
        $('.content,#add').show()
    })
    let index1=0;let arr2=[] ;
    // 封装添加新闻函数
    function render(type,repaint=true,start=0) {
        $.ajax({
            url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=10&appkey=3732400a5ce14b54",
            dataType:'jsonp',
            success:function (res) {
            let arr = res.result.list;
            let str = "";

            arr.forEach((val,index)=>{
                let arr1=[];
                if(val.pic ==""){

                str += `<li class="list" id=${index1}   >
                                <a href="particulars.html" class="xqa" >
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                arr1.push(""+val.content+"")
            }else {
                    str += `<li class="list" id="${index1}">
                                <a href="particulars.html" class="xqa" >
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;

                arr1.push(""+val.content+"")
                }
                arr2.push(arr1)
                index1++;
            })
                // 点击获取新闻内容
                $('.content').on('click','.list',function (e) {
                    e.preventDefault()
                    // e.stopPropagation()
                   var index=$('.list').index($(this))
                    console.log(index)
                    $('.content').html(arr2[index])

                })

            if(repaint) {
                $('.content').html(str);
            }else {
                $('.content').html($('.content').html()+str);
            }
        }
    })
}



    //获取新闻频道
    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=3732400a5ce14b54',
        dataType:'jsonp',
        success:function (res) {
            let arr = res.result;
            let str = "";

            arr.forEach((val, index) => {
                if(index == 0)
            {
                str += `<li class="active">${val}</li>`;

            }
            else
            {
                str += `<li>${val}</li>`
            }
        })
            $('#scroller ul').html(str);

            render($('#scroller li.active').text());
        }
    })
    // 点击栏目切换新闻
    $('#scroller').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }
        arr2=[];
        $(this).siblings().removeClass('active').end().addClass('active');
        let text =$(this).html();
        render(text);
    })
    // 点击加载更多
    $('#add').click(function () {

        render($('#scroller li.active').html(),false,$(".content").children("li").length);
    })



    $('.search input').click(function () {
        location.href='search.html'
    })

    $('.sosuo').click(function () {
        console.log(1)
        // 删除新闻栏目
        $('#wrapper').remove();
        // 获取输入内容
        let values=$('input').val();
        // 输出搜索新闻
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword="+values+"&appkey=3732400a5ce14b54",
            dataType:'jsonp',
            success:function (res) {
                let arr = res.result.list;
                let str = "";
                arr.forEach((val,index)=>{
                    if(val.pic ==""){
                    str += `<li class="list" >
                                    <a href="particulars.html">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                }else
                {
                    str += `<li class="list">
                                    <a href="particulars.html">
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

})















