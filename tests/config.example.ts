import { resolveApiConfig } from '../src'

// This is an example file.
// Since jike requires login to use it, please fill in the following configuration
// and rename this file to `config.ts`.
// You can also copy it from `jike-cli` https://github.com/open-jike/jike-client.
// Run `jike-cli user info -rP`

export const config = resolveApiConfig({
  endpointId: 'keji',
  endpointUrl: 'https://keji.org/api/',
  bundleId: 'org.keji.keji',
  appVersion: '1.2.3',
  buildNo: '10086',
  userAgent: 'keji-useragent',

  deviceId: '766ECA1A-C654-11EC-89F9-4F2C5FBE0E82',
  idfv: '82283B5C-C654-11EC-B221-BBD1DABE7B57',
  accessToken: 'paste-your-access-token',
})

export const refreshToken = 'paste-your-refresh-token'
