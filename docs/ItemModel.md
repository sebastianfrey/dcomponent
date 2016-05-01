# Item Model

Currently a Component requires you to provide the store data in a specific way. This section covers how
this model looks like.

## The Schema

This is the schema, how a store item should look like:

```json
{
  "schema": {
    "id": {
      "type": "number",
      "required": true
    },
    "type": {
      "type": "string",
      "required": true
    },
    "label": {
      "type": "string"
    },
    "properties": {
      "type": "Object"
    }
  }
}
```
A list of all available schemas fields:

Property | Type | Description
-------- | ---- | -----------
`id` | number | The item id.
`type` | string | The type of this item, which is an alias for a registerd factory class id.
`label?` | string | The label of an component element.
`properties?` | Object | The properties, which will be passed to the `type`'s related class constructor.

## Examples:

A basic store item may look like this.
```json
{
  "id": 1,
  "label": "First name",
  "type": "textbox"
}

```

A more advanced item may look like this.

```json
{
  "id": 2,
  "label": "Last name",
  "type": "textbox",
  "properties": {
    "placeholder": "Your last name"
  }
}

```