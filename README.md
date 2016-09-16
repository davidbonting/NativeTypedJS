# Native JavaScript Typed.JS
Original [Typed.JS](https://github.com/mattboldt/typed.js/) @mattboldt

About the same as Typed.JS but without the need of [jQuery](https://jquery.com/). This "Native JavaScript Typed.JS" is pure JavaScript and supported by modern browsers (IE9+).

I started this project because I wanted the typing effect. But I didn't want big old slow jQuery.

| Compression | jQuery (1.9.1) + Typed.JS | Native JavaScript Typed.JS |
| ---         | ---                       | ---                        |
| RAW         | 272.85 KB                 | 6.58 KB                    |
| Minified    | 94.75 KB                  | 2.58 KB                    |
| Gzipped     | 78,89 KB                  | 0.95 KB                    |

> That's about 98% savings

Easy to implement
---
~~~ html
  <h3>This demo is all about</h3>
  <div id="whereMagicHappens">
    <p>The easiest option</p>
    <p>Not using jQuery</p>
    <p>Saving KB's</p>
    <p>Other demo's at index[number 2 or 3].html</p>
  </div>

  <script src="nativeTypedJS.min.js"></script>
  <script>
    // Equivalent $(document).ready(function(){});
    document.addEventListener("DOMContentLoaded", function(event) {
      nativeTypedJS();
    });
  </script>
~~~

Customizable
---
~~~ javascript
      nativeTypedJS({
      	// The div where the effect takes place
        div: 'otherDivName', // (optional) default: whereMagicHappens
        // Time to wait before the effect starts in milliseconds
        firstTimeStart: 2000, // (optional) default: 0
        // Duration of the whole animation in milliseconds
        animationTime: 10000, // (optional) default: 5000
        // Pauze before deleting the text in milliseconds
        timeBeforeDeleting: 5000, // (optional) default: 2000
        // Pauze before next animation starts in milliseconds
        timeBeforeNext: 3000, // (optional) default: 1000
        // Cursor blinking speed in milliseconds
        cursorSpeed: 500, // (optional) default: 1000
        // If the P elements are allowed to be in a random order
        shuffle: true, // (optional) default: false
        // If the animation goes on forever in a loop
        loop: true // (optional) default: false
      });
~~~

CSS
---
Tip: Start styling with only one P element untill it looks nice. Than add the JavaScript.
~~~ html
  <div id="whereMagicHappens">
    <p>The easiest option</p>
  </div>
~~~

And when the effect takes place these ID's are available.
~~~ css
    #whereMagicHappens{
      background-color: #bababa;
    }
    #typedText{
      color: red;
    }
    #cursor{
      color: green;
      font-weight: bold;
      font-size: 2em;
    }
~~~
Demo's
---
* index.html - easiest example
* index2.html - customizable example
* index3.html - styling example
