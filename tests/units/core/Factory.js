'use strict';
define([
  'src/core/Factory',
  'intern!object',
	'intern/chai!assert',
  'intern/chai!expect'
], function(Factory, registerSuite, assert, expect) {
  
  var factory;
  registerSuite({
    name: 'dcomponent.core.Factory',
    
    beforeEach() {
      factory = new Factory({
        registry: {
          'textbox': 'dijit/form/TextBox',
          'checkbox': 'dijit/form/CheckBox'
        }
      });
      assert.equal(factory.isLoaded(), false);
    },
    
    'check loaded results'() {
      var expectedModuleIds = ['textbox', 'checkbox'];
      
      factory.loaded.then((registeredModuleIds) => {
        assert.equal(factory.isLoaded(), true);
        assert.strictEqual(registeredModuleIds, expectedModuleIds);
      });
    },
    'register new dijit by moduleId'() {
      var expectedModuleId = 'radiobutton';
      factory.register('radiobutton', 'dijit/form/RadioButton')
        .then((registeredModuleId) => {
          assert.strictEqual(registeredModuleId, expectedModuleId);
        });
    },
    'deregister dijit by moduleId'() {
      var expectedModuleId = 'checkbox';
      factory.deregister('checkbox').then((deregisteredModuleId) => {
        assert.strictEqual(deregisteredModuleId, expectedModuleId);
      });
    }, 
    'request module byId'() {
      var expectedDeclaredClass = 'dijit.form.TextBox';
      factory.loaded.then(() => {
        var ModuleRef = factory.byId('textbox');
        var textbox = new ModuleRef();
        assert.strictEqual(textbox.declaredClass, expectedDeclaredClass);
      });
    },
    'check if module isRegisterd'() {
      factory.loaded.then(() => {
        assert.equal(factory.isRegistered('textbox'), true);
        assert.equal(factory.isRegistered('textarea'), false);
      });
    },
    'check if module can be created by create()'() {
      factory.loaded.then(() => {
        var node = document.createElement('div');
        var object = factory.create('textbox', { value: '1' }, node);
        assert.equal(object.domNode, node);
        assert.strictEqual(object.value, 1);
      });
    },
    'check if not registerd module can be created by create()'() {
      factory.on('error', (evt) => {
        expect(evt).to.have.property('error');
      });
      factory.loaded.then(() => {
        factory.create('textarea');
      });
    }
  });
});