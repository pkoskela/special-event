# special-event.js

**special-event.js** keeps track of a value, and triggers a callback in user
specified intervals when the value exceeds a certain point in the normal
distribution calculated from the previous values.

```js
var event_tracker = require('special-event')(2500, function(){
 console.log("something special happened! Expect this callback to be called every 2500 ms");
});

setInterval(function(){
 /* Feed the tracker with a value, this value is expected to follow normal
  * distribution. Linear Math.random is used for demonstration purposes only */
 event_tracker(Math.random());
}, 10);
```
