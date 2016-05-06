define({
  categories: [
    {
      label: "Custom",
      id: 1,
      elements: [
        {
          type: "textbox",
          label: "Textbox 1",
          args: {
            name: 'firstvalue',
            value: "value 1"
          }
        }, {
          type: "textbox",
          label: "Textbox 2",
          args: {
            name: 'secondvalue',
            value: "value 2"
          }
        }, {
          type: "numberspinner",
          label: "Numberspinner",
          args: {
            name: 'thirdvalue',
            value: 1000,
            smallDelta: 10,
            constraints: { "min":9, "max":1550, "places":0 }
          }
        }, {
          type: "checkbox",
          label: "Numberspinner",
          args: {
            name: 'lastvalue',
            checked: true
          }
        }
      ], 
    }, {
      label: "Contact",
      id: 2,
      elements: [
        {
          type: "textbox",
          label: "Last name",
          args: {
            name: 'first',
            placeholder: "Your last name"
          }
        }, {
          type: "textbox",
          label: "First name",
          args: {
            name: 'last',
            placeholder: "Your first name"
          }
        }, {
          type: "datetextbox",
          label: "Birth date",
          args: {
            name: 'birth',
            value: ""
          }
        }
      ]
    }
  ]
});