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
  circle: any;
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
    private toastCtrl: ToastController, ) {
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
        let location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
        this.centerMap(location);
        this.markerSetPosition(location);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((er) => {
      console.log(er);
    });
  }

  getLocation() {
    this.plt.ready().then(() => {
      let options = { enableHighAccuracy: true, maximumAge: 10000 };
      console.log("Fetching............");
      this.geolocation.getCurrentPosition(options).then((resp) => {
        this.loadMap(resp.coords.latitude, resp.coords.longitude);
        let updatelocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.addMarker(updatelocation);
        this.getGeolocation();
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
            this.getLocation();
          } else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(data => {
              console.log(data);
              if (data.hasPermission == true) {
                this.getLocation();
              }
            })
          }
        },
        err => {
          console.log("permission error =>", err);
        });
    } else {

      this.plt.ready().then(() => {
        this.getLocation();
      });
    }
  }

  getGeolocation() {

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.x = data.coords.latitude;
      this.y = data.coords.longitude;


      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      this.markerSetPosition(updatelocation);
    });
  }


  markerSetPosition(latlng) {
    this.marker.setPosition(latlng);
  }

  addMarker(location) {
    var circle = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#3e6bff',
      fillOpacity: 1,
      scale: 6,
      strokeColor: '#fff',
      strokeWeight: 0,
      strokeOpacity: 0,

    }
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: circle,
    });
    this.circle = new google.maps.Circle({
      strokeColor: '#3e6bff',
      strokeOpacity: 0,
      strokeWeight: 2,
      fillColor: '#3e6bff',
      fillOpacity: 0.2,
      map: this.map,
      center: location,
      radius: 30
    })
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
      zoom: 17,
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

  centerMap(latLng) {
    this.map.setZoom(15);
    this.map.panTo(latLng);
  }

  switch() {
    this.router.navigateByUrl('scanner');
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

}
