import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BrickItem} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(newPost: BrickItem, region: string): Observable<BrickItem> {
    return this.httpClient.post<BrickItem>(`${environment.firebaseConfig.databaseURL}/${region}.json`, newPost);
  }

  getAllFromRegion(region: string): Observable<BrickItem[]> {
    return this.httpClient.get<any>(`${environment.firebaseConfig.databaseURL}/${region}.json`)
      .pipe(
        map((response: { [key: string]: BrickItem }) =>
          response ? Object.keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            })) : null
        )
      );
  }

  getItemById(id: string, region: string): Observable<BrickItem> {
    return this.httpClient.get<BrickItem>(`${environment.firebaseConfig.databaseURL}/${region}/${id}.json`);
  }

  getItemDescription(descriptionId: string, region: string): Observable<{description: string, mainId: string}> {
    return this.httpClient.get<{description: string, mainId: string}>(
      `${environment.firebaseConfig.databaseURL}/description/${region}/${descriptionId}.json`
    );
  }

  updateInfo(id: string, region: string, item: BrickItem): Observable<BrickItem> {
    return this.httpClient.patch<BrickItem>(`${environment.firebaseConfig.databaseURL}/${region}/${id}.json`, item);
  }

}
