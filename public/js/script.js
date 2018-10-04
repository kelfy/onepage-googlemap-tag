var m = window.m || {};
var DHL = window.DHL || {} ;

var currentMarker = {};



DHL.selectors = {
    //font page 
    map :    $('#map'),
    startBtn: $('.start-btn'),
    //main page
    landing: $('.landing'),
    cloudleft: $('.cloudLeft'),
    cloudright:$('.cloudRight'),
    mainPage:$('.main-layer'),
    // Beach Menu
    beachMenuBtn:$('.beach-menu-btn'),
    beachMenu:$('.beach-menu-dropdown'),
    location:$('.beach-location'),
    markerConfirm:$('.marker-confirm'),
    //marker control
    markerYes:$('.markerYes'), // confirm to add marker here
    tagForm:$('.tagForm'), // tag form
    tagFormResult:$('.tagFormResult'),
    tagFormResultContent:$('.tagFormResult .content'),
    //sls layer
    choose_beach_btn:$('.choose-beach-btn'),
    choose_beach_layer:$('.choose-beach-layer'),
    beach_dropdown:$('.beach-dropdown-toggle'),
    beach_dropdown_menu:$('.beach-dropdown-menu'),
    sls_layer:$('.sls-layer'),
    close_sls_layer:$('.close-sls-layer'),
    sls_layer_toggle:$('.sls-layer-toggle'),
    how_to_play_btn:$('.how-to-play-btn'),
    how_to_play_layer:$('.how-to-play-layer'),
    viemo_layer:$('.viemo-layer'),
    playVideoBtn:$('.play-video-btn'),
    got_it_btn:$('.got-it-btn'),
    //drop a flag  layer
    select_beach_question:$('.select-beach-question'),
    select_beach_answer:$('.select-beach-answer'),
    beach_select:$('.beach-select-item'),
    take_to_beach:$('button.take-to-beach'),
    beach_title:$('.beach-title'),
    take_to_beach:$('.take-to-beach'),
    //clue layer
    clue_layer:$('.clue-layer'),
    clue_btn:$('.clues-btn'),
    //ntc layer
    rule_layer:$('.rule-tnc-layer'),
    rule_btn:$('.rules-btn'),
    //share-notice-layer 
    shareNoticeLayer:$('.share-notice-layer'),
    tooMuchLayer:$('.too-much-layer'),

    //tag form
    fname:$('#fname'),
    lname:$('#lname'),
    phone:$('#phone'),
    email:$('#email'),
    lat:$('#lat'),
    lng:$('#lng'),
    submitTagForm:$("#submitTagForm"),
    closeTagFormResult:$('.closeTagFormResult'),
    submitTag:$("#submitTag"),

    //layer close btn
    layerCloseBtn : $('.layer-close-btn'),
    viemoCloseBtn : $('.vimeo-close'),
    videoLayerCloseBtn : $('.video-layer-close-btn'),

    //marker tag
    deleteTag : $('.delete-tag-btn'),
    removeTagLayer : $('.remove-tag-layer'),
    removeTagBtn : $('.remove-tag-btn'),

    //Facebook share btn
    btnShare : $('.btnShare'),

    console : $('.console')


}


$(document).ready(function() {
    DHL.hideLanding();
    initialize(); 
    
    //set cookies

    if (!$.cookie('flag')) {
        // have cookie
        $.cookie("flag", 0, { expires: 360 });
        $.cookie("share", false, { expires: 360 });
       } else {
        // no cookie
        $.cookie("flag", 0, { expires: 360 });
        $.cookie("share", false, { expires: 360 });
       }

    
    //define share button function
    $('.btnShare').click(function(){
        elem = $(this);
        $.cookie("share", true);
        u.shareNoticeLayerClose();
        console.log(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));
        postToFeed(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));
        return false;
    });

});


function initialize(){
    m.init();
    DHL.beachMenu();
    DHL.beachTeleport();
    DHL.validate_and_submit_TagForm();
   
    
}

