# Component

## Overview

The `dcomponent/Component` class is basicly a `dijit/_WidgetBase` implementation extended trough this two mixins: 

- `dcomponent/dijit/_StoreMixin`
- `dcomponent/dijit/_FactoryMixin`

The `_StoreMixin` provides the data driven functionality and the `_FactoryMixin` the automatic generation of dijits.

To instantiate a Component you will need to pass a [Store] and a [Factory] instance to its constructor.

```javascript
let store = new Store(storeArgs);
let factory = new Factory(factoryArgs);

let component = new Component({
  store: store,
  factory: factory
}, 'componentNode');
```

> Currently a Component requires you to provide the store data in a specific way. How such a store item should look
like is covered in the [item model section](./ItemModel.md).

The correspondig HTML node.

```html
<div id="componentNode"></div>
```

## Property Summary

Property | Type | Description
-------- | ---- | -----------
`store` | `dijit.Store<ItemModel>` | The components store, which holds all items to render.
`factory` | `dcomponent.core.Factory` | The components Factory, which is used for the creation of widgets based on a stores item.
`typeProperty?` | `String` | Defines a store items type property. Default is `type`.
`labelProperty?` | `String` | Defines a store items label property. Default is `label`.
`argsProperty?` | `String` | Defines a store items args property. Default is `args`.

[Store]: <https://github.com/SitePen/dstore/blob/master/docs/Store.md>
[Factory]: <./Factory.md>

## Overridable Methods Summary

You can also overwrite some default methods with your own implementations:

####*_createScaffold(item, widget)* - inherited from `dcomponent/dijit/_FactoryMixin`

Overrideing this method allows you to generate a more advanced scaffold for your items.

##### Method Arguments
- The store `item`
- The created `widget`

##### Return Value
The expected return value is a DOM node. Normally this would be the scaffolds parent node.

