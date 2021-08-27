angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngStorage','ui.bootstrap','ionic-material','ionMdInput','starter.services','ngPrint','ionic-toast'])
<!--angular.module('starter', ['ionic', 'starter.controllers','ngStorage','ui.bootstrap','ionic-material','ionMdInput'])-->
.run(function($ionicPlatform,$rootScope,$state,$http,$ionicHistory,$ionicScrollDelegate,$ionicPopup,$location) {
   $rootScope.searchlist = {}; 
    $rootScope.searchlistfare = {}; 
    $rootScope.selectedPrinter ={};

    $rootScope.printers = [];
  $rootScope.emulation = {
      value: ''};
  $rootScope.printerStatus;
	 $rootScope.deviceinfo={};
	// $rootScope.ip_address={};
     $rootScope.forget_password=function (){
        $ionicPopup.show({
        template: 'Enter your email address below.<label class="item item-input" style="  height: 34px; margin-top: 10px;"><input  type="email"  /></label>',
        title: 'Forget Password',
        subTitle: ' ',
        scope: $rootScope,
        buttons: [
        {text: 'Send',
        type: 'button-clear dark-blue'},
        { text: 'Cancel' ,
        type: 'button-clear main-bg-color'},]
        });
    };

   $ionicPlatform.ready(function() {
	   
if (window.applicationPreferences) {
      // org.apache.cordova.statusbar required
     window.applicationPreferences.get("referrer", function(value) {
 // alert("Value is " + value);
    $rootScope.referalvalue=value; 
 }, function(error) {
 // alert("Error! " + JSON.stringify(error));
});
    }
	
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

	  var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
deviceInfo.get(
   function(result) {
      console.log("Device info = " + result);
	   $rootScope.deviceinfo= result;

	   /*$scope.result=Response.data;
	  alert($scope.result);*/

   },function() {
      console.log("error");
});
    }
	else{
		 $rootScope.deviceinfo= '{"account0Name":"Phone contacts","account0Type":"com.sonyericsson.localcontacts","account1Name":"vprasath5@gmail.com","account1Type":"com.google","account2Name":"riya_poulose","account2Type":"com.skype.contacts.sync","deviceID":"356872067678229","phoneNo":"TM.ERROR","netCountry":"TM.ERROR","netName":"TM.ERROR","simNo":"TM.ERROR","simCountry":"TM.ERROR","simName":"TM.ERROR"}';
	}
	
	
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
   


  });


/*************** increment-decrement function ****************/
$rootScope.valueKids=1;
 $rootScope.valueAdults=1;
 $rootScope.valueBabies=1;
  $rootScope.increment_val= function(type) {
    if (type=='Kids'&&$rootScope.valueKids >= 0) $rootScope.valueKids++;
    if (type=='Adults'&&$rootScope.valueAdults >= 0) $rootScope.valueAdults++;
    if (type=='Babies'&&$rootScope.valueBabies >= 0) $rootScope.valueBabies++;
  };
  $rootScope.decrement_val = function(type) {
    //if ($rootScope.value > 0)  $rootScope.value--;
    if (type=='Kids'&&$rootScope.valueKids > 0) $rootScope.valueKids--;
    if (type=='Adults'&&$rootScope.valueAdults > 0) $rootScope.valueAdults--;
    if (type=='Babies'&&$rootScope.valueBabies > 0) $rootScope.valueBabies--;

  };

$rootScope.confirmMsg=function(index){
    $rootScope.show_msg=index
} 
 $rootScope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
 /*************** group function ****************/
 $rootScope.groups = [
    {id: 1, items: [{ subName: 'SubBubbles1'}]},

    {id: 2, items: [{ subName: 'SubBubbles1'}]},

    {id: 3, items: [{ subName: 'SubBubbles1'}]},

    {id: 4, items: [{ subName: 'SubBubbles1'}]},

    {id: 5, items: [{ subName: 'SubBubbles1'}]},

    {id: 6, items: [{ subName: 'SubBubbles1'}]},

    {id: 7, items: [{ subName: 'SubBubbles1'}]}
  ];


    /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $rootScope.toggleGroup = function(group) {
    if ($rootScope.isGroupShown(group)) {
      $rootScope.shownGroup = null;
    } else {
      $rootScope.shownGroup = group;
    }
  };
  $rootScope.isGroupShown = function(group) {
    return $rootScope.shownGroup === group;
  };

/*************** location function ****************/
  $rootScope.goto=function(url){
      $location.path(url)
  }

/*************** active function ****************/
$rootScope.activeIcon=1    
 $rootScope.activeTab=function(index){
      $rootScope.activeIcon=index 
  }  
/*************** repeat array ****************/


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
  
 

})





