# dcomponent
> This work in progress! There may be inconsistence states between docs, sources and demos.

## Important mention
The idea for `dcomponent` came up while reading [this blog post @SitePen](https://www.sitepen.com/blog/2015/07/28/simple-model-view-synchronization-with-dstore-and-dijit/) and so
dcomponent's `_StoreMixin` rests on it.

## About dcomponent

`dcomponent` is a dojo package which allows creation of data driven widgets, usually 
for automatic form generation. It depends on [dojo], [dijit] and [dstore].

## Install dcomponent

```
npm install dcomponent
```

## Documentation for dcomponent

The basic functionality is coverd in the [Component](./docs/Component.md) section.

## Testing dcomponent

dcomponent uses Intern as its test runner. A full description of how to test this module can be found [here](./docs/Testing.md).

## dcomponent demos

dcomponent provides a set of examples. How too run these examples is covered under the [Demos](./docs/Demos.md) section.

[dojo]: <https://github.com/dojo/dojo>
[dijit]: <https://github.com/dojo/dijit>
[dstore]: <https://github.com/SitePen/dstore/>
[dcomponent/core/Factory]: <./docs/Factory.md>
[dstore/Store]: <https://github.com/SitePen/dstore/blob/master/docs/Store.md>