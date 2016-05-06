define([
  'dojo/_base/declare',
  
  'dojo/dom-construct'
], function(declare, domConstruct) {
  
  return declare(null, {
    scaffoldClass: 'scaffold',
    
    typeProperty: 'type',
    
    labelProperty: 'label',
    
    argsProperty: 'args',
        
    factory: null,
    
    _renderItem: function(item) {
      if(!item[this.argsProperty]) {
        item[this.argsProperty] = {};
      }

      item = this._mountOnChangeEvent(item);
      var widget = this._createWidget(item);

      return this._createScaffold(item, widget);
    },
    
    _createWidget: function(item) {
      var node = domConstruct.create('span', null, this.containerNode);
      return this.factory.create(item[this.typeProperty], item[this.argsProperty], node);
    },
    
    /**
     * Overrideable
     */
    _createScaffold: function(item, widget) {
      var scaffoldNode = domConstruct.create('span', {
        'class': this.scaffoldClass
      });
      
      domConstruct.create('label', {
        innerHTML: item[this.labelProperty],
        'for': widget.id,
        'class': 'label'
      }, scaffoldNode);
      
      var wrapperNode = domConstruct.create('span', {
        'class': 'wrapper'
      }, scaffoldNode);
      
      domConstruct.place(widget.domNode || widget, wrapperNode, 'only');
      
      return scaffoldNode;
    },
    
    _mountOnChangeEvent: function(item) {
      console.log(item);
      var onChange = item[this.argsProperty].onChange;
      item[this.argsProperty].onChange = this._onChange.bind(this, item, onChange);
      return item;
    },
    
    _onChange: function(item, callback, value) {
       var props = item[this.argsProperty];

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
      this.factory.then(this._render.bind(this));
    }
  });
  
});