$(function() {

    let apikey = 'QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
    let url = 'https://api.nasa.gov/planetary/apod?api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
    let galleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';
    let newgalleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=QeeMRAVNyMFecA7nXQFKpOSMZuoI3JdCxC31wUBd';

    loadWelcomeImage();
    loadGallery();

    function loadWelcomeImage() {
        $.ajax({
            url: url,
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
            let img = $('.img');
            let photos = response.photos;

            img.append(function() {
                let randomPhoto = photos[Math.floor(Math.random() * photos.length)];

               return `<img src=${randomPhoto.img_src}>`;
            })
        }).fail(function(error) {
            console.log(error);
        })
    }

    $('button').on('click', function() {

       let newPics =  $('.gallerypart').eq(0).clone().appendTo($('.gallery')).find('.img');
       newPics.empty();

        $.ajax({
            url: newgalleryUrl,
            dataType: 'json',
            method: 'GET'
        }).done(function(response) {
            let photos = response.photos;
            console.log(photos);

            newPics.append(function() {
                let randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                return `<img src=${randomPhoto.img_src}>`;
            })
        }).fail(function(error) {
            console.log(error);
        })
    });










});