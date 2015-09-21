(function ($) {
    $.fn.leadgen = function (options) {

        var _this = this;

        /* Default options */
        this.settings = $.extend({
            email : 'ninjoe@mobileads.com',
            input : [],
            tabId : 1,
            studioId : 1, 
            userId : 140
        }, options);

        this.fields = [];

        this.submitForm = function (e) {
            e.preventDefault();

            for (var i = 0; i < _this.settings.input.length; i++) {
                _this.fields.push( {"fieldname" : _this.settings.input[i].fieldname, "value" : $(_this.settings.input[i].value).val()} );
            }
            console.log( JSON.stringify(_this.fields));



            $.ajaxSetup({'cache':true});
            $.ajax({
                type: 'get',
                url: 'http://www.mobileads.com/api/save_lf?element='+JSON.stringify(_this.fields),
                dataType : 'jsonp',
                data : {contactEmail : _this.settings.email, gotDatas : 0, "user-id" : _this.settings.userId, "studio-id" : _this.settings.studioId, "tab-id" : _this.settings.tabId},
                success: function(jsonObject){
                    console.log(jsonObject);
                    if(jsonObject.status == true){


                    }else{

                    }
                },
                error: function(){

                }
            });	


        }



        this.on('submit', this.submitForm);


    }
} (jQuery));
function leadGenCallback(object){}