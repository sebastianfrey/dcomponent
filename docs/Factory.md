# Factory

A `Factory` provides an easy to use interface for creating dijits. Usually a factory plays off
its strengths when used for automatic generation of forms. This class inherits from `dojo/Stateful` and `dojo/Evented`.


# Factory API

## Constructor Summary

Argument | Type | Description
-------- | ---- | -----------
`registry` | `Object` | This argument is a simple key value object, whereby a key specifies an id through that a related value is accessible. A value can be a valid amd module id or a class reference. If a value is an module id, the factory tries to require it.

#### Examples:

Create a new Factory:

```
  var factory = new Factory({
    registry: {
      textbox: 'dijit/form/TextBox'
      checkbox: CheckBox,
      mywidget: 'myapp/form/MyWidget
    }
  });

```


## Property Summary

Property | Type | Description
-------- | ---- | -----------
`loaded` | `dojo/promise/Promise<String[]>` | This property is a `dojo/promise/Promise`, which will be resolved when all `registry` entries will be loaded successfully.

#### Examples:

Do something when the factory was loaded succesfully:

```
  factory.loaded.then((loadedIds) => {
    // do your amazing stuff.
  });

```


## Method Summary

Method | Returns | Description
------ | ------- | -----------
`register(id, module)` | `dojo/promise/Promise<String>` | Registers a new module with the given id in the factories registry. Module can be either a module id or a class reference.
`deregister(id)` | `dojo/promise/Promise<String>` | Deregisters a module by its id from the factories registry.
`byId(id)` | `dojo/promise/Promise<ClassConstructor>` | Requests a Module from the registry.
`create(id, [arguments], [node])` | `dojo/promise/Promise<ClassInstance>` | Creates an class instance related to the given id. Optional parameters are element specific arguments and a node, which will be assigned to the class constructor to be created.

#### Examples:

Registers a class in the factories registry by its module id - `register(id, moduleId)`:

```
  factory.register('checkbox', 'dijit/form/RadioButton')
    .then((registeredId) => {});
  
```

Registers a class in the factories registry by the class reference - `register(id, classReference)`:

```
  factory.register('checkbox', RadioButton)
    .then((registeredId) => {});
```

Deregisters a class from the factories registry by its id - `deregister(id)`:

```
  factory.deregister('checkbox')
    .then((deregisteredId) => {});
  
```

Get a class reference by its registry id - `byId(id)`:

```
  factory.byId('textbox')
    .then((ClassRef) => {
      let myClass = new ClassRef();
    });
  
```

Create an element without any arguments or a node - `create(id)`:

```
  factory.create('textbox')
    .then((myClass) => {
      myClass.set('value', 3);
    });
  
```

Create an element with some arguments, but without a node - `create(id, params)`:

```
  factory.create('textbox', { 
    value: 3,
    label: 'My lable'
  }).then((myClass) => {
      myClass.get('value');
    });
  
```

Create an element with some arguments and a node - `create(id, params, node)`:

```
  let node = document.createElement('div');
  
  factory.create('textbox', { 
    value: 3,
    label: 'My lable'
  }, node).then((myClass) => {
      myClass.get('value');
    });
  
```


## Event Summary

Event | Values | Description
----- | ------ | -----------
`register` | { id : string } | Will be fired when a new module was successfully registerd in the factories registry. 
`deregister` | { id : string } | Will be fired when a module was successfuly deregisterd from the factories registry.
`error` | { error : Error } | Will be fired when an error occures.