.config(function($cordovaInAppBrowserProvider) {

   var defaultOptions = {
     location: 'no',
     clearcache: 'no',
     toolbar: 'no'
  };


//document.addEventListener("deviceready", onDeviceReady, false);



  document.addEventListener("deviceready", function () {
    $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);
  }, false);
})

.factory('MediaSrv', function($q, $ionicPlatform, $window){
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onStop, onError, onStatus){
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaStatus = {
        code: 0,
        text: getStatusMessage(0)
      };
      var mediaSuccess = function(){
        mediaStatus.code = 4;
        mediaStatus.text = getStatusMessage(4);
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        mediaStatus.code = status;
        mediaStatus.text = getStatusMessage(status);
        if(onStatus){onStatus(status);}
      };

      if($ionicPlatform.is('android')){src = '/android_asset/www/' + src;}
      var media = new $window.Media(src, mediaSuccess, mediaError, mediaStatus);
      media.status = mediaStatus;
      defer.resolve(media);
    });
    return defer.promise;
  }

  function _logError(src, err){
    console.error('MediaSrv error', {
      code: err.code,
      text: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }

  return service;
})
.factory('$localstorage', ['$window', function($window) {
    return {
    set: function(key, value) {
     $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
     return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
     $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
     return JSON.parse($window.localStorage[key] || '{}');
    }
    }
}])
.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
   $httpProvider.defaults.timeout = 25000;
  $stateProvider

   .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      cache: false
  })
   .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl',
      cache: false
  })
   .state('forgetpass', {
      url: '/forgetpass',
      templateUrl: 'templates/forgetpass.html',
      controller: 'forgetpassCtrl',
      cache: false
  })
 .state('app', {
		cache: false,
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    onEnter: function($state, Auth){
       if(!Auth.isLoggedIn()){
          $state.go('login');
       }
   }
  })
 .state('app.portDiscovery', {
	 cache: false,
      url: '/portDiscovery',
      views: {
        'menuContent': {
          templateUrl: 'templates/portDiscovery.html',
          controller: 'portDiscoveryCtrl'
        }
      }
})
 .state('app.home', {
	 cache: false,
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
})	
 .state('app.home1', {
	 cache: false,
      url: '/home1/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/home1.html',
          controller: 'home1Ctrl'
        }
      }
})	
 .state('app.home2', {
	 cache: false,
      url: '/home2/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/home2.html',
          controller: 'home2Ctrl'
        }
      }
})
 .state('app.home3', {
	 cache: false,
      url: '/home3/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/home3.html',
          controller: 'home3Ctrl'
        }
      }
})		
 .state('app.home4', {
	 cache: false,
      url: '/home4/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/home4.html',
          controller: 'home4Ctrl'
        }
      }
})
.state('app.edittime', {
	 cache: false,
      url: '/edittime',
      views: {
        'menuContent': {
          templateUrl: 'templates/edittime.html',
          controller: 'edittimeCtrl'
        }
      }
    })
