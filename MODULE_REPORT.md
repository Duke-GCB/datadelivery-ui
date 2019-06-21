## Module Report
### Unknown Global

**Global**: `Ember.String`

**Location**: `app/models/duke-ds-auth-provider-affiliate.js` at line 13

```js
    return adapter.getOrRegisterUser(this.get('uid')).then(data => {
      this.store.pushPayload(userModelName, data);
      return this.store.peekRecord(userModelName, data[Ember.String.pluralize(userModelName)].id);
    });
  },
```