// hide landing page ------------------------------------------
DHL.hideLanding = function(){
    DHL.selectors.startBtn.on('click',function(e){
        e.preventDefault();
        DHL.selectors.landing.addClass('fade-out');
        DHL.selectors.cloudleft.addClass('fade-out');
        DHL.selectors.cloudright.addClass('fade-out');

        setTimeout(function(){
            DHL.selectors.landing.addClass('hidden');
            DHL.selectors.cloudleft.addClass('hidden');
            DHL.selectors.cloudright.addClass('hidden');
            DHL.selectors.mainPage.removeClass('hidden');
            m.map.set('draggable', true);
        },300);

        setTimeout(function(){
            //DHL.selectors.choose_beach_layer.toggleClass('hidden');
            u.dropFlagLayerOpen();
        },500);
    })
    


    //play video
    DHL.selectors.playVideoBtn.on('click',function(e){
        
        e.preventDefault();        
        DHL.selectors.landing.addClass('fade-out');
        DHL.selectors.cloudleft.addClass('fade-out');
        DHL.selectors.cloudright.addClass('fade-out');
        setTimeout(function(){
            DHL.selectors.landing.addClass('hidden');
            DHL.selectors.cloudleft.addClass('hidden');
            DHL.selectors.cloudright.addClass('hidden');
            DHL.selectors.mainPage.removeClass('hidden');
            m.map.set('draggable', true);
        },300);

        u.videoLayerOpen();
    });

}


// -----------------------------------------------------------


// DHL menu control------------------------------------------

