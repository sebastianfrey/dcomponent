define([
  'dojo/_base/declare',
  'dojo/dom-construct',

  'dijit/form/Form',

  'dcomponent/Component'
], function(declare, domConstruct, Form, Component) {
  
  function createForm(refNode) {
    return new Form({}, domConstruct.create('form', null, refNode));
  }
  
  return declare('dcomponent.FormComponent', [Component], {
    form: null,
    
    postCreate: function() {
      this.form = createForm(this.domNode);
      this.containerNode = this.form.domNode;
    }
  });
});