I was thinking about how we could make a cleaner/simpler architechture for the designer.
Especially to limit the cross-over the UI and the 3d.
(btw here UI is the short for "all the classical website around the 3d viewport")

To have those both in the same code causes various issues

- Large monolitic code base
- To do the UI and the 3D requires different set of skills.
  - 3d people are unable to modify UI efficiently,
  - UI people are the same for 3d.
- both too interwinded to make easy update

I recently got the idea to put the 3d 'viewport in a iframe'.
This tech would give us a cleaner separation between the 2
and hopefully speed up development.

In the past, i used this iframed architecture with success in a webgl game.
So I went ahead and experimented with the idea and built a running prototype.

What i love about it, is the small clearly-defined API between the UI and the 3D.
It can make improvement and upgrade so much easier. Like what happen when we want 
to update three.js ? it would be scary with current arch. 
