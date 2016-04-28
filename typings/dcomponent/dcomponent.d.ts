/// <reference path="../../node_modules/dojo-typings/dojo/1.11/index.d.ts" />
/// <reference path="../../node_modules/dojo-typings/dojo/1.11/modules.d.ts" />
/// <reference path="../../node_modules/dojo-typings/dijit/1.11/index.d.ts" />
/// <reference path="../../node_modules/dojo-typings/dijit/1.11/modules.d.ts" />

declare module dcomponent {
  export interface IStoreMixin {
    
  }
  
  export interface IComponentMixin {
    
  }
  
  export interface IFactory<T> {
    registry: Object;
    load() : dojo.promise.Promise<string[]>;
    reload() : dojo.promise.Promise<string[]>;
    register() : dojo.promise.Promise<string>;
    deregister() : string;
    byId(id: string) : dojo._base.DeclareConstructor<any>;
    create(id: string, args: Object, node: HTMLElement) : dojo.promise.Promise<dojo._base.DeclareConstructor<any>>;
  }
}

declare module 'dcomponent/Factory' {
  class Factory<T> implements dcomponent.IFactory<T> {
    
    constructor(kwargs?: Factory.KwArgs)
    
    registry: Object;
    load() : dojo.promise.Promise<string[]>;
    reload() : dojo.promise.Promise<string[]>;
    register() : dojo.promise.Promise<string>;
    deregister() : string;
    byId(id: string) : dojo._base.DeclareConstructor<any>;
    create(id: string, args: Object, node: HTMLElement) : dojo.promise.Promise<dojo._base.DeclareConstructor<any>>;
  }
  
  module Factory {
    export interface KwArgs {
      registry: typeof Factory.prototype.registry;
    }
  }
}

declare module 'dcomponent/core/Factory' {
  
}