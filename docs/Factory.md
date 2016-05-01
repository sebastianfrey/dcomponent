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

```javascript
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

### Examples:

Do something when the factory was loaded succesfully:

```javascript
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

### Examples:

####*register(id, moduleId | classReference)*

You can register a class reference in the factory by passing an id and the class reference.

```javascript
  factory.register('radiobutton', RadioButton)
    .then((registeredId) => {
      // registeredId will be 'radiobutton'
      let radioBtn = factory.create(registeredId);
    });
  
```

It's also possible to register a class by its module id.

```javascript
  factory.register('radiobutton', 'dijit/form/RadioButton')
    .then((registeredId) => {
      let radioBtn = factory.create(registeredId);
    });
```

####*deregister(id)*

Deregisters a class from the factories registry by its id.

```javascript
  factory.deregister('checkbox')
    .then((deregisteredId) => {
      // do some stuff
    });
  
```
####*byId(id)*

Get a class reference by its id.

```javascript
  let TextBoxRef = factory.byId('textbox');
  
  let textbox = new TextBoxRef();
```

####*create(id, [params], [node])*


This will create an element without passing any arguments or a node.

```javascript
  let myTextbox = factory.create('textbox');
   
  let value = myTextbox.get('value'); 
```

This will create an element and pass the arguments to its constructor.

```javascript
  let myTextbox = factory.create('textbox', { 
    value: 3,
    label: 'My lable'
  });
    
  let value = myTextbox.get('value');
```

This will create an element and pass the arguments and the node to its constructor.

```javascript
  let node = document.createElement('div');
  
  let myTextbox = factory.create('textbox', { 
    value: 3,
    label: 'My lable'
  }, node);
  
  let value = myTextbox.get('value');
  
  
```


## Event Summary

Event | Values | Description
----- | ------ | -----------
`register` | { id : string } | Will be fired when a new module was successfully registerd in the factories registry. 
`deregister` | { id : string } | Will be fired when a module was successfuly deregisterd from the factories registry.
`error` | { error : Error } | Will be fired when an error occures.