// UI---------------------------------------------------------
u = {
    markerConfirmClose : function(){
        DHL.selectors.markerConfirm.css('display','none');
        DHL.selectors.markerConfirm.css('top','0px');
        DHL.selectors.markerConfirm.css('left','50%');
        DHL.selectors.markerConfirm.css('opacity','0');
    },
    beachMenuClose : function(){
        if(!DHL.selectors.beachMenu.hasClass('hidden')){
            DHL.selectors.beachMenuBtn.removeClass('up');
            DHL.selectors.beachMenu.addClass('hidden');
        }
    },
    videoLayerOpen : function(){
        u.layerReset();

        if(DHL.selectors.viemo_layer.hasClass('hidden')){
            DHL.selectors.viemo_layer.addClass('up');
            DHL.selectors.viemo_layer.removeClass('hidden');
        }
    },
    videoLayerClose : function(){
        if(!DHL.selectors.viemo_layer.hasClass('hidden')){            
            DHL.selectors.viemo_layer.addClass('hidden');
        }  
    },
    beachMenuOpen : function(){
        u.layerReset();
        
        if(DHL.selectors.beachMenu.hasClass('hidden')){
            DHL.selectors.beachMenuBtn.addClass('up');
            DHL.selectors.beachMenu.removeClass('hidden');
        }
    },
    selectBeachClose : function(){
        if(!DHL.selectors.select_beach_answer.hasClass('hidden')){            
            DHL.selectors.select_beach_answer.addClass('hidden');
        }
    },
    beachMenuToggle : function(){
        if(DHL.selectors.beachMenu.hasClass('hidden')){
            u.beachMenuOpen();
        }else{
            u.beachMenuClose();
        }
    },
    tagFormOpen : function(){
        
        if(DHL.selectors.tagForm.hasClass('hidden')){
            DHL.selectors.tagForm.removeClass('hidden');
            setTimeout(function(){            
                DHL.selectors.tagForm.css('opacity',1);
            },300)
        }
    },
    tagFormClose : function(){
        if(!DHL.selectors.tagForm.hasClass('hidden')){
            DHL.selectors.tagForm.css('opacity',0);
            DHL.selectors.tagForm.addClass('hidden');           
        }
    },
    slsLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.sls_layer.hasClass('hidden')){
            DHL.selectors.sls_layer.removeClass('hidden');
        }
    }, 
    slsLayerClose : function(){
        if(!DHL.selectors.sls_layer.hasClass('hidden')){
            DHL.selectors.sls_layer.addClass('hidden');
        }
    },
    slsLayerToggle : function(){
        if(DHL.selectors.sls_layer.hasClass('hidden')){
            u.slsLayerOpen();
        }else{
            u.slsLayerClose();
        }
    },
    dropFlagLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.choose_beach_layer.hasClass('hidden')){
            DHL.selectors.choose_beach_layer.removeClass('hidden');
        }
    },
    dropFlagLayerClose : function(){
        if(!DHL.selectors.choose_beach_layer.hasClass('hidden')){
            DHL.selectors.choose_beach_layer.addClass('hidden');
        }
    },
    dropFlagLayerToggle : function(){
        u.layerReset();
        if(DHL.selectors.choose_beach_layer.hasClass('hidden')){
            u.dropFlagLayerOpen();
        }else{
            u.dropFlagLayerClose();
        }
    },
    clueLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.clue_layer.hasClass('hidden')){
            DHL.selectors.clue_layer.removeClass('hidden');
        }
    },
    clueLayerClose : function(){
        if(!DHL.selectors.clue_layer.hasClass('hidden')){
            DHL.selectors.clue_layer.addClass('hidden');
        }
    },
    clueLayerToggle : function(){
        if(DHL.selectors.clue_layer.hasClass('hidden')){
            u.clueLayerOpen();
        }else{
            u.clueLayerClose();
        }
    },
    howToPlayLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.how_to_play_layer.hasClass('hidden')){
            DHL.selectors.how_to_play_layer.removeClass('hidden'); 
        }
    },
    howToPlayLayerClose : function(){
        if(!DHL.selectors.how_to_play_layer.hasClass('hidden')){
            DHL.selectors.how_to_play_layer.addClass('hidden'); 
        }
    },
    ruleLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.rule_layer.hasClass('hidden')){
            DHL.selectors.rule_layer.removeClass('hidden'); 
        }
    },
    ruleLayerClose : function(){
        if(!DHL.selectors.rule_layer.hasClass('hidden')){
            DHL.selectors.rule_layer.addClass('hidden'); 
        }
    },
    ruleLayerToggle : function(){
        if(DHL.selectors.rule_layer.hasClass('hidden')){
            u.ruleLayerOpen();
        }else{
            u.ruleLayerClose();
        }
    },
    removeTagLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.removeTagLayer.hasClass('hidden')){
            DHL.selectors.removeTagLayer.removeClass('hidden'); 
        }
    },
    removeTagLayerClose : function(){
        if(!DHL.selectors.removeTagLayer.hasClass('hidden')){
            DHL.selectors.removeTagLayer.addClass('hidden'); 
        }
    },
    tooMuchLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.tooMuchLayer.hasClass('hidden')){
            DHL.selectors.tooMuchLayer.removeClass('hidden'); 
            m.map.set('draggable', false);
        }
    },
    tooMuchLayerClose : function(){
        //u.layerReset();
        if(!DHL.selectors.tooMuchLayer.hasClass('hidden')){
            DHL.selectors.tooMuchLayer.addClass('hidden'); 
        }
    },

    shareNoticeLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.shareNoticeLayer.hasClass('hidden')){
            DHL.selectors.shareNoticeLayer.removeClass('hidden'); 
        }
    },

    


    shareNoticeLayerClose : function(){
        if(!DHL.selectors.shareNoticeLayer.hasClass('hidden')){
            DHL.selectors.shareNoticeLayer.addClass('hidden'); 
        }
    },

    tooMuchTagLayerOpen : function(){
        u.layerReset();
        if(DHL.selectors.shareNoticeLayer.hasClass('hidden')){
            DHL.selectors.shareNoticeLayer.removeClass('hidden'); 
        }
        
        //DHL.tagFormResultOpen();
        m.hideMarker();
    },


    layerReset : function(){
        //close all layer and marker
        u.markerConfirmClose();
        u.beachMenuClose();
        u.selectBeachClose();
        u.tagFormClose();
        u.slsLayerClose();
        u.dropFlagLayerClose();        
        u.clueLayerClose();
        u.howToPlayLayerClose();
        u.ruleLayerClose();
        u.removeTagLayerClose();
        u.tooMuchLayerClose();
        u.videoLayerClose();

    },

    levaeMarkerAlone : function(){
        //close all layer except marker
        u.beachMenuClose();
        u.tagFormClose();
        u.slsLayerClose();
        u.dropFlagLayerClose();        
        u.clueLayerClose();
        u.howToPlayLayerClose();
        u.ruleLayerClose();
        u.removeTagLayerClose();
    }

}

