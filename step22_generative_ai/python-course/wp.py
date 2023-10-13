# a : list[str] = ["a","b","3","4","p"]

# print(type(a))

# print(id(a))

# print(a)

# print(dir(a))

import re
row: str = """ PIAIC55500, PIAIC33944,
We want to remove this
prefix, so we can focus on just the part of the URL that users need to enter
into an address bar PIAIC-34. Here's how to do that:
 PIAIC33332,  Here's are PIAIC-35544287327782 some more rollnumbers: PIAIC-35544,
"""

rollnumbers :list[str] =re.findall("PIAIC-?\d{5,6}",row)
print(rollnumbers)