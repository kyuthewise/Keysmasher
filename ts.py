bok = set()
s = "a"
t = "ab"  
num = 0
slen = len(s)
tlen = len(t)
            
for i in s:
    bok.add(i)
for i in t:
    if i in bok:
        num = num + 1

if num