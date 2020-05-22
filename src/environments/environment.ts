// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
	//apiUrl: "http://10.10.0.7:82/api/",
	apiUrl:"http://localhost/backend/app/public/index.php/api/",
	dirImgsSubidas: 'http://localhost/backend/app/public/subidos/' ,
	//dirImgsSubidas: 'http://10.10.0.7:81/',
  pyApiUrl:  'http://127.0.0.1:5000/api/',
  nodeURL:  'http://127.0.0.1:3000/api/', 

/*   apiUrl: 'http://10.1.1.32/sisglobal/backend/public/index.php/api/',
  dirImgsSubidas: 'http://10.1.1.32/sisglobal/backend/public/subidos/' ,
  pyApiUrl: 'http://10.1.1.32:5005/api/',
  nodeURL:  'http://10.1.1.32:3000/api/',    */

  //apiUrl: 'http://10.10.0.62/sisglobal/backend/public/index.php/api/',
  //dirImgsSubidas: 'http://10.10.0.62/sisglobal/backend/public/subidos/' ,
  //URL_SOCKET: ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production modng e because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
