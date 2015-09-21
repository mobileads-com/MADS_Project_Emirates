(function ($) {
    $.fn.leadgen = function (options) {

        var _this = this;

        /* Default options */
        this.settings = $.extend({
            email : 'ninjoe@mobileads.com',
            input : [],
            tabId : 1,
            studioId : 1, 
            userId : 140,
            successCallback : function(jsonObject){},
            errorCallback : function(jsonObject){}
        }, options);

        this.fields = [];

        this.submitForm = function (e) {
            e.preventDefault();

            for (var i = 0; i < _this.settings.input.length; i++) {
                _this.fields.push( {"fieldname" : _this.settings.input[i].fieldname, "value" : $(_this.settings.input[i].value).val()} );
            }
            
            $.ajax({
                type: 'get',
                url: 'http://www.mobileads.com/api/save_lf?element='+JSON.stringify(_this.fields),
                dataType : 'jsonp',
                cache : true,
                data : {contactEmail : _this.settings.email, gotDatas : 0, "user-id" : _this.settings.userId, "studio-id" : _this.settings.studioId, "tab-id" : _this.settings.tabId},
                success: _this.settings.successCallback,
                error: function (jsonObject) {
                    
                    if (jsonObject.status == 200) {
                        _this.settings.successCallback(jsonObject);
                    } else {
                        _this.settings.errorCallback(jsonObject);
                    }
                }
            });	


        }
        this.on('submit', this.submitForm);


    }
} (jQuery));
function leadGenCallback(object){}