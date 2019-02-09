import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loader-flow',
  templateUrl: './loader-flow.component.html',
  styleUrls: ['./loader-flow.component.scss']
})
export class LoaderFlowComponent implements OnInit {

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor() {

    this.lottieConfig = {
      path: '../../assets/animations/load-flow.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  ngOnInit() {
    this.anim.play();
  }

}
