define([
  'dojo/_base/declare',
  
  'dojo/dom-construct'
], function(declare, domConstruct) {
  
  return declare(null, {
    scaffoldClass: 'dcomponent',
    
    factory: null,
    
    _renderItem: function(item) {
      if(!item.properties) {
        item.properties = {};
      }

      item = this._mountOnChangeEvent(item);
      var element = this._createElement(item);

      return this._createScaffold(item, element);
    },
    
    _createElement: function(item) {
      var node = domConstruct.create('span', null, this.containerNode);
      return this.factory.createElement(item, node);
    },
    
    /**
     * Overrideable
     */
    _createScaffold: function(item, element) {
      var scaffoldNode = domConstruct.create('span', {
        'class': this.scaffoldClass
      });
      
      domConstruct.create('span', {
        innerHTML: item.label,
        'class': 'label'
      }, scaffoldNode);
      
      var elementNode = domConstruct.create('span', {
        'class': 'element'
      }, scaffoldNode);
      
      domConstruct.place(element.domNode || element, elementNode, 'only');
      
      return scaffoldNode;
    },
    
    _mountOnChangeEvent: function(item) {
      var onChange = item.properties.onChange;
      item.properties.onChange = this._onChange.bind(this, item, onChange);
      console.log(item);
      return item;
    },
    
    _onChange: function(item, callback, value) {
       var props = item.properties;

       if(props.hasOwnProperty('checked')) {
         props.checked = value;
       } else {
         props.value = value;
       }

       this.set('skipRendering', true);
       this.store.put(item).then((function() {
         if(typeof callback === 'function') {
          callback(value);
         }
         this.set('skipRendering', false);
       }).bind(this));
    },
    
    _setStoreAttr: function(store) {
      this.inherited(arguments);
      if(store && this.factory && this.factory.isLoaded()) {
        this._render();
      }
    },
    
    _setFactoryAttr: function(factory) {
      this._set('factory', factory);
      this.factory.loaded.then(this._render.bind(this));
    }
  });
  
});