/*  Melih Güler
 *  June 2019
 */

    (function () {
        "use strict";
        var random=0;//MENULERİ SIRALAMAK İÇİN KULLANILAN DEĞİŞKEN.


        $.fn.extend({


            /*Örnek parametre Girişi
            * {
                    'menu': [
                    {'text': 'Bu birinci item'in yazısı!!',
                    click: function () {
                    alert('Birinci item fonksiyon içeriği.');
                    },
                    {'text': '<a href="">İkinci İtem</a>',
                    click: function () {
                    alertİkinci İtem Fonksiyon İçeriği.');
                    },
                         }],
                     'location': 'l_mid',
                     'fixing':'left',
                     'bgcolor': '#a3ff00',
                     'txtcolor': '#ab07a5',
                     'style': 'grid',
                     'header': 'Baslik1'
             }
            * */
            /*params ->fixing=>right or left,
            menu=>|text[],function click|,
            bgcolor,
            header,
            txtcolor,
            type=>|grid, line|,
            location=>|right, r_mid, r_bottom, left, l_mid, l_bottom|,
            zindex.
         */
            multiMenu : function (params) {
                var myRandom=random;
                random++;//HER YENİ MENU'EKLENDİĞİNDE RANDOM DEĞERİ 1 ARTIRILIR.

                //MENU VE İÇERİSİNDE KULLANILANLARIN ŞABLONLARI.
                var mMSideBar='<div class="mM_side" data-id='+myRandom+'><p></p></div>';
                var mMenu='<div class="mMenu" data-id='+myRandom+'></div>';
                var mMenuBorder='<div class="mMenuBorder" data-id='+myRandom+'></div>';
                var mMItemGrid='<div class="mMItemGrid" data-id='+myRandom+'></div>';
                var mMItemLine='<div class="mMItemLine" data-id='+myRandom+'></div>';
                var mMFixingButton='<div class="mMFixing" data-id='+myRandom+'></div>'

                    //PARAMETRELERE VARSAYILAN DEĞER ATAMA.
                     params = $.extend({
                     menu       : [{
                         text     : 'FIRST',
                         click    : function () {
                             alert('FIRST');
                         }
                     },
                         {
                         text     : 'SECOND',
                         click    : function () {
                             alert('SECOND');
                         }
                     },
                         {
                             text     : 'THIRD',
                             click    : function () {
                                 alert('THIRD');
                             }
                         }
                        ,{
                             text     : 'FOURTH',
                             click    : function () {
                                 alert('FOURTH');
                             }
                         }
                     ],
                     bgcolor: 'black',
                     header:'multiMenu',
                     txtcolor: 'white',
                     location:'left',
                     fixing:'right',
                     style:'grid',//
                     zindex:500,

                }, params);

                 //Z INDEX'LERİ DÜZENLEYEN FONKSİYON.PARAMETRE OLARAK MENU(mMenu) ALIR.
                 function editZindex(param) {

                     var menuCount=$('.mMenu').length;//SAYFADAKİ mMenu SAYISI.
                     var oldZindex=param.css('z-index');//ÜZERİNE TIKLANILAN MENU'NÜN Z-INDEX'İ.

                     param.css({'z-index':menuCount});//ÜZERİNE TIKLANINLAN MENÜ'YE Z-INDEX OLARAK MENU SAYISI ATANIR.
                     //HER BİR mMenu KONTROL EDİLİR VE GEREKİRSE Z-INDEX'İ DEĞİŞTİRİLİR.
                     $('.mMenu').each(function () {
                         //EĞER mMenu'NUN Z-INDEX'İ TIKLANILAN mMenu'nun Z-INDEX'İNDEN BÜYÜKSE Z-INDEX DEĞERİ 1 AZALTILIR.
                         if($(this).css('z-index')>oldZindex){
                             var tmpZindex=$(this).css('z-index')-1;
                            $(this).css({'z-index':tmpZindex});
                             var data=$(this).css('left')+","+$(this).css('top')+","+tmpZindex+","+$(this).css('visibility');
                             $.cookie('mM'+$(this).attr('data-id'),data,{expires:365});
                         }

                         //EĞER Z-INDEX TIKLANILAN MENU'NUN Z-INDEXİYLE AYNI İSE VE BU İKİ MENU FARKLI İSE, MENU'NÜN Z-INDEX DEĞERİ 1 AZALTILIR.
                         else if($(this).css('z-index')==oldZindex&&$(this).attr('data-id')!=param.attr('data-id')){
                             var tmpZindex=$(this).css('z-index')-1;

                             $(this).css({'z-index':tmpZindex});
                             var data=$(this).css('left')+","+$(this).css('top')+","+tmpZindex+","+$(this).css('visibility');
                             $.cookie('mM'+$(this).attr('data-id'),data,{expires:365});
                         }
                     });
                 }
                 //PARAMETRE OLARAK THIS VERİLİR.
                 function createMenu(param) {
                     param.append(mMenu);//BODY'E mMenu ŞABLONUNU EKLER.
                     $('.mMenu[data-id='+myRandom+']').append(mMenuBorder);//mMenu İÇİNE mMenuBorder ŞABLONUNU EKLER.
                     $('.mMenuBorder[data-id='+myRandom+']').append(params.header);
                     $('.mMenuBorder[data-id='+myRandom+']').append(mMFixingButton);
                     $('.mMenu[data-id='+myRandom+']').css({'z-index':params.zindex});//MENU'NUN Z-INDEX'İNİ ATAMA.
                     $('.mM_side[data-id='+myRandom+']').children('p').append(params.header);//SIDE BAR'A İSTENİLEN YAZIYI YAZMA.

                     if($.cookie("mM"+myRandom)!=null){
                         //EĞER MENU'NÜN DATA-ID 'Sİ COOKIE'DE KAYITLI İSE, KONUMUNU VE Z-INDEX'İNİ
                         //COOKIE'DEKİ KAYITLARA GÖRE AYARLAMA.
                         var data=$.cookie("mM"+myRandom).split(',');
                         $('.mMenu[data-id='+myRandom+']').css({'left':data[0],'top':data[1],'z-index':data[2],'visibility':data[3]});
                     }



                     //MENU'NÜN İÇİNE İSTENİLEN İTEMLERİ EKLEME.
                     $.each(params.menu, function (index, value) {

                         //MENU TİPİ GRID İSE
                         if(params.style=='grid') {
                             $('.mMenu[data-id=' + myRandom + ']').append(mMItemGrid);
                             var x = $('.mMenu .mMItemGrid').last();


                         }
                         //MENU TİPİ LINE İSE
                         else{
                             $('.mMenu[data-id=' + myRandom + ']').append(mMItemLine);
                             var x = $('.mMenu .mMItemLine').last();
                             //X=SON EKLENİLEN İTEM.
                         }

                         //SON EKLENİLEN ITEM'İN İÇİNE İSTENİLEN TEXT DEĞERİNİ EKLEME.
                         x.html(value.text);
                         //SON EKLENİLEN ITEM'İN İÇİNE İSTENİLEN CLİCK FONKSİYONUNU EKLEME.
                         x.bind("click", value.click);
                     });

                     //MENU'YE SÜRÜKLEME ÖZELLİĞİ KAZANDIRMA.
                     $('.mMenu[data-id='+myRandom+']').draggable({handle:'.mMenuBorder',
                     stop:function () {
                         //SÜRÜKLEME BİTTİĞİNDE. MENU'NUN KONUMUNU VE Z-INDEX'INI COOKIE'YE KAYDETME.
                         var data=$(this).css('left')+","+$(this).css('top')+","+$(this).css('z-index')+","+$(this).css('visibility');
                         $.cookie('mM'+myRandom,data,{expires:365});

                     }
                     });

                 }
                 //SIDE BAR'I BODY İÇİNE EKLEME.
                this.append(mMSideBar);

                //GİRİLEN DEĞER'E GÖRE SİDE BAR'I KONUMLANDIRMA 119-132.
                $('.mM_side[data-id='+myRandom+']').css({'background-color':params.bgcolor,'color':params.txtcolor});
                if(params.location=='l_mid')
                    $('.mM_side[data-id='+myRandom+']').css({'left':'0','top':'42vh'});
                else if (params.location=='r_mid'){
                    $('.mM_side[data-id='+myRandom+']').css({'left':'98.5vw','top':'42vh','border-radius': '5vmax 0 0 15vmax'});
                }
                else if (params.location=='l_bottom')
                    $('.mM_side[data-id='+myRandom+']').css({'left':'0','top':'84vh'});
                else if (params.location=='r_bottom')
                    $('.mM_side[data-id='+myRandom+']').css({'left':'98.5vw','top':'84vh','border-radius': '5vmax 0 0 15vmax'});
                else if (params.location=='left')
                    $('.mM_side[data-id='+myRandom+']').css({'left':'0','top':'0'});
                else if (params.location=='right')
                    $('.mM_side[data-id='+myRandom+']').css({'left':'98.5vw','top':'0','border-radius': '5vmax 0 0 15vmax'});
                //MENU OLUŞTURMA FONKSİYONU ÇAĞIRILDI.
                createMenu(this);

                //SIDE BAR'A CLICK ÖZELLİĞİ BAĞLANDI.
                $('.mM_side[data-id='+myRandom+']').bind('click',function () {
                    //SIDE BAR'A TIKLANILDIĞINDA MENU GÖRÜNÜR DURUMDAYSA GİZLENİR, GİZLİ DURUMDAYSA GÖSTERİLİR.
                    var rnd=$(this).attr('data-id');
                    if($('.mMenu[data-id='+rnd+']').css('visibility')=='visible')
                        $('.mMenu[data-id='+rnd+']').css('visibility','hidden');
                    else
                        $('.mMenu[data-id='+rnd+']').css('visibility','visible');

                    var data=$('.mMenu[data-id='+myRandom+']').css('left')+","+$('.mMenu[data-id='+myRandom+']').css('top')+","+$('.mMenu[data-id='+myRandom+']').css('z-index')+","+$('.mMenu[data-id='+myRandom+']').css('visibility');
                    $.cookie('mM'+myRandom,data,{expires:365});
                });

                //MENU UZERINE BASILDIĞINDA ÇALIŞACAK KOD.
                $('.mMenu[data-id='+myRandom+']').bind('mousedown',function () {
                    editZindex($(this));
                });

                //mMFixing(PIN RESMİ)'E TIKLANINCA ÇALIŞACAK KOD.
                $('.mMFixing[data-id='+myRandom+']').bind('click',function () {
                    //EĞER MENU'NUN SABİTLEME YERİ SOL İSE MENU EKRANIN SOL'UNA YASLANIR.
                    if(params.fixing=='left'){
                        $('.mMenu[data-id='+myRandom+']').css({'left':'0','top':'0'});
                    }
                    //EĞER MENU'NUN SABİTLEME YERİ SOL DEĞİL İSE MENU EKRANIN SAĞ'INA YASLANIR.
                    else
                        $('.mMenu[data-id='+myRandom+']').css({'right':'0','top':'0','left':''});
                   //YENİ KONUM COOKIE'YE KAYDEDİLİR.

                    var data=$('.mMenu[data-id='+myRandom+']').css('left')+","+$(this).css('top')+","+$(this).css('z-index')+","+$(this).css('visibility');
                    $.cookie('mM'+myRandom,data,{expires:365});
                });


            }


        });}(jQuery));