DHL.beachMenu = function(){
    DHL.selectors.beachMenuBtn.on('click',function(e){
        e.preventDefault();
        u.beachMenuToggle();
        m.hideMarker();
    })

    DHL.selectors.markerYes.on('click',function(e){
        e.preventDefault();
        u.levaeMarkerAlone();
        DHL.selectors.markerYes.addClass('hidden');
        u.tagFormOpen();
        //DHL.tagFormToggle();
    });

    DHL.selectors.sls_layer_toggle.on('click',function(e){
        e.preventDefault();

        u.slsLayerToggle();
        
    });
    DHL.selectors.close_sls_layer.on('click',function(e){
        e.preventDefault();
        u.slsLayerClose();
    });

    DHL.selectors.clue_btn.on('click',function(e){
        e.preventDefault();
        u.clueLayerToggle();
        
    });

    DHL.selectors.rule_btn.on('click',function(e){
        e.preventDefault();
        u.ruleLayerToggle();

    });
    

    
    
    // choose beach layer -----------------------------------------
    
    // DHL.selectors.beach_dropdown.on('click',function(e){
    //     //u.beachMenuToggle();
    //     DHL.selectors.beach_dropdown_menu.toggleClass('hidden');
    // });

    DHL.selectors.choose_beach_btn.on('click',function(e){
        e.preventDefault();        
        u.dropFlagLayerToggle();

    })

    DHL.selectors.beach_select.on('click',function(e){
        e.preventDefault();

        DHL.selectors.choose_beach_layer.toggleClass('hidden');

        var lat = $(this).data("lat");
        var lng = $(this).data("lng");
        var beach = $(this).data('beach');
        //console.log("lat:"+lat+" lng:"+lng);
        DHL.selectors.take_to_beach.attr('lat',lat);
        DHL.selectors.take_to_beach.attr('lng',lng);
        //DHL.selectors.select_beach_question.toggleClass('hidden');
        DHL.selectors.select_beach_answer.toggleClass('hidden');
        DHL.selectors.beach_title.html("YOU SELECTED: "+beach);
    })

    DHL.selectors.take_to_beach.on('click',function(e){
        e.preventDefault();
        //DHL.selectors.select_beach_question.toggleClass('hidden');
        DHL.selectors.select_beach_answer.toggleClass('hidden');
        //DHL.selectors.choose_beach_layer.toggleClass('hidden');

        var lat = $(this).attr('lat');        
        var lng = $(this).attr('lng');        
        var latlng = new google.maps.LatLng(lat, lng);
        
        //teleport
        m.map.setCenter(latlng);
        m.map.setZoom(16);



    });


    // how to play layer ------------------------------------------
    DHL.selectors.how_to_play_btn.on('click',function(e){

        if(DHL.selectors.how_to_play_layer.hasClass('hidden')){
            u.howToPlayLayerOpen();
        }else{
            u.howToPlayLayerClose();
        }
        
    });
    DHL.selectors.got_it_btn.on('click',function(e){
        e.preventDefault();        
        u.howToPlayLayerClose();
        //DHL.selectors.how_to_play_layer.toggleClass('hidden');
    });


    //Tag form control --------------------------------------------
    DHL.selectors.closeTagFormResult.on('click',function(e){
        e.preventDefault();
        
        DHL.tagFormResultClose();
    });


    //Layer close btn

    DHL.selectors.viemoCloseBtn.on('click',function(e){
        //alert('hi');
        vimeoWrap = $('.vimeo-wrap').html();
        $('.viemo-wrap').empty();
        $('.viemo-wrap').html(vimeoWrap);
        //vimeoWrap.html(vimeoWrap.html());

    });

    DHL.selectors.layerCloseBtn.on('click',function(e){
        e.preventDefault();
        $(this).parent(".overlay").addClass('hidden');
        m.map.set('draggable', true);
    });

    
   
} 

