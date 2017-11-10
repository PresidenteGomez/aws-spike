myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;

  // vm.getImage = function getHtml(template) {
  //   return template.join('\n');
  // };
  // listAlbums();
  
  // Initialize the Cognito Sync client

  vm.BucketName = 'grownorthspike2'; //there might be a problem with this--> change it back to vars instead of vm
  // vm.bucketRegion = 'us-west-2';
  vm.IdentityPoolId = 'us-east-1:74f522d9-c3e2-4952-8929-f913a3b9b4aa';

  AWS.config.region = 'us-east-1'; // Region
  
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:74f522d9-c3e2-4952-8929-f913a3b9b4aa',
  });

  vm.s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: vm.BucketName }
  });


  // Adding Photos to an Album
  vm.addAPhoto = function addPhoto() {
    console.log(AWS.config.credentials);
    var files = document.getElementById('photoupload').files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    var file = files[0];
    var fileName = file.name;
    // var albumPhotosKey = encodeURIComponent() + '//';
    

    var photoKey = fileName;
    vm.s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }, function (err, data) {
      if (err) {
        return alert('There was an error uploading your photo: ', err.message);
      }
      alert('Successfully uploaded photo.');
      // viewAlbum(albumName);
    });
  };

  // Deleting a Photo
  // vm.deleteAPhoto = function deletePhoto(photoKey) {
  //   vm.s3.deleteObject({ Key: photoKey }, function (err, data) {
  //     if (err) {
  //       return alert('There was an error deleting your photo: ', err.message);
  //     }
  //     alert('Successfully deleted photo.');
  //     // viewAlbum(albumName);
  //   });
  // };



});

 // /*
  //   Function to carry out the actual PUT request to S3 using the signed request from the app.
  // */
  // function uploadFile(file, signedRequest, url) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('PUT', signedRequest);
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         document.getElementById('preview').src = url;
  //         document.getElementById('avatar-url').value = url;
  //       }
  //       else {
  //         alert('Could not upload file.');
  //       }
  //     }
  //   };
  //   xhr.send(file);
  // }
  // /*
  //   Function to get the temporary signed request from the app.
  //   If request successful, continue to upload the file using this signed
  //   request.
  // */
  // function getSignedRequest(file) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         const response = JSON.parse(xhr.responseText);
  //         uploadFile(file, response.signedRequest, response.url);
  //       }
  //       else {
  //         alert('Could not get signed URL.');
  //       }
  //     }
  //   };
  //   xhr.send();
  // }
  // /*
  //  Function called when file input updated. If there is a file selected, then
  //  start upload procedure by asking for a signed request from the app.
  // */
  // function initUpload() {
  //   const files = document.getElementById('file-input').files;
  //   const file = files[0];
  //   if (file == null) {
  //     return alert('No file selected.');
  //   }
  //   getSignedRequest(file);
  // }
  // /*
  //  Bind listeners when the page loads.
  // */
  // (() => {
  //   document.getElementById('file-input').onchange = initUpload;
  // })();