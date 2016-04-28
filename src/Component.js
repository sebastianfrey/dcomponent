define([
  'dojo/_base/declare',
  'dojo/dom-construct',
  
  'dijit/_WidgetBase',
  
  './mixins/_StoreMixin',
  './mixins/_ComponentMixin'
], function(declare, domConstruct, _WidgetBase, _StoreMixin, _ComponentMixin) {
  return declare('dcomponent.Component', [ _WidgetBase, _StoreMixin, _ComponentMixin]);
});