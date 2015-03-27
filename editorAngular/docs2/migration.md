# Migration to viewport-in-iframe
This architecture seems to have a lot of advantages
and there is the current code. 
How could we move the code to this new architecture ?

I stumbled quite a bit on a way to get a gradual migration from
monolitic to viewport-in-iframe.

Then i rememberted "Same domain iframe are able to share js objects."
This technical fact allows us to **gradually** port to this architecture
I prefere gradual transition as opposed to 'all in one' transitions.
'all in one' tend to be risky and ends up badly in my experience.

## Possible steps for a gradual migration
Here is some 

1. Thus we can start to put the viewport in a iframe now
   - At first, we export the js variables from the viewport to the UI frame
2. gradually port the UI to use the API we defined for the viewport-in-iframe
3. gradually we remove all the exported global

Thus we hopefully go smoothly from one to the other.

## When to migrate ?
This is unclear. We could start right away if we decided to do so.
I think it would be good to have this before migrating to new three.js version.
It would make the migration simpler
