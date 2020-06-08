import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(
    ConnectionStatus.Offline
  );

  constructor(
    private network: Network,
    private toastController: ToastController,
    private platform: Platform
  ) {
    //Preload ToastController
    toastController.create();

    this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Online) {
          this.status.next(ConnectionStatus.Offline);
          this.toastController
            .create({
              message: `You're now Offline!`,
              duration: 3000,
              position: 'bottom'
            })
            .then((t) => t.present());
        }
      });

      this.network.onConnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Offline) {
          this.status.next(ConnectionStatus.Online);
          this.toastController
            .create({
              message: `You're now Online!`,
              duration: 3000,
              position: 'bottom'
            })
            .then((t) => t.present());
        }
      });

      this.status.next(
        this.network.type !== 'none'
          ? ConnectionStatus.Online
          : ConnectionStatus.Offline
      );
    });
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