.state('app.editorder', {
	 cache: false,
      url: '/editorder',
      views: {
        'menuContent': {
          templateUrl: 'templates/editorder.html',
          controller: 'editorderCtrl'
        }
      }
    })
 .state('app.help', {
	 cache: false,
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'helpCtrl'
        }
      }
    })
	 .state('app.stores', {
	 cache: false,
      url: '/stores',
      views: {
        'menuContent': {
          templateUrl: 'templates/stores.html',
          controller: 'storesCtrl'
        }
      }
    })	
	 .state('app.menuitems', {
	 cache: false,
      url: '/menuitems',
      views: {
        'menuContent': {
          templateUrl: 'templates/menuitems.html',
          controller: 'menuitemsCtrl'
        }
      }
    })
	 .state('app.menuitemdetails', {
	 cache: false,
      url: '/menuitemdetails/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/menuitemdetails.html',
          controller: 'menuitemdetailsCtrl'
        }
      }
    })
	 .state('app.storesedit', {
	 cache: false,
      url: '/storesedit/:rid',
      views: {
        'menuContent': {
          templateUrl: 'templates/storesedit.html',
          controller: 'storeseditCtrl'
        }
      }
    })
	 .state('app.setting', {
	 cache: false,
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html',
          controller: 'settingCtrl'
        }
      }
    })
	 .state('app.testprint', {
	 cache: false,
      url: '/testprint/:currentlySelectedPrinter',
      views: {
        'menuContent': {
          templateUrl: 'templates/testprint.html',
          controller: 'testprintCtrl'
        }
      }
    })
	 .state('app.loading', {
	 cache: false,
      url: '/loading',
      views: {
        'menuContent': {
          templateUrl: 'templates/loading.html',
          controller: 'loadingCtrl'
        }
      }
    })
	 .state('app.appversion', {
	 cache: false,
      url: '/appversion',
      views: {
        'menuContent': {
          templateUrl: 'templates/appversion.html',
          controller: 'appversionCtrl'
        }
      }
    })
	 .state('app.settingpos', {
	 cache: false,
      url: '/settingpos',
      views: {
        'menuContent': {
          templateUrl: 'templates/settingpos.html',
          controller: 'settingposCtrl'
        }
      }
    })
	 .state('app.settingposprit', {
	 cache: false,
      url: '/settingposprit',
      views: {
        'menuContent': {
          templateUrl: 'templates/settingposprit.html',
          controller: 'settingpospritCtrl'
        }
      }
    })
		 .state('app.report', {
	 cache: false,
      url: '/report',
      views: {
        'menuContent': {
          templateUrl: 'templates/report.html',
          controller: 'reportCtrl'
        }
      }
    })
    .state('app.bluetoothlist', {
  cache: false,
     url: '/bluetoothlist',
     views: {
       'menuContent': {
         templateUrl: 'templates/bluetoothlist.html',
         controller: 'bluetoothlistCtrl'
       }
     }
   })
   .state('app.settingposeletcedprinter', {
 cache: false,
    url: '/settingposeletcedprinter',
    views: {
      'menuContent': {
        templateUrl: 'templates/settingposeletcedprinter.html',
        controller: 'settingposeletcedprinterCtrl'
      }
    }
  })
   .state('app.termsandcondition', {
 cache: false,
    url: '/termsandcondition',
    views: {
      'menuContent': {
        templateUrl: 'templates/termsandcondition.html',
        controller: 'termsandconditionCtrl'
      }
    }
  })
   .state('app.privacypolicy', {
 cache: false,
    url: '/privacypolicy',
    views: {
      'menuContent': {
        templateUrl: 'templates/privacypolicy.html',
        controller: 'privacypolicyCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('app/home');
})
.factory('sharedCartService', ['$ionicPopup',function($ionicPopup){
 
 var cartObj = {};
 cartObj.cart=[];
 cartObj.whishlist=[];
 cartObj.total_amount=0;
 cartObj.total_qty=0;
 
 cartObj.cart.add=function(id,image,name,price,qty,tax,shippingcharge){
  if( cartObj.cart.find(id)!=-1 ){
   var alertPopup = $ionicPopup.alert({
                title: 'Product Already Added',
                template: 'Increase the qty from the cart'
            });
  }
  else{
      cartObj.cart.push( { "cart_item_id": id , "cart_item_image": image , "cart_item_name": name , "cart_item_price": price , "cart_item_qty": qty , "cart_item_tax": tax , "cart_item_shippingcharge": shippingcharge } );
   cartObj.total_qty+=1; 
   cartObj.total_amount+=parseInt(price); 
  }
 };
 
 
  
 cartObj.whishlist.addTowishlist=function(id,image,name,price,qty,tax,shippingcharge,agentid){
  if( cartObj.whishlist.find(id)!=-1 ){
   var alertPopup = $ionicPopup.alert({
                title: 'Product Already Added',
                template: 'Product Already Added in Wishlist'
            });
  }
  else{
      cartObj.whishlist.push( { "cart_item_id": id , "cart_item_image": image , "cart_item_name": name , "cart_item_price": price , "cart_item_qty": qty , "cart_item_tax": tax , "cart_item_shippingcharge": shippingcharge, "agentid":agentid} );
   
  }
 };
 
cartObj.cart.checkout=function(id,image,name,price,qty,tax,shippingcharge){
  if( cartObj.cart.find(id)!=-1 ){
 }
  else{
      cartObj.cart.push( { "cart_item_id": id , "cart_item_image": image , "cart_item_name": name , "cart_item_price": price , "cart_item_qty": qty , "cart_item_tax": tax , "cart_item_shippingcharge": shippingcharge } );
   cartObj.total_qty+=1;
   cartObj.total_amount+=parseInt(price);
  }
 };
 cartObj.cart.find=function(id){ 
  var result=-1;
  for( var i = 0, len = cartObj.cart.length; i < len; i++ ) {
   if( cartObj.cart[i].cart_item_id === id ) {
    result = i;
    break;
   }
  }
  return result;
 };
 
 cartObj.whishlist.find=function(id){ 
  var result=-1;
  for( var i = 0, len = cartObj.whishlist.length; i < len; i++ ) {
   if( cartObj.whishlist[i].cart_item_id === id ) {
    result = i;
    break;
   }
  }
  return result;
 };
 
 cartObj.cart.drop=function(id){
  var temp=cartObj.cart[cartObj.cart.find(id)];
  cartObj.total_qty-= parseInt(temp.cart_item_qty);
  cartObj.total_amount-=( parseInt(temp.cart_item_qty) * parseInt(temp.cart_item_price) );
  cartObj.cart.splice(cartObj.cart.find(id), 1);

 };
 
  cartObj.whishlist.drop=function(id){
  var temp=cartObj.whishlist[cartObj.whishlist.find(id)];
  cartObj.whishlist.splice(cartObj.whishlist.find(id), 1);

 };
 cartObj.cart.increment=function(id){
   cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
   cartObj.total_qty+= 1;
   cartObj.total_amount+=( parseInt( cartObj.cart[cartObj.cart.find(id)].cart_item_price) ); 
 };
 
 cartObj.cart.decrement=function(id){
   cartObj.cart[cartObj.cart.find(id)].cart_item_qty-=1;
   
   if(cartObj.cart[cartObj.cart.find(id)].cart_item_qty == 0){
   cartObj.cart.splice(cartObj.cart[cartObj.cart.find(id)], 1);
   
   //for dynamic updation
   cartObj.total_qty+= 0;
   cartObj.total_amount+=0;
   }
   else{
   cartObj.total_qty-= 1;
   cartObj.total_amount-= parseInt( cartObj.cart[cartObj.cart.find(id)].cart_item_price) ; 
  }
 };
 return cartObj;
}])

.directive('back', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }])
	.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}])
	.directive('sbMin', function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attributes, ngModel){

      function minimum(value){
        if(!isNaN(value)){
          var validity = Number(value) >= attributes.sbMin;
          ngModel.$setValidity('min-value', validity)
        }
        return value;
      }
      
      ngModel.$parsers.push(minimum); 
      ngModel.$formatters.push(minimum); 
    }
    
  };
})
.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
})
.filter('toArray', function() {

    return function(obj) {      
     return JSON.parse(obj);
   }
  })
. directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }])  
  .directive('accordion', function (){
  return{
    scope:{
      ngModel: '='
    },
    restrict: 'A',
    link: function(scope, el, attr){
      var target = document.querySelectorAll('.panel-collapse')
      angular.forEach(el, function(key, val){
        key.addEventListener('click', function(){
          angular.forEach(target, function(tgt, val){
            tgt.classList.remove('in');
          })
          key.nextElementSibling.classList.add('in');
      }, false)
      })
    }
  }
})
.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
})

.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            var clean = val.replace(/[^0-9\.]/g, '');
            var decimalCheck = clean.split('.');

            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    })
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9\.]/g,''); 



                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
.factory('Auth', function ($localStorage) {
   return {
            isLoggedIn: function () {
                  if($localStorage.session == 1){
                    return true;
                    console.log('returning true');
                  }
                    else{
                      console.log('returning false');
                     return false;
                   }
              }
      }

   });
   
   
