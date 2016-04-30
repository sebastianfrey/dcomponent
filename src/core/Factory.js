define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Stateful',
  'dojo/Evented',
  'dojo/Deferred',
  'dojo/promise/all',
  'require'
], function(declare, lang, Stateful, Evented, Deferred, all, require) {

  function isClass(item) {
		return typeof item === 'function';
  }

  return declare('dcomponent.core.Factory', [Stateful, Evented], {
    
    _loadDeferred: null,

    loaded: null,
    
    // Setters and Getters
    
    /**
     * The registry setter.
     * 
     * @param registry
     */
    _registrySetter: function(registry) {
      if(!registry) {
        registry = lang.mixin({}, registry);
      }
      this._setLoaded(new Deferred());
      this._load(registry);
    },
    
    /**
     * The private loaded setter.
     *
     * @param loadDeferred
     */
    _setLoaded: function(loadDeferred) {
      if(!this.isLoaded() && this.loaded) {
        this._loadDeferred.cancel('reloading');
      }
      
      this._loadDeferred = loadDeferred;
      this.loaded = this._loadDeferred.promise;
    },
    
    _load: function(registry) {
      var promiseList = [];
      
      if(registry) {
        this._registry = {};
        for (var id in registry) {
          promiseList.push(this.register(id, registry[id]));
        }
        
        all(promiseList).then(this._loadDeferred.resolve);
      }
      return this.loaded;
    },
    
    /**
     * Indicates if the factory is loaded or not.
     * 
     * @returns {Boolean}
     */
    isLoaded: function() {
      return this.loaded && this.loaded.isResolved();
    },

    /**
     * Checks if an item is registered under a certain id or not.
     * 
     * @param {String} id - A possibly registerd id.
     * @returns {Boolean}
     */
    isRegistered: function(/*string*/ id) {
      return this._registry[id] !== undefined;
    },

    /**
     * Search for a class in the registry by it's id.
     * 
     * @param {String} id - A registerd id.
     * @returns {dijit._WidgetBase|undefined}
     */
    byId: function(/*string*/ id) {
      var clazz = this._registry[id];
      if(!clazz) {
        var errMsg = 'dcomponent/Registry::byId() - Module id "' + id + '" was not found in registry.!';
        var evt = { error: new Error(errMsg) };
        this.emit('error', evt);
      }
      return clazz;
    },

    /**
     * Registers a class and connect it to the given id.
     * 
     * @param id - A id related to the moduleId.
     * @param moduleId - A module id as string or a dijit._WidgetBase module created through a dojo.declare.
     */
    register: function(/*string*/ id, /*string|dijit._WidgetBase*/ moduleId) {
      var deferred = new Deferred();
      if(isClass(moduleId)) {
        var ModuleRef = moduleId;
        this._register(id, ModuleRef);
        deferred.resolve(id);
      } else {
        try {
          var self = this;
          require([moduleId], function(ModuleRef) {
            self._register(id, ModuleRef);
            deferred.resolve(id);
          });
        } catch(e) {
          deferred.reject(e);
          this.emit('error', { error: e });
        }
      }
      return deferred.promise;
    },
    
    _register: function(id, ModuleRef) {
      if (!this.isRegistered(id)) {
        this._registry[id] = ModuleRef;
        this.emit('register', { id: id });
      }
    },

    /**
     * Deregisters a class by it's connected id.
     * 
     * @param {String} id
     */
    deregister: function(id) {
      var deferred = new Deferred();
      
      this.loaded.then((function() {
        if(this.isRegistered(id)) {
          delete this._registry[id];
          deferred.resolve(id);
          this.emit('deregister', { id: id });        
        } else {
          var errMsg = 'dcomponent/Registery::deregister() - Can not deregister unknow module with id: "' + id + '"!';
          var evt = { error: new Error(errMsg) };
          deferred.reject(evt);
          this.emit('error', evt);
        }
      }).bind(this));
      
      return deferred.promise;
    },
    
    /**
     * This method creates a widget.
     * 
     * @param {String} id - The id of the widget to be generated.
     * @param {Object} params - The params for the widget to be generated.
     * @param {HTMLElement} node - The node where the widget will be placed.
     * @returns {dijit._WidgetBase}
     */

    create: function(id, params, node) {
      
      var args = [ lang.mixin({}, params) ];
      var ModuleRef = this.byId(id);
      
      if(node) {
        args.push(node);
      }
      
      return new (ModuleRef.apply(args));
    }
  });
});