DHL.beachTeleport = function(){
    DHL.selectors.location.click(function(e){        
        
        var lat = $(this).data('lat');        
        var lng = $(this).data('lng');        
        var latlng = new google.maps.LatLng(lat, lng);
        
        //teleport
        m.map.setCenter(latlng);
        m.map.setZoom(16);
        //close beach menu
        u.beachMenuClose();        
        m.hideMarker();

    })
}

DHL.tagFormToggle = function(){
    if (DHL.selectors.tagForm.hasClass('hidden')){
        DHL.selectors.tagForm.css('opacity',0);
        DHL.selectors.tagForm.removeClass('hidden');
        
        setTimeout(function(){
            DHL.selectors.tagForm.css('opacity',10);
        },300)
    }else{
        DHL.selectors.tagForm.css('opacity',0);
        setTimeout(function(){            
            DHL.selectors.tagForm.addClass('hidden');
        },300)
        
    }

}

DHL.tagFormResultOpen = function(){
    if (DHL.selectors.tagFormResult.hasClass('hidden')){
        DHL.selectors.tagFormResult.css('opacity',0);
        DHL.selectors.tagFormResult.removeClass('hidden');
        
        setTimeout(function(){
            DHL.selectors.tagFormResult.css('opacity',10);
        },300)
    }
}

DHL.tagFormResultClose = function(){
    
    DHL.selectors.tagFormResult.css('opacity',0);
    setTimeout(function(){            
        DHL.selectors.tagFormResult.addClass('hidden');
    },300)
    
    
}


DHL.validate_and_submit_TagForm = function(){

    DHL.selectors.submitTagForm.submit(function(e){
        e.preventDefault();
    });
    // submit Form
    DHL.selectors.submitTag.on('click',function(e){
        //e.preventDefault();

        if( DHL.selectors.fname.val() != "" && DHL.selectors.lname.val() != "" && DHL.selectors.phone.val() != "" && DHL.selectors.email.val() != ''){
            
            var tagInfo = {
                fname:DHL.selectors.fname.val(),
                lname:DHL.selectors.lname.val(),
                phone:DHL.selectors.phone.val(),
                email:DHL.selectors.email.val(),     
                lat:DHL.selectors.lat.val(),
                lng:DHL.selectors.lng.val()
            }



            $.ajax({
            type: "POST",
            dataType: "json",
            url: '/addtag',
            data: tagInfo,
            success: function (data) {	
                // Inserting html into the result div on success
                if(data.status == 'over'){
                    u.tooMuchLayerOpen();
                    $.cookie('flag', 2);
                }
                
                if(data.status == 'success'){
                    DHL.successAddTag();
                    //update cookies
                    var flagCookie = parseInt($.cookie('flag'));
                    $.cookie('flag', flagCookie+1);


                    //add the tag on current map
                    var lat = parseFloat(tagInfo.lat);
                    var lng = parseFloat(tagInfo.lng);
                    var current_position = {lat: lat, lng: lng};                   

                    var infowindow = new google.maps.InfoWindow({
                        content: tagInfo.fname+"'s Flag"
                    });
                    

                    
                    var marker = new MarkerWithLabel({
                        position: current_position,
                        map: m.map,
                        icon: m.flag,                                                
                        labelContent: tagInfo.fname+"'s Flag   "+'<img class="delete-tag" src="images/cross.svg" />',
                        labelAnchor: new google.maps.Point(-30, 15),
                        labelClass: "flag-label", // your desired CSS class
                        animation: google.maps.Animation.DROP,
                        labelInBackground: true
                    });
                    //set marker ID
                    marker.set('id',data.id);
                    //push into Global marker holder
                    currentMarker[data.id] = marker;
                    
                    google.maps.event.addListener(marker, 'click', function() {
                        var markerId = marker.get('id');
                        //assign marker id into remove tag button
                        DHL.selectors.removeTagBtn.attr('id',markerId);
                        u.removeTagLayerOpen();
                    });

                   
                    
                    // google.maps.event.addListener(marker, 'mouseout', function() {
                    //     infowindow.close();
                    // });


                    


                }
                
                    
            },
            error: function(jqXHR, text, error){
                // Displaying if there are any errors
                console.log(error);
                
            }
            
        });    
        }


    });

}

