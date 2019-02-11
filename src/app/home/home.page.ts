import { NgModule, Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  positionSubscription: any;
  today: any
  data: any
  x: any;
  y: any;
  markers = [];
  marker: any;

  constructor(
    private router: Router,
    private flashlight: Flashlight,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    public plt: Platform,
    private diagnostic: Diagnostic,
    public menuCtrl: MenuController,
    private authService: AuthServiceService, 
    private toastCtrl: ToastController) {


  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  dropMark() {
    this.plt.ready().then(() => {
      let options = { enableHighAccuracy: true, maximumAge: 10000 };
      console.log("Fetching............");
      this.geolocation.getCurrentPosition(options).then((resp) => {
        this.marker.setMap(null);
        this.addMarker(resp.coords.latitude, resp.coords.longitude);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((er) => {
      console.log(er);
    });
  }

  // addMarker(lat, lng){
  //   this.marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: new google.maps.LatLng(lat, lng),
  //     icon: '../../assets/icon/pin.png'
  //   });
  // }

  getLocation() {
    this.plt.ready().then(() => {
      let options = { enableHighAccuracy: true, maximumAge: 10000 };
      console.log("Fetching............");
      this.geolocation.getCurrentPosition(options).then((resp) => {
        this.loadMap(resp.coords.latitude, resp.coords.longitude);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((er) => {
      console.log(er);
    });
  }

  ngOnInit() {

    let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); }
    let errorCallback = (e) => console.error(e);

    if (this.plt.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => {
          console.log(result.hasPermission);
          if (result.hasPermission == true) {
            this.getGeolocation();
          } else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(data => {
              console.log(data);
              if(data.hasPermission == true){
                this.getGeolocation();
              }
            })
          }
        },
      err => {
        console.log("permission error =>", err);
      });
    }else{

      this.plt.ready().then(() => {
        // this.diagnostic.isLocationAvailable().then( state => {
          // console.log(state);
          this.getGeolocation();
        // }).catch(e => console.error(e));
      });
    }
  }
  getGeolocation() {
    this.getLocation();
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.x = data.coords.latitude;
      this.y = data.coords.longitude;

      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let image = 'assets/imgs/blue-bike.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
  }
  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: '../../assets/icon/pin.png'
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  loadMap(lat, lng) {

    let latLng = new google.maps.LatLng(lat, lng);

    var stylez = [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { saturation: -100 } // <-- THIS
        ]
      }
    ];

    var mapOptions = {
      zoom: 15,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      overviewMapControl: false,
      center: latLng,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
      }
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var mapType = new google.maps.StyledMapType(stylez, { name: "Grayscale" });
    this.map.mapTypes.set('tehgrayz', mapType);
    this.map.setMapTypeId('tehgrayz');

  }

  switch() {
    console.log("haha");
    this.router.navigateByUrl('scanner');
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

}
