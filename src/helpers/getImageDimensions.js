export default function getImageDimensions (url) {
    return new Promise ( function (resolve, reject) {
      var image = new Image()
      image.onload = function(){
        resolve({ width: image.width, height: image.height})
      };
      image.src = url
    })
}