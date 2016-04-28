dojoConfig = {
  async: true,
  // locations are relative to {projectDir}/node_modules/dojo/*
  packages: [
    {
      name: 'dijit',
      location: '../dijit/'
    }, {
      name: 'dstore',
      location: '../dojo-dstore/'
    }, {
      name: 'dcomponent',
      location: '../../src/'
    }
  ]
};