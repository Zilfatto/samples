from nltk.tokenize import sent_tokenize

# Lines algorithm for comparing files
def lines(a, b):
    result = set()
    lines_a = a.splitlines()
    lines_b = b.splitlines()
    for line1 in lines_a:
        for line2 in lines_b:
            # If lines from two files are identical, add to set
            if line1 == line2:
                result.add(line1)
    return list(result)

# Sentences algorithm
def sentences(a, b):
    result = set()
    sents_a = sent_tokenize(a)
    sents_b = sent_tokenize(b)
    for sent1 in sents_a:
        for sent2 in sents_b:
            # If one sentence is identical to another one
            if sent1 == sent2:
                result.add(sent1)
    return list(result)

# Substing algorithm
def substrings(a, b, n):
    result = set()
    # Dividing given strings into substr of length n
    subs1 = extract(a, n)
    subs2 = extract(b, n)
    for elem1 in subs1:
        for elem2 in subs2:
            # Comparing two substrs
            if elem1 == elem2:
                result.add(elem1)
    return list(result)

# Function for dividing string on substrings of length n
def extract(inp, n):
	data = set()
	length = len(inp)
	for i in range(length):
		if (i + n) <= length:
		    # Starting from 0 element and up to length minus n
		    data.add(inp[i:i + n])
		else:
			break
	return list(data)