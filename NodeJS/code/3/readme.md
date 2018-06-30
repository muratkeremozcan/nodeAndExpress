# Tag Filter test design

## Overview:

* Provide a way to filter point list based on point metadata (i.e. “filter by tags”)
* Show the metadata (i.e. “tags”) associated with a point

## Test scenarios

For test scenarios, see the appropriate *\*.e2e-spec.ts file*.  These scenarios will be listed in `describe` / `it` format: a unit testing-centric variation of BDD's *Given/When/Then* format. Each scenario is an `it` function. Scenarios in a suite of tests can be grouped in a `describe` function. Setup & teardown can be done via `beforeAll, beforeEach, afterAll, afterEach` functions.

## Approach Refinements

* Identify all combinations of tags. Use full sets of tags for full coverage.
* Invoke the tag filter. Select the tags, check the left side of the screen for the tags selected.
* Select any point from the results of the filter, load point details and make sure the tags match in point details.

Combinatorial Test Modeling
===========================

This model is created by using the cloud based, open source tool [CTWedge](http://foselab.unibg.it/ctwedge/): *Combinatorial Testing Web-based Editor and Generator* . The script language is in [Xtext](https://www.eclipse.org/Xtext/).

Copy paste to [CTWedge](http://foselab.unibg.it/ctwedge/) to generate the test suite  in csv.

>For convenience, this is the resulting  suite filtered for the current database of points on the system.
>Apply these filters and work with the resulting points and their tags.

tag1 | tag2 | tag3 | tag4
-----|------|------|-----
air | cmd | sensor | temp
cmd | cooling | heating | writable
cmd | cooling | occ | sp
cmd | heating | occ | sp
cmd  | heating | sp | unocc
cmd | fan | writable |
cmd | lighting | writable |
cmd | occ | unocc | writable
cmd | effective | sp | writable
cmd | effective | temp | writable
cmd  | cooling | sp | unocc
cmd | effective | sp | writable
fan |  |  |
humidity |  |  |

```
Model tags
 Parameters:
   tag1 : {cmd, writable, sensor, temp, cooling, lighting, sp, effective, occ, unocc, fan, air, heating}
   tag2 : {cmd, writable, sensor, temp, cooling, lighting, sp, effective, occ, unocc, fan, air, heating}
   tag3 : {cmd, writable, sensor, temp, cooling, lighting, sp, effective, occ, unocc, fan, air, heating}
   tag4 : {cmd, writable, sensor, temp, cooling, lighting, sp, effective, occ, unocc, fan, air, heating}


 Constraints:
   // can't duplicate tags!
   # tag1=cmd => tag2!=cmd && tag3!=cmd && tag4!=cmd #
   # tag2=cmd => tag1!=cmd && tag3!=cmd && tag4!=cmd #
   # tag3=cmd => tag2!=cmd && tag1!=cmd && tag4!=cmd #
   # tag4=cmd => tag2!=cmd && tag3!=cmd && tag1!=cmd #
   # tag1=writable => tag2!=writable && tag3!=writable && tag4!=writable #
   # tag2=writable => tag1!=writable && tag3!=writable && tag4!=writable #
   # tag3=writable => tag2!=writable && tag1!=writable && tag4!=writable #
   # tag4=writable => tag2!=writable && tag3!=writable && tag1!=writable #
   # tag1=sensor => tag2!=sensor && tag3!=sensor && tag4!=sensor #
   # tag2=sensor => tag1!=sensor && tag3!=sensor && tag4!=sensor #
   # tag3=sensor => tag2!=sensor && tag1!=sensor && tag4!=sensor #
   # tag4=sensor => tag2!=sensor && tag3!=sensor && tag1!=sensor #
   # tag1=temp => tag2!=temp && tag3!=temp && tag4!=temp #
   # tag2=temp => tag1!=temp && tag3!=temp && tag4!=temp #
   # tag3=temp => tag2!=temp && tag1!=temp && tag4!=temp #
   # tag4=temp => tag2!=temp && tag3!=temp && tag1!=temp #
   # tag1=cooling => tag2!=cooling && tag3!=cooling && tag4!=cooling #
   # tag2=cooling => tag1!=cooling && tag3!=cooling && tag4!=cooling #
   # tag3=cooling => tag2!=cooling && tag1!=cooling && tag4!=cooling #
   # tag4=cooling => tag2!=cooling && tag3!=cooling && tag1!=cooling #
   # tag1=lighting => tag2!=lighting && tag3!=lighting && tag4!=lighting #
   # tag2=lighting => tag1!=lighting && tag3!=lighting && tag4!=lighting #
   # tag3=lighting => tag2!=lighting && tag1!=lighting && tag4!=lighting #
   # tag4=lighting => tag2!=lighting && tag3!=lighting && tag1!=lighting #
   # tag1=sp => tag2!=sp && tag3!=sp && tag4!=sp #
   # tag2=sp => tag1!=sp && tag3!=sp && tag4!=sp #
   # tag3=sp => tag2!=sp && tag1!=sp && tag4!=sp #
   # tag4=sp => tag2!=sp && tag3!=sp && tag1!=sp #
   # tag1=effective => tag2!=effective && tag3!=effective && tag4!=effective #
   # tag2=effective => tag1!=effective && tag3!=effective && tag4!=effective #
   # tag3=effective => tag2!=effective && tag1!=effective && tag4!=effective #
   # tag4=effective => tag2!=effective && tag3!=effective && tag1!=effective #
   # tag1=occ => tag2!=occ && tag3!=occ && tag4!=occ #
   # tag2=occ => tag1!=occ && tag3!=occ && tag4!=occ #
   # tag3=occ => tag2!=occ && tag1!=occ && tag4!=occ #
   # tag4=occ => tag2!=occ && tag3!=occ && tag1!=occ #
   # tag1=unocc => tag2!=unocc && tag3!=unocc && tag4!=unocc #
   # tag2=unocc => tag1!=unocc && tag3!=unocc && tag4!=unocc #
   # tag3=unocc => tag2!=unocc && tag1!=unocc && tag4!=unocc #
   # tag4=unocc => tag2!=unocc && tag3!=unocc && tag1!=unocc #
   # tag1=fan => tag2!=fan && tag3!=fan && tag4!=fan #
   # tag2=fan => tag1!=fan && tag3!=fan && tag4!=fan #
   # tag3=fan => tag2!=fan && tag1!=fan && tag4!=fan #
   # tag4=fan => tag2!=fan && tag3!=fan && tag1!=fan #
   # tag1=air => tag2!=air && tag3!=air && tag4!=air #
   # tag2=air => tag1!=air && tag3!=air && tag4!=air #
   # tag3=air => tag2!=air && tag1!=air && tag4!=air #
   # tag4=air => tag2!=air && tag3!=air && tag1!=air #
   # tag1=heating => tag2!=heating && tag3!=heating && tag4!=heating #
   # tag2=heating => tag1!=heating && tag3!=heating && tag4!=heating #
   # tag3=heating => tag2!=heating && tag1!=heating && tag4!=heating #
   # tag4=heating => tag2!=heating && tag3!=heating && tag1!=heating #
```
## Code Structure

The tag-filter spec imports `service-factory.ts` and uses the below services from it:

![services used](./supplementary_files/tag-filter/serviceFactory.PNG)

![tagFilterService](./supplementary_files/tag-filter/tagFilterService.PNG)

Shared services
______________

![addSiteService](./supplementary_files/common/addSiteService.PNG) 

![deleteSiteService](./supplementary_files/common/deleteSiteService.PNG)