function YourOnSubmitFn(){

    DHL.validate_and_submit_TagForm();
    
}



DHL.selectors.removeTagBtn.on('click',function(e){
    var id = $(this).attr('id');           
    m.removeMarkerOnMap(id);             
    m.removeMarkerFromDB(id);                       
    u.removeTagLayerClose();
});

    


DHL.selectors.deleteTag.on('click',function(e){
    e.preventDefault();
    
})



DHL.successAddTag = function(){
    DHL.tagFormToggle();
    DHL.selectors.tagFormResultContent.html("<h2>Well done, you have successfully added your flag.</h2>");
    DHL.tagFormResultOpen();
    m.hideMarker();    
}


// -----------------------------------------------------------
m = {
   
    maxZoom : 18,
    minZoom : 6,
    regionZoom : 11,
    flag: {
        url:'/images/flag.png',
        anchor: new google.maps.Point(0,0)
    },
    flagHover: {
        url:'/images/flag-hover.png',
        anchor: new google.maps.Point(10,10)
    },
    init : function(){
        // wellingon. Center of the map
        var wellington = {lat: -41.28648, lng: 174.776217}; 
        // define boundry
        m.nzLatLngSW = new google.maps.LatLng({ lat: -46.753022, lng: 167.246648 }),
		m.nzLatLngNE = new google.maps.LatLng({ lat: -34.926455, lng: 177.523847 }),
		m.nzBounds = new google.maps.LatLngBounds( m.nzLatLngSW, m.nzLatLngNE ),
        // draw the map
        m.map = new google.maps.Map(document.getElementById('map'), {
            zoom: m.minZoom,
            center: wellington,
            disableDefaultUI: true,
            clickableIcons: false,
            draggable : false,
            minZoom: m.minZoom,
            maxZoom: m.maxZoom,
            gestureHandling: 'greedy',
            mapTypeId: google.maps.MapTypeId.HYBRID,
            draggableCursor: 'url(https://dhl.netguru.net.nz/images/cross.png) 12.5 12.5, move'
        });
        
        
        m.map.fitBounds(m.nzBounds);

        //add init markers
        $.getJSON("/gettag",function(data){
            //var items = [];
            
            var markers = [];

            $.each( data, function( key, val ) {
                var lat = parseFloat(val.lat);
                var lng = parseFloat(val.lng);
                var current_position = {lat: lat, lng: lng};

                var infowindow = new google.maps.InfoWindow({
                    content: val.fname+"'s Flag"
                  });
                

                // show in console    
               
                // var marker = new google.maps.Marker({
                //     position: current_position,
                //     map: m.map,
                //     animation: google.maps.Animation.DROP,
                //     icon: m.flag
                // });
                var marker = new MarkerWithLabel({
                    position: current_position,
                    map: m.map,
                    icon: m.flag,                    
                    labelAnchor: new google.maps.Point(-45, 5),
                    labelContent: val.fname+"'s Flag",
                    labelClass: "flag-label-old", // your desired CSS class
                    animation: google.maps.Animation.DROP,
                    labelInBackground: true,
                    labelVisible:false
                });



                markers.push(marker);

                google.maps.event.addListener(marker, 'mouseover', function() {
                    marker.set('labelVisible',true);
                    marker.set('icon',m.flagHover);
                });
        
                google.maps.event.addListener(marker, 'mouseout', function() {
                    marker.set('icon',m.flag);
                    marker.set('labelVisible',false);
                });

            });
            
            var markerCluster = new MarkerClusterer(m.map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                 maxZoom: 10
             });



        });
        
        
        //event listener---------------------------------------------------------------------

        //marker listener
        google.maps.event.addListener(m.map,'click',function(event){
            //console.log(event.latLng);
            //console.log(event.latLng.lat());
            //console.log('get zoom:');
            //console.log(m.map.getZoom());

            u.layerReset();
            //DHL.selectors.console.html('zoom level:'+m.map.getZoom());

            var checkMapUI = true;

            if (m.map.getZoom() < 10)  {
                checkMapUI = false;
            }

            if (!DHL.selectors.sls_layer.hasClass('hidden')){
                checkMapUI = false;
            }
            if (!DHL.selectors.how_to_play_layer.hasClass('hidden')){
                checkMapUI = false;
            }
            
            if (checkMapUI){
                
                var flagCookie = parseInt($.cookie('flag'));
                var shareCookie = $.cookie('share');
                
                // console.log('flagCookie: '+flagCookie);
                // console.log('shareCookie: '+shareCookie);

                //never add, never share
                if ((flagCookie == 0) && (shareCookie == 'false')){
                    m.DropMarker(event);
                }
                if ((flagCookie == 0) && (shareCookie == 'true')){
                    m.DropMarker(event);
                }
                //added once, never share
                if ((flagCookie == 1) && (shareCookie == 'false')){
                    u.shareNoticeLayerOpen();
                }
                //added once and shared
                if ((flagCookie == 1) && (shareCookie == 'true')){
                    m.DropMarker(event);
                    //$.cookie('share',false);
                }
                //added twice
                if (flagCookie == 2){
                   u.tooMuchLayerOpen();
               }
                
                
            }
            
        })

        google.maps.event.addListener(m.map,'drag',function(){
            m.hideMarker();
            m.hideTagForm();
            //DHL.tagFormToggle();
        })
        var zoomInButton = document.getElementById("zoom-in");
        google.maps.event.addDomListener(zoomInButton, 'click', function() {
            m.map.setZoom(m.map.getZoom() + 1);
          });
            
        // Setup the click event listener - zoomOut
        var zoomOutButton = document.getElementById("zoom-out");
        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
             m.map.setZoom(m.map.getZoom() - 1);
        });  

      

      
    },
    
    DropMarker : function(event){
        //var mouseX = event.pixel.x - 15;  // convert absolute coords
        //var mouseY = event.pixel.y - 15;// into relative ones...
        var mouseX = event.pixel.x;  // convert absolute coords
        var mouseY = event.pixel.y;// into relative ones...
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        //console.log(mouseX);
        //console.log(mouseY);
        //m.map.setCenter(event.latLng);
        
        if (!DHL.selectors.tagForm.hasClass('hidden')){
            !DHL.selectors.tagForm.addClass('hidden');
        }


        DHL.selectors.markerConfirm.css('display','block');
        DHL.selectors.markerYes.removeClass('hidden');
        DHL.selectors.lat.val(lat);
        DHL.selectors.lng.val(lng);

        console.log(lat+','+lng);

        setTimeout(function(){
            DHL.selectors.markerConfirm.css('opacity',1);            
            DHL.selectors.markerConfirm.css('top',mouseY-15);
            DHL.selectors.markerConfirm.css('left',mouseX-15);
        },100);
    },

    hideMarker : function(){
        if(DHL.selectors.markerConfirm.css('display') == 'block'){
            DHL.selectors.markerConfirm.css('opacity',0);
            setTimeout(function(){
                DHL.selectors.markerConfirm.css('display','none');
            },100)
        }
    },

    hideTagForm : function(){
        if (!DHL.selectors.tagForm.hasClass('hidden')){
            DHL.selectors.tagForm.addClass('hidden');
        }
    },
    
    placeMarker : function(location){
        var marker = new google.maps.Marker({
            position: location, 
            map: m.map,            
            icon: m.flag,
            animation: google.maps.Animation.DROP
        });        
    },

    removeMarkerOnMap : function(id){
        marker = currentMarker[id];
        marker.setMap(null);
        var flagCookie = parseInt($.cookie('flag'));
        $.cookie('flag', flagCookie-1);
                
    },
    removeMarkerFromDB : function(id){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: '/removetag',
            data:{
               id:id                   
            },
            success: function (data) {	
                $(this).attr('id','');
                
            },
            error: function(jqXHR, text, error){

            }
        });    
    }
}




