# Component

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

[Store]: <https://github.com/SitePen/dstore/blob/master/docs/Store.md>
[Factory]: <./Factory.md>