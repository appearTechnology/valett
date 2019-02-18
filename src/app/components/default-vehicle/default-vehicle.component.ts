import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-vehicle',
  templateUrl: './default-vehicle.component.html',
  styleUrls: ['./default-vehicle.component.scss']
})
export class DefaultVehicleComponent implements OnInit {

  uid: string;
  subs: Subscription[] = [];
  vehicles: Vehicle[];
  vehicle: Vehicle;

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthServiceService,
  ) { }

  ngOnInit() {
  }

}
