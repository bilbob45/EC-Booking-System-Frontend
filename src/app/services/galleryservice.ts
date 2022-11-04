import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Image } from '../domain/image';

@Injectable()
export class GalleryService {
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http
      .get<any>('assets/galleria/data/gallery.json')
      .toPromise()
      .then((res) => <Image[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
