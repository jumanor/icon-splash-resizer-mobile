var ig  = require('imagemagick');
var wrench = require('wrench');
var fs     = require('fs');
var path   = require('path');
var exec   = require("child_process").exec
var path = require("path");

var splash = [
      // Landscape
      //{ name: 'drawable-land-ldpi/screen.png',  width: 320,  height: 200  },
      //{ name: 'drawable-land-mdpi/screen.png',  width: 480,  height: 320  },
      //{ name: 'drawable-land-hdpi/screen.png',  width: 800,  height: 480  },
      //{ name: 'drawable-land-xhdpi/screen.png', width: 1280, height: 720  },
      //{ name: 'drawable-land-xxhdpi/screen.png', width: 1600, height: 960  },
      //{ name: 'drawable-land-xxxhdpi/screen.png', width: 1920, height: 1280  },
      // Portrait
      { name: 'drawable-port-ldpi/screen.png',  width: 200,  height: 320  },
      { name: 'drawable-port-mdpi/screen.png',  width: 320,  height: 480  },
      { name: 'drawable-port-hdpi/screen.png',  width: 480,  height: 800  },
      { name: 'drawable-port-xhdpi/screen.png', width: 720,  height: 1280 },
      { name: 'drawable-port-xxhdpi/screen.png', width: 960, height: 1600  },
      { name: 'drawable-port-xxxhdpi/screen.png', width: 1280, height: 1920  }
    ];
var splashIOS = [
      // iPhone
      { name: 'Default~iphone.png',            width: 320,  height: 480  },//ok
      { name: 'Default@2x~iphone.png',         width: 640,  height: 960  },//ok
      { name: 'Default-568h@2x~iphone.png',    width: 640,  height: 1136 },//ok
      { name: 'Default-667h.png',              width: 750,  height: 1334 },//ok
      { name: 'Default-736h.png',              width: 1242, height: 2208 },//ok
      { name: 'Default-2436h.png',              width: 1125, height: 2436 },//ok
      //{ name: 'Default-Landscape-736h.png',    width: 2208, height: 1242 },
      // iPad
      { name: 'Default-Portrait~ipad.png',     width: 768,  height: 1024 },//ok
      { name: 'Default-Portrait@2x~ipad.png',  width: 1536, height: 2048 },//ok
      //{ name: 'Default-Landscape~ipad.png',    width: 1024, height: 768  },
      //{ name: 'Default-Landscape@2x~ipad.png', width: 2048, height: 1536 }
    ];    
var icon =[
      { name : 'mipmap/icon.png',       size : 96 },
      { name : 'mipmap-hdpi/icon.png',  size : 72 },
      { name : 'mipmap-ldpi/icon.png',  size : 36 },
      { name : 'mipmap-mdpi/icon.png',  size : 48 },
      { name : 'mipmap-xhdpi/icon.png', size : 96 },
      { name : 'mipmap-xxhdpi/icon.png', size : 144 },
      { name : 'mipmap-xxxhdpi/icon.png', size : 192 }
    ];
 var iconIOS =[
      { name : 'icon-40.png',       size : 40  },
      { name : 'icon-40@2x.png',    size : 80  },
      { name : 'icon-50.png',       size : 50  },
      { name : 'icon-50@2x.png',    size : 100 },
      { name : 'icon-60.png',       size : 60  },
      { name : 'icon-60@2x.png',    size : 120 },
      { name : 'icon-60@3x.png',    size : 180 },
      { name : 'icon-72.png',       size : 72  },
      { name : 'icon-72@2x.png',    size : 144 },
      { name : 'icon-76.png',       size : 76  },
      { name : 'icon-76@2x.png',    size : 152 },
      { name : 'icon-small.png',    size : 29  },
      { name : 'icon-small@2x.png', size : 58  },
      { name : 'icon-small@3x.png', size : 87  },
      { name : 'icon.png',          size : 57  },
      { name : 'icon@2x.png',       size : 114 },
      { name : 'icon-83.5@2x.png',  size : 167 },

      
      { name : 'icon-20.png',       size : 20  },
      { name : 'icon-20@2x.png',    size : 40  },
      { name : 'icon-20@3x.png',    size : 60  },
      { name : 'icon-24@2x.png',    size : 48  },
      { name : 'icon-27.5@2x.png',  size : 55  },
      { name : 'icon-29.png',       size : 29  },
      { name : 'icon-29@2x.png',    size : 58  },
      { name : 'icon-29@3x.png',    size : 87  },
      { name : 'icon-44@2x.png',    size : 88  },
      { name : 'icon-167.png',    size : 167  },
      { name : 'icon-86@2x.png',    size : 172  },
      { name : 'icon-98@2x.png',    size : 196  },
      { name : 'icon-1024.png',     size : 1024  }
      

    ];   
