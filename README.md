[![NPM Version](https://badge.fury.io/js/azure-ad-verify-token.svg)](https://badge.fury.io/js/azure-ad-verify-token)
![CI](https://github.com/justinlettau/azure-ad-verify-token/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/justinlettau/azure-ad-verify-token.svg)](https://david-dm.org/justinlettau/azure-ad-verify-token)
[![Dev Dependency Status](https://david-dm.org/justinlettau/azure-ad-verify-token/dev-status.svg)](https://david-dm.org/justinlettau/js-rules-engine?type=dev)
[![Codecov](https://codecov.io/gh/justinlettau/azure-ad-verify-token/branch/master/graph/badge.svg)](https://codecov.io/gh/justinlettau/azure-ad-verify-token)

# Azure AD Verify Token

Verify JWT issued by Azure Active Directory B2C.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)
- [Development](#development)

# Features

- 🎉 **Verify JWT** issued by Azure Active Directory B2C.
- 🚀 Automatically use the **rotated public keys** from Azure.
- 💪 Written in **TypeScript**.

# Installation

```bash
npm install azure-ad-verify-token --save
```

# Usage

```js
import * as advt from 'azure-ad-verify-token';

const config = {
  jwksUri: 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_signupsignin1',
  issuer: 'https://contoso.b2clogin.com/3285c484-dce5-4abb-a341-bbe4f2bc8554/v2.0/',
  audience: '99d1275c-e805-483f-b832-600f8130829c'
};

advt
  .verify(token, config)
  .then(decoded => {
    // verified and decoded token
    console.log(decoded);
  })
  .catch(error => {
    // invalid token
    console.error(decoded);
  });
```

Configuration options:

| Property   | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `jwksUri`  | `string` | `jwk_uri` value obtained from B2C policy metadata endpoint. |
| `issuer`   | `string` | `issuer` value obtained from B2C policy metadata endpoint.  |
| `audience` | `string` | Client ID of the application accessing the tenant.          |

B2C policy metadata endpoint example:

`https://contoso.b2clogin.com/contoso.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=b2c_1_signupsignin1`

# References

- [Overview of tokens in Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview)
- [Microsoft identity platform access tokens](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
- [RSA Key Converter](https://superdry.apphb.com/tools/online-rsa-key-converter)

# Development

```
npm install
npm run build
```