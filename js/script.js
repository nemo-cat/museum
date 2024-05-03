$(document).ready(function()
{
    /* ========================== NOTICE ========================== */
    let getNoticeCheck = sessionStorage.getItem('noticeCheck');
    let noticeCheck = false; // 기본값을 false로 설정

    // 세션스토리지에 값이 없거나(Null), false가 저장되어있으면 다음 실행
    if (!getNoticeCheck || getNoticeCheck == 'false')
    {
        noticeCheck = false; //세션스토리지에서 noticeCheck값을 false로 저장
        sessionStorage.setItem('noticeCheck', noticeCheck);
    }
    else
    {
        //그 외의 경우 공지사항체크를 한 것으로 간주하여 noticeCheck의 값을 true로 변경
        noticeCheck = true;
        sessionStorage.setItem('noticeCheck', noticeCheck);
    }

    // 스크롤 방지 & 맨위로 이동
    function preventScroll(event)
    {
        window.scrollTo(0, 0); // 맨 위로 스크롤 이동시킴
        event.preventDefault(); // 스크롤방지
    }

    //공지사항 확인을 안했을경우
    if (!noticeCheck)
    {
        //스크롤 방지 & 공지사항 보임
        document.addEventListener('scroll', preventScroll);
        $('#notice').css('display', 'block');
    }

    //닫기 버튼 클릭시 공지사항 사라지고, 다른 함수들 작동 시작
    $('.notice-close').click(function()
    {
        //닫기버튼 누르면 공지사항 사라지고, 다시 스크롤이 됨
        $('#notice').css('display', 'none');
        document.removeEventListener('scroll', preventScroll);

        //공지사항을 체크한 것으로 간주하고 noticeCheck값을 true로 변경해줌
        noticeCheck = true;
        //세션스토리지 값도 true로 변경하여 다음에 공지사항이 안나오도록 함.
        sessionStorage.setItem('noticeCheck', noticeCheck);
    })
    /* =========================================================== */
 

   /*  //svg path길이 구하기
    $('#svgAni05').each(function(i, path){
        let length = path.getTotalLength();
        console.log(length);
    }) */
   
    //01. 스플리팅 호출
    Splitting();

    //02. header 영역 스크롤 이벤트
    let prevScrollTop = 0;
    //스크롤 이벤트가 진행될때,
    document.addEventListener("scroll",function()
    {
        //현재 스크롤top의 값 저장
        let nowScrollTop = $(window).scrollTop();

        if( nowScrollTop > prevScrollTop)
        {
            $('header').addClass('active');
        }
        else
        {
            $('header').removeClass('active');
        }
        prevScrollTop = nowScrollTop;
    })

    //03
    $('.animate').scrolla(
        {
            mobile: true,
            once: false
        }
    )


    
    /* ========== .con01 gsap ========== */
    gsap.timeline({
        scrollTrigger: {
            trigger: '.con01',//트리거의 대상
            start : '0% 80%',
            end: '100% 100%',
            scrub: 1,
        }
    })
    .to('.wrap', {
        backgroundColor : '#fff',
        color: '#000',
        ease: 'none',
        duration: 5
    }, 0)
    .to('.svgAni path', {
        stroke : '#000',
        ease: 'none',
        duration: 3
    })
    .to('.scroll', {
        opacity: 0,
        ease: 'none',
        duration: 5
    })
    .fromTo('.videoWrap video',
        {'clip-path': 'inset(60% 60% 60% 60% round 30%)'},
        {'clip-path': 'inset(0% 0% 0% 0% round 0%)', ease: 'none', duration: 10}
    ,0)



    /* ========== .con02 gsap ========== */
    //title 글자 애니메이션
    gsap.timeline({
        scrollTrigger: {
            trigger: '.con02',
            start: '0%, 100%',
            end: '0% 20%',
            scrub: 1,
        }
    })
    .fromTo('.con02 .a',
        {x: '-100%'},
        {x:'0%', ease:'none', duration:5}
    ,0)
    .fromTo('.con02 .b',
        {x: '100%'},
        {x:'0%', ease:'none', duration:5}
    ,0)

    //workList가 나타날때 배경색 검정으로 변경
    gsap.timeline({
        scrollTrigger: {
            trigger: '.workList',
            start: '0% 100%',
            end: '0% 100%', //시작과 동시에 애니메이션 종료
            scrub: 1,
        }
    })
    .to('.wrap', {
        backgroundColor: '#000',
        color: '#fff',
        ease: 'none',
        duration: 5
    },0)

    //title 글자 position: fixed적용하기
    .to('.con02 .title', {
        position: 'fixed',
        ease:'none', left:'0',
        top:'0',
        width:'100%',
        duration: 5
    },0)

    //workList에 margin-top을 적용해서 애니메이션을 자연스럽게 함
    .fromTo('.con02 .workList',
        { margin: '0 auto'},
        { margin: '100vh auto 0', position: 'relative', zIndex: '10', duration: 1}
    ,0)

    //workList가 끝날때 .title글자가 화면 밖으로 사라짐
    gsap.timeline({
        scrollTrigger: {
            trigger: '.workList',
            start: '100% 50%',
            end: '100% 0%',
            scrub: 1,
        }
    })
    .to('.con02 .a', {
        x:'-100%',
        ease:'none',
        duration:5
    },0)
    .to('.con02 .b', {
        x:'100%',
        ease:'none',
        duration:5
    },0)


    /* ========== .menuOpen ========== */
    $('.menuOpen').on('click',function()
    {
        $('.gnb').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('active');
    })

    $('.gnb li').on('click',function()
    {
        $('.gnb').removeClass('active');
        $('.menuOpen').removeClass('active');
        $('body').removeClass('active');
    })
})