///////////////
function crearSplash(srcPath,dstPath,splash){

		ig.crop({
	    srcPath: srcPath,
	    dstPath: dstPath,
	    quality: 1,
	    format: 'png',
	    width: splash.width,
	    height: splash.height
	  } , function(err, stdout, stderr){
	    if (err) {
	      console.log(err);

	    } else {
	      
	      console.log(splash.name + ' created');
	    }
	  });
}
function crearIcon(srcPath,dstPath,icon){

		ig.crop({
	    srcPath: srcPath,
	    dstPath: dstPath,
	    quality: 1,
	    format: 'png',
	    width: icon.size,
	    height: icon.size
	  } , function(err, stdout, stderr){
	    if (err) {
	            console.log(err);

	    } else {
	      
      	      console.log(icon.name + ' created');

                  if(icon.name=="icon-1024.png"){

                        convertIconToFlatten(dstPath);//Necesario para ios
                  }

	    }
	  });
}
function convertIconToFlatten(ruta){

      exec(`convert -flatten ${ruta} ${ruta}`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }

          var file=path.basename(ruta);
          console.log(file+" flatten created");

      });

}
/////////////////////////////////////////////////////////////////////////////////////////////////

var RUTA_PADRE=__dirname;

var dst=RUTA_PADRE+"/output/android/splash/";
var src=RUTA_PADRE+"/splash.png";

for(var i=0;i<splash.length;i++){
      
      var dsttt = path.dirname(dst+splash[i].name);

      if (!fs.existsSync(dsttt)) {
            wrench.mkdirSyncRecursive(dsttt);
      }
    crearSplash(src,dst+splash[i].name,splash[i]);
}
var dst=RUTA_PADRE+"/output/ios/splash/";
for(var i=0;i<splashIOS.length;i++){
      
      var dsttt = path.dirname(dst+splashIOS[i].name);

      if (!fs.existsSync(dsttt)) {
            wrench.mkdirSyncRecursive(dsttt);
      }
    crearSplash(src,dst+splashIOS[i].name,splashIOS[i]);
}
///////////////
/*
* CREAMOS ICONOS ANDROID AND IOS
*/
var dstIcon=RUTA_PADRE+"/output/android/icon/";
var srcIcon=RUTA_PADRE+"/icon.png";

for(var i=0;i<icon.length;i++){
      
      var dsttt = path.dirname(dstIcon+icon[i].name);

      if (!fs.existsSync(dsttt)) {
            wrench.mkdirSyncRecursive(dsttt);
      }
    crearIcon(srcIcon,dstIcon+icon[i].name,icon[i]);
}
var dstIcon=RUTA_PADRE+"/output/ios/icon/";

for(var i=0;i<iconIOS.length;i++){
      
      var dsttt = path.dirname(dstIcon+iconIOS[i].name);

      if (!fs.existsSync(dsttt)) {
            wrench.mkdirSyncRecursive(dsttt);
      }
    crearIcon(srcIcon,dstIcon+iconIOS[i].name,iconIOS[i]);
}


////////////////////////////////////////////////////////////////////////////////////////////////////





