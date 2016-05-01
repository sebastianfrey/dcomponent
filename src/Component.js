define([
  'dojo/_base/declare',
  'dojo/dom-construct',
  
  'dijit/_WidgetBase',
  
  './dijit/_StoreMixin',
  './dijit/_FactoryMixin'
], function(declare, domConstruct, _WidgetBase, _StoreMixin, _FactoryMixin) {
  return declare('dcomponent.Component', [ _WidgetBase, _StoreMixin, _FactoryMixin]);
});