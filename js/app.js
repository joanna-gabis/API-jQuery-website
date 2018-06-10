$(function() {

  let apikey = 'QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
  let mainUrl = 'https://api.nasa.gov/planetary/apod?api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
  let galleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
  let newgalleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';

  loadWelcomeImage();
  loadGallery();

  function loadWelcomeImage() {
      $.ajax({
          url: mainUrl,
          dataType: 'json',
          method: 'GET'
      }).done(function(response) {
          let welcomeSection = $('.welcomesection');
          welcomeSection.css('background-image', `url('${response.hdurl}')`);
          console.log(response.hdurl);
      }).fail(function(error){
          console.log(error);
      })
  }

  function loadGallery() {
    $.ajax({
      url: galleryUrl,
      dataType: 'json',
      method: 'GET'
    }).done(function(response) {
      let img = $('img');
      let photos = response.photos;

      for(let i=0; i<6; i++) {
        $(img[i]).attr('src', `${photos[i].img_src}`);
      }
  }).fail(function(error) {
      console.log(error);
  })
}

let counter = 6;

  $('button').on('click', function() {
    $.ajax({
      url: galleryUrl,
      dataType: 'json',
      method: 'GET'
    }).done(function(response) {
      let photos = response.photos;

      if(counter<photos.length) {
        for(let i=0; i<6; i++) {
          $('.gallery').append(function() {
            counter++;
            return `<img src='${photos[counter].img_src}'>`;
          })
        }
      } else {
        $('.gallery').append('<p class="lastPics">No more pictures to load</p>');
      }
    }).fail(function(error) {
        console.log(error);
    })
  });
});
