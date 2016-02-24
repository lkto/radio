document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
  document.addEventListener("backbutton", backButtonEvent, false);
}
   function backButtonEvent() {
    var currentUrl=window.location.hash;
     if(currentUrl=='#/login' || currentUrl=='#/'){
      console.log("prueba")
      alert("prueba");
  window.close ();
 }
else{
  history.go(-1);
  navigator.app.backhistory();
  